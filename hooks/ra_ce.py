"""
Hook de MkDocs: publica en els apunts el mapa de RA, CE i tasques exportat
des del Gestor de RA i CE (botó «Exporta per als apunts» del Banc de tasques).

- Genera la pàgina ra-ce.md («Qué debo saber hacer»).
- Afig, a dalt de cada pàgina amb tasques, una caixa amb els CE que s'hi treballen.
- L'alumnat pot marcar els CE que ja sap fer; es guarda només en el seu navegador
  (javascripts/ra_ce.js). No hi ha cap dada personal ni cap nota.

Les dades es lligen de ra_ce.json, al costat de mkdocs.yml.
"""

from __future__ import annotations

import json
import logging
from html import escape
from pathlib import Path
from urllib.parse import urlsplit

from mkdocs.plugins import event_priority
from mkdocs.structure.files import File
from mkdocs.utils import get_relative_url

log = logging.getLogger("mkdocs.hooks.ra_ce")

DATA_FILE = "ra_ce.json"
PAGE = "ra-ce.md"
FORMAT = "gestor-ra-ce/mapa-material"

_map: dict | None = None
_lang = "es"
_prefix = ""  # «ca/» en la build en valencià: el plugin i18n ho publica tot en eixa subcarpeta

# Textos de la interfície en cada idioma (plugin i18n). Les descripcions dels RA i CE
# i els títols de les tasques ixen tal com estan en el Gestor.
TEXT = {
    "es": {
        "title": "Qué debo saber hacer",
        "empty": "Todavía no se ha publicado el mapa de resultados de aprendizaje.",
        "check": "Ya sé hacerlo",
        "check_title": "Marca si ya sabes hacerlo",
        "evaluable": "evaluable",
        "intro": "Módulo <strong>{module}</strong>. Para aprobar tienes que superar cada "
                 "<strong>resultado de aprendizaje (RA)</strong>. Cada RA se evalúa con varios "
                 "<strong>criterios de evaluación (CE)</strong>, y cada CE se trabaja en una o más tareas de los apuntes.",
        "note": "Marca los CE que ya sabes hacer para ver tu progreso. Es una <strong>autoevaluación</strong>: "
                "se guarda solo en este navegador y no es tu nota.",
        "total": "de todo el módulo, ponderado por el peso de cada RA",
        "reset": "Borrar mi autoevaluación",
        "reset_confirm": "¿Borrar todos los criterios que has marcado en este navegador?",
        "col_demo": "Qué tienes que demostrar",
        "col_where": "Dónde lo trabajas",
        "ask": "Pregunta al profesor",
        "by_unit": "Por unidad",
        "by_unit_id": "por-unidad",
        "col_unit": "Unidad",
        "col_task": "Tarea",
        "updated": "Actualizado",
        "box": "En esta página trabajas {n} criterios de evaluación ({ras})",
        "box_note": "Autoevaluación guardada solo en este navegador",
        "box_link": "Ver todo lo que debo saber hacer",
    },
    "ca": {
        "title": "Què he de saber fer",
        "empty": "Encara no s'ha publicat el mapa de resultats d'aprenentatge.",
        "check": "Ja sé fer-ho",
        "check_title": "Marca-ho si ja saps fer-ho",
        "evaluable": "avaluable",
        "intro": "Mòdul <strong>{module}</strong>. Per a aprovar has de superar cada "
                 "<strong>resultat d'aprenentatge (RA)</strong>. Cada RA s'avalua amb diversos "
                 "<strong>criteris d'avaluació (CE)</strong>, i cada CE es treballa en una o més tasques dels apunts.",
        "note": "Marca els CE que ja saps fer per a veure el teu progrés. És una <strong>autoavaluació</strong>: "
                "només es guarda en este navegador i no és la teua nota.",
        "total": "de tot el mòdul, ponderat pel pes de cada RA",
        "reset": "Esborra la meua autoavaluació",
        "reset_confirm": "Vols esborrar tots els criteris que has marcat en este navegador?",
        "col_demo": "Què has de demostrar",
        "col_where": "On ho treballes",
        "ask": "Pregunta-ho al professorat",
        "by_unit": "Per unitats",
        "by_unit_id": "per-unitats",
        "col_unit": "Unitat",
        "col_task": "Tasca",
        "updated": "Actualitzat",
        "box": "En esta pàgina treballes {n} criteris d'avaluació ({ras})",
        "box_note": "Autoavaluació guardada només en este navegador",
        "box_link": "Mostra tot el que he de saber fer",
    },
}


def _t(key: str) -> str:
    return TEXT.get(_lang, TEXT["es"])[key]
_ce_index: dict[str, dict] = {}
_tasks_by_page: dict[str, list[dict]] = {}


# ---------- Dades ----------

def _visible(task: dict) -> bool:
    """Les propostes noves només es mostren quan el professorat ja les avalua."""
    return task.get("origin") != "nova" or bool(task.get("evaluable"))


def _load(config) -> None:
    global _map, _ce_index
    _map, _ce_index = None, {}
    path = Path(config.config_file_path).parent / DATA_FILE
    if not path.is_file():
        log.warning("No hi ha %s: la pàgina %s eixirà buida.", DATA_FILE, PAGE)
        return
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as err:
        log.error("No s'ha pogut llegir %s: %s", DATA_FILE, err)
        return
    if data.get("format") != FORMAT:
        log.error("%s no és un mapa exportat pel Gestor de RA i CE.", DATA_FILE)
        return
    data["tasks"] = [t for t in data.get("tasks", []) if _visible(t)]
    _map = data
    for ra in data.get("ras", []):
        for ce in ra.get("ces", []):
            _ce_index[ce["code"]] = {**ce, "ra": ra["code"]}


def _page_for(url: str, files) -> File | None:
    """Pàgina dels apunts a què apunta una URL publicada (https://…/dwes/up02/ut02ac/)."""
    path = urlsplit(url).path
    best = None
    for f in files.documentation_pages():
        rel = f.url[len(_prefix):] if _prefix and f.url.startswith(_prefix) else f.url
        if rel and ("/" + path.lstrip("/")).endswith("/" + rel):
            if best is None or len(f.url) > len(best.url):
                best = f
    return best


def _fragment(url: str) -> str:
    frag = urlsplit(url).fragment
    return f"#{frag}" if frag else ""


# ---------- HTML ----------

def _checkbox(code: str) -> str:
    return (
        f'<label class="race-check" title="{escape(_t("check_title"))}">'
        f'<input type="checkbox" data-race-ce="{escape(code)}"> '
        f'<span>{escape(_t("check"))}</span></label>'
    )


def _progress(attrs: str, label: str) -> str:
    return (
        f'<span class="race-progress" {attrs}>'
        f'<span class="race-bar"><span style="width:0%"></span></span>'
        f'<span class="race-pct">0&nbsp;%</span>'
        f'<span class="race-label">{escape(label)}</span></span>'
    )


def _task_link(task: dict, from_url: str) -> str:
    target = task.get("_file_url")
    href = (get_relative_url(target, from_url) + _fragment(task["url"])) if target is not None else task["url"]
    badge = f' <span class="race-tag">{_t("evaluable")}</span>' if task.get("evaluable") else ""
    key = "" if task.get("origin") == "font" else f'<span class="race-key">{escape(task["key"])}</span> '
    return f'<a href="{escape(href)}">{key}{escape(task["title"])}</a>{badge}'


def _render_page(page_url: str) -> str:
    if not _map:
        return f"# {_t('title')}\n\n{_t('empty')}\n"
    m = _map["module"]
    tasks_by_ce: dict[str, list[dict]] = {}
    for t in _map["tasks"]:
        for c in t["ces"]:
            tasks_by_ce.setdefault(c["code"], []).append({**t, "_evidence": c.get("evidence", "")})

    out = [
        "---",
        f"title: \"{_t('title')}\"",
        "hide:",
        "  - toc",
        "---",
        "",
        f"# {_t('title')}",
        "",
        f'<div class="race-map" data-race-module="{escape(m["code"])}">',
        '<p class="race-intro">' + _t("intro").format(module=escape(f'{m["code"]} · {m["name"]}')) + "</p>",
        f'<p class="race-note">{_t("note")}</p>',
        _progress('data-race-total=""', _t("total")),
        f'<p><button type="button" class="md-button race-reset" data-confirm="{escape(_t("reset_confirm"))}">'
        f'{escape(_t("reset"))}</button></p>',
    ]

    for ra in _map["ras"]:
        rid = ra["code"].lower()
        out.append(
            f'<details class="race-ra note" id="{escape(rid)}" data-race-ra="{escape(ra["code"])}" '
            f'data-race-weight="{ra["weight"]}">'
            f'<summary><span class="race-code">{escape(ra["code"])}</span> '
            f'<span class="race-weight">{ra["weight"]:g}&nbsp;%</span> '
            f'{escape(ra["description"])}'
            f'{_progress("", "")}</summary>'
            f'<table class="race-table"><thead><tr><th>CE</th><th>{escape(_t("col_demo"))}</th>'
            f'<th>{escape(_t("col_where"))}</th><th></th></tr></thead><tbody>'
        )
        for ce in ra["ces"]:
            tasks = tasks_by_ce.get(ce["code"], [])
            if tasks:
                where = "<ul>" + "".join(
                    f"<li>{_task_link(t, page_url)}"
                    + (f'<br><small>{escape(t["_evidence"])}</small>' if t["_evidence"] else "")
                    + "</li>"
                    for t in tasks
                ) + "</ul>"
            else:
                where = f'<span class="race-none">{escape(_t("ask"))}</span>'
            out.append(
                f'<tr data-race-row="{escape(ce["code"])}" data-race-weight="{ce["weight"]}">'
                f'<td class="race-code">{escape(ce["code"])}<br><small>{ce["weight"]:g}&nbsp;%</small></td>'
                f'<td>{escape(ce["description"])}</td><td>{where}</td><td>{_checkbox(ce["code"])}</td></tr>'
            )
        out.append("</tbody></table></details>")

    # Vista per unitats, en l'ordre del curs.
    out.append(f'<h2 id="{_t("by_unit_id")}">{escape(_t("by_unit"))}</h2>')
    out.append(f'<table class="race-table race-units"><thead><tr><th>{escape(_t("col_unit"))}</th>'
               f'<th>{escape(_t("col_task"))}</th><th>CE</th></tr></thead><tbody>')
    for t in _map["tasks"]:
        unit = t["unit"] if t["unit"] in ("NOV", "EXA") or t["unit"].startswith("F") else f'{t["unit"]} · {t["unit_name"]}'
        ces = " ".join(
            f'<a class="race-chip" href="#{escape(c["code"].split(".")[0].lower())}" data-race-chip="{escape(c["code"])}">{escape(c["code"])}</a>'
            for c in t["ces"]
        )
        out.append(f"<tr><td>{escape(unit)}</td><td>{_task_link(t, page_url)}</td><td>{ces}</td></tr>")
    out.append("</tbody></table>")
    out.append(f'<p class="race-note">{_t("updated")}: {escape(_map.get("generated", "")[:10])}.</p>')
    out.append("</div>")
    return "\n".join(out) + "\n"


def _render_box(page, tasks: list[dict], map_url: str | None) -> str:
    codes: list[str] = []
    for t in tasks:
        for c in t["ces"]:
            if c["code"] not in codes and c["code"] in _ce_index:
                codes.append(c["code"])
    ras = sorted({_ce_index[c]["ra"] for c in codes}, key=lambda r: int("".join(ch for ch in r if ch.isdigit()) or 0))
    link = ""
    if map_url is not None:
        link = f' · <a href="{escape(get_relative_url(map_url, page.url))}">{escape(_t("box_link"))}</a>'
    rows = []
    for code in codes:
        ce = _ce_index[code]
        here = [t for t in tasks if any(c["code"] == code for c in t["ces"])]
        names = ", ".join(escape(t["title"]) for t in here)
        rows.append(
            f'<li data-race-row="{escape(code)}"><span class="race-code">{escape(code)}</span> '
            f'{escape(ce["description"])} <small>({names})</small> {_checkbox(code)}</li>'
        )
    return (
        f'\n<details class="race-box abstract" data-race-module="{escape(_map["module"]["code"])}">'
        f'<summary>{escape(_t("box").format(n=len(codes), ras=", ".join(ras)))}</summary>'
        f'<ul>{"".join(rows)}</ul>'
        f'<p class="race-note">{escape(_t("box_note"))}{link}.</p>'
        "</details>\n\n"
    )


# ---------- Esdeveniments de MkDocs ----------

# Abans que print-site (0), perquè cree la seua pàgina dins de la carpeta de l'idioma.
@event_priority(10)
def on_config(config, **kwargs):
    global _lang, _prefix
    i18n = config.plugins.get("i18n")
    default = getattr(i18n, "default_language", None) or "es"
    _lang = getattr(i18n, "current_language", None) or default
    _prefix = "" if _lang == default else f"{_lang}/"
    print_site = config.plugins.get("print-site")
    if print_site is not None:
        print_site.config["print_page_basename"] = f"{_prefix}print_page"
    _load(config)
    return config


# Després del plugin i18n (-100), que no accepta fitxers generats.
@event_priority(-150)
def on_files(files, config, **kwargs):
    global _tasks_by_page
    _tasks_by_page = {}
    page_file = File.generated(config, PAGE, content="")
    if _prefix:
        page_file.dest_uri = _prefix + page_file.dest_uri  # la url es recalcula a partir d'ací
    files.append(page_file)
    if _map:
        lost = []
        for t in _map["tasks"]:
            f = _page_for(t["url"], files)
            if f is None:
                lost.append(t["key"])
                t["_file_url"] = None
                continue
            rel = f.url[len(_prefix):] if _prefix and f.url.startswith(_prefix) else f.url
            t["_file_url"] = _prefix + rel
            _tasks_by_page.setdefault(f.src_uri, []).append(t)
        if lost:
            log.warning("Tasques de %s sense pàgina en els apunts: %s", DATA_FILE, ", ".join(lost))
    page_file.content_string = _render_page(page_file.url)
    return files


def on_page_markdown(markdown, page, config, files, **kwargs):
    if not _map:
        return markdown
    tasks = _tasks_by_page.get(page.file.src_uri)
    if not tasks:
        return markdown
    map_file = files.get_file_from_path(PAGE)
    box = _render_box(page, tasks, map_file.url if map_file else None)
    lines = markdown.split("\n")
    for i, line in enumerate(lines):
        if line.startswith("# "):
            lines.insert(i + 1, box)
            return "\n".join(lines)
    return box + markdown


def on_page_context(context, page, config, nav, **kwargs):
    """El selector d'idioma de la pàgina generada ha d'apuntar a la mateixa pàgina en l'altre idioma.
    El plugin i18n no la coneix (no té «locale») i hi deixaria els enllaços de la pàgina anterior."""
    if page.file.src_uri != PAGE:
        return context
    i18n = config.plugins.get("i18n")
    alternates = getattr(i18n, "extra_alternate", None)
    if not alternates:
        return context
    default = getattr(i18n, "default_language", "es")
    links = [
        {**alt, "link": ("" if alt["lang"] == default else f'{alt["lang"]}/') + "ra-ce/"}
        for alt in alternates
    ]
    # El plugin i18n l'assigna com a atribut, i la plantilla de Material llig l'atribut.
    config.extra.alternate = links
    config.extra["alternate"] = links
    return context

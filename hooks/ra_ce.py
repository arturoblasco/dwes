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

from mkdocs.structure.files import File
from mkdocs.utils import get_relative_url

log = logging.getLogger("mkdocs.hooks.ra_ce")

DATA_FILE = "ra_ce.json"
PAGE = "ra-ce.md"
FORMAT = "gestor-ra-ce/mapa-material"

_map: dict | None = None
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
        if f.url and ("/" + path.lstrip("/")).endswith("/" + f.url):
            if best is None or len(f.url) > len(best.url):
                best = f
    return best


def _fragment(url: str) -> str:
    frag = urlsplit(url).fragment
    return f"#{frag}" if frag else ""


# ---------- HTML ----------

def _checkbox(code: str) -> str:
    return (
        f'<label class="race-check" title="Marca si ya sabes hacerlo">'
        f'<input type="checkbox" data-race-ce="{escape(code)}"> '
        f'<span>Ya sé hacerlo</span></label>'
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
    badge = ' <span class="race-tag">evaluable</span>' if task.get("evaluable") else ""
    key = "" if task.get("origin") == "font" else f'<span class="race-key">{escape(task["key"])}</span> '
    return f'<a href="{escape(href)}">{key}{escape(task["title"])}</a>{badge}'


def _render_page(page_url: str) -> str:
    if not _map:
        return (
            "# Qué debo saber hacer\n\n"
            "Todavía no se ha publicado el mapa de resultados de aprendizaje.\n"
        )
    m = _map["module"]
    tasks_by_ce: dict[str, list[dict]] = {}
    for t in _map["tasks"]:
        for c in t["ces"]:
            tasks_by_ce.setdefault(c["code"], []).append({**t, "_evidence": c.get("evidence", "")})

    out = [
        "---",
        "title: Qué debo saber hacer",
        "hide:",
        "  - toc",
        "---",
        "",
        "# Qué debo saber hacer",
        "",
        f'<div class="race-map" data-race-module="{escape(m["code"])}">',
        f'<p class="race-intro">Módulo <strong>{escape(m["code"])} · {escape(m["name"])}</strong>. '
        "Para aprobar tienes que superar cada <strong>resultado de aprendizaje (RA)</strong>. "
        "Cada RA se evalúa con varios <strong>criterios de evaluación (CE)</strong>, "
        "y cada CE se trabaja en una o más tareas de los apuntes.</p>",
        '<p class="race-note">Marca los CE que ya sabes hacer para ver tu progreso. '
        "Es una <strong>autoevaluación</strong>: se guarda solo en este navegador "
        "y no es tu nota.</p>",
        _progress('data-race-total=""', "de todo el módulo, ponderado por el peso de cada RA"),
        '<p><button type="button" class="md-button race-reset">Borrar mi autoevaluación</button></p>',
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
            '<table class="race-table"><thead><tr><th>CE</th><th>Qué tienes que demostrar</th>'
            '<th>Dónde lo trabajas</th><th></th></tr></thead><tbody>'
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
                where = '<span class="race-none">Pregunta al profesor</span>'
            out.append(
                f'<tr data-race-row="{escape(ce["code"])}" data-race-weight="{ce["weight"]}">'
                f'<td class="race-code">{escape(ce["code"])}<br><small>{ce["weight"]:g}&nbsp;%</small></td>'
                f'<td>{escape(ce["description"])}</td><td>{where}</td><td>{_checkbox(ce["code"])}</td></tr>'
            )
        out.append("</tbody></table></details>")

    # Vista per unitats, en l'ordre del curs.
    out.append('<h2 id="por-unidad">Por unidad</h2>')
    out.append('<table class="race-table race-units"><thead><tr><th>Unidad</th><th>Tarea</th><th>CE</th></tr></thead><tbody>')
    for t in _map["tasks"]:
        unit = t["unit"] if t["unit"] in ("NOV", "EXA") or t["unit"].startswith("F") else f'{t["unit"]} · {t["unit_name"]}'
        ces = " ".join(
            f'<a class="race-chip" href="#{escape(c["code"].split(".")[0].lower())}" data-race-chip="{escape(c["code"])}">{escape(c["code"])}</a>'
            for c in t["ces"]
        )
        out.append(f"<tr><td>{escape(unit)}</td><td>{_task_link(t, page_url)}</td><td>{ces}</td></tr>")
    out.append("</tbody></table>")
    out.append(f'<p class="race-note">Actualizado: {escape(_map.get("generated", "")[:10])}.</p>')
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
        link = f' · <a href="{escape(get_relative_url(map_url, page.url))}">Ver todo lo que debo saber hacer</a>'
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
        f'<summary>En esta página trabajas {len(codes)} criterios de evaluación '
        f'({", ".join(escape(r) for r in ras)})</summary>'
        f'<ul>{"".join(rows)}</ul>'
        f'<p class="race-note">Autoevaluación guardada solo en este navegador{link}.</p>'
        "</details>\n\n"
    )


# ---------- Esdeveniments de MkDocs ----------

def on_config(config, **kwargs):
    _load(config)
    return config


def on_files(files, config, **kwargs):
    global _tasks_by_page
    _tasks_by_page = {}
    page_file = File.generated(config, PAGE, content="")
    files.append(page_file)
    if _map:
        lost = []
        for t in _map["tasks"]:
            f = _page_for(t["url"], files)
            if f is None:
                lost.append(t["key"])
                t["_file_url"] = None
                continue
            t["_file_url"] = f.url
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

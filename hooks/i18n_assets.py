"""Rutes d'imatges i fitxers en les pàgines traduïdes (mkdocs-static-i18n).

Les pàgines en valencià es generen dins de /ca/, un nivell més endins que les
en castellà. MkDocs corregix els enllaços i les imatges escrits en Markdown,
però no els que van en HTML dins del Markdown (<img src="../../img/...">,
<a href="../sources/...">). En /ca/ eixes rutes apunten a /ca/img/..., que no
existix, perquè les imatges i els fitxers es publiquen una sola vegada, a l'arrel.

Este hook revisa les rutes relatives de src i href en les pàgines d'un idioma
que no és el per defecte: si la ruta no porta a cap fitxer del lloc però sí
que hi porta amb un ../ més, la corregix. També ho fa en la pàgina
d'impressió de l'idioma (print-site), que calcula les rutes com si estiguera
a l'arrel.
"""
import posixpath
import re

from mkdocs.plugins import event_priority

_ATTR = re.compile(r'\b(src|href)="([^"]+)"')
_SKIP = ("http://", "https://", "//", "/", "#", "data:", "mailto:", "tel:", "javascript:")

_known: set[str] = set()


def _lang(config):
    i18n = config.plugins.get("i18n")
    lang = getattr(i18n, "current_language", None)
    default = getattr(i18n, "default_language", None)
    return None if not lang or lang == default else lang


def _dest(base: str, url: str) -> str:
    path = url.split("#", 1)[0].split("?", 1)[0]
    return posixpath.normpath(posixpath.join(base, path))


def _exists(path: str) -> bool:
    return path in _known or path.rstrip("/") + "/" in _known


def _fix(html: str, page_url: str) -> str:
    base = page_url if page_url.endswith("/") else posixpath.dirname(page_url) + "/"

    def repl(m):
        attr, url = m.group(1), m.group(2)
        if url.startswith(_SKIP) or ":" in url.split("/", 1)[0]:
            return m.group(0)
        if _exists(_dest(base, url)):
            return m.group(0)
        if _exists(_dest(base, "../" + url)):
            return f'{attr}="../{url}"'
        return m.group(0)

    return _ATTR.sub(repl, html)


# Després del plugin i18n i del hook ra_ce, que afigen fitxers.
@event_priority(-200)
def on_files(files, config, **kwargs):
    global _known
    _known = {f.dest_uri for f in files}
    _known |= {f.dest_uri[: -len("index.html")] for f in files if f.dest_uri.endswith("index.html")}
    return files


# Abans que print-site, perquè la pàgina d'impressió reba ja les rutes corregides.
@event_priority(50)
def on_page_content(html, page, config, files, **kwargs):
    lang = _lang(config)
    if not lang or not page.url.startswith(f"{lang}/"):
        return html
    return _fix(html, page.url)


# print-site escriu la seua pàgina al final del build: es corregix ja escrita.
@event_priority(-200)
def on_post_build(config, **kwargs):
    lang = _lang(config)
    if not lang:
        return
    from pathlib import Path
    site = Path(config.site_dir)
    for path in (site / lang / "print_page" / "index.html", site / "print_page" / "index.html"):
        if path.is_file() and lang in path.relative_to(site.parent).parts:
            html = path.read_text(encoding="utf-8")
            path.write_text(_fix(html, f"{lang}/print_page/"), encoding="utf-8")
            return

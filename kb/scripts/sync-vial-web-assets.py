#!/usr/bin/env python3
# SPDX-License-Identifier: GPL-2.0-only

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path
from urllib.error import URLError
from urllib.parse import urljoin
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "vial-assets"
UPSTREAM = "https://vial.rocks/"
USER_AGENT = "Silicore-PawKeyboard-Vial-Web-sync/1.0"


def fetch(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=60) as response:
        return response.read()


def write_bytes(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def main() -> int:
    try:
        html = fetch(UPSTREAM).decode("utf-8")
    except (OSError, URLError) as exc:
        print(f"failed to fetch {UPSTREAM}: {exc}", file=sys.stderr)
        return 1

    write_bytes(ROOT / "upstream-index.snapshot.html", html.encode("utf-8"))

    matches = re.findall(r'(?:src|href)="([^"]+)"', html)
    js_assets = [item for item in matches if re.search(r"main-[0-9a-f]+\.js$", item)]
    if not js_assets:
        print("could not find main-*.js in upstream HTML", file=sys.stderr)
        return 1

    main_js_name = Path(js_assets[0]).name
    stem = main_js_name[:-3]
    asset_names = [
        "icon.png",
        f"{stem}.js",
        f"{stem}.data",
        f"{stem}.wasm",
        f"{stem}.worker.js",
    ]

    if ASSET_DIR.exists():
        shutil.rmtree(ASSET_DIR)
    ASSET_DIR.mkdir(parents=True, exist_ok=True)

    for name in asset_names:
        url = urljoin(UPSTREAM, name)
        data = fetch(url)
        write_bytes(ASSET_DIR / name, data)
        print(f"mirrored {name} ({len(data)} bytes)")

    for label in ("Vial", "Web", "Support"):
        match = re.search(rf"{label}:\s*([0-9a-f]{{40}})", html)
        if match:
            print(f"{label}: {match.group(1)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

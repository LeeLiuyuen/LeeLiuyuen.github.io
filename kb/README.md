# Silicore PawKeyboard Vial Web

This repository contains the GitHub Pages build for the Silicore PawKeyboard web configurator.
It is based on Vial Web and keeps the Vial WebHID runtime local so it can be served from
`https://scfurry.com/kb/`.

## Browser support

Vial Web uses the WebHID API and a threaded WebAssembly runtime, so users should open the page
with a current Chromium based browser such as Chrome, Chromium or Edge. The deployed page must be
served from HTTPS; local testing with `http://localhost` or `http://127.0.0.1` is also accepted by
browsers as a trusted development origin.

GitHub Pages cannot be configured per-directory with custom response headers, so this build uses
`coi-serviceworker.js` to serve the page and same-origin assets with the COOP/COEP headers required
by `SharedArrayBuffer`. On a fresh browser profile the page may reload once before the Vial runtime
starts.

## Included upstream build

The bundled Vial Web runtime files in `vial-assets/` were mirrored from `https://vial.rocks/`.
The upstream page reported these revisions when the assets were mirrored:

- Vial: `e42622c352b69eff523a467718db487ab9c9cbf2`
- Web: `3749f8dabc6d186f9b17cb75eed64e6bf0e23e16`
- Support: `3bcf423c970300722a04113de1d20c901b177e42`

The original HTML snapshot is kept as `upstream-index.snapshot.html` for comparison. The custom
Silicore shell is in `index.html`, `styles.css`, and `coi-serviceworker.js`.

## Local development

Serve the repository as static files:

```powershell
python -m http.server 8080
```

Then open `http://127.0.0.1:8080/`.

To refresh the mirrored Vial Web runtime from upstream:

```powershell
python scripts/sync-vial-web-assets.py
```

Review the updated `upstream-index.snapshot.html`, `vial-assets/`, and the revision lines printed
by the script before committing.

## Deployment

For the main site, copy this repository's static files into the `kb/` folder of
`LeeLiuyuen.github.io`. The paths are relative, so the same build works at `/` and `/kb/`.

## License

This project is distributed under GPL-2.0-only. See `COPYING`.

The Vial Web runtime assets are derived from the upstream Vial GUI/Web project and remain under
the upstream GPL-2.0 license. See `THIRD_PARTY_NOTICES.md` and `SOURCE.md` for source pointers.

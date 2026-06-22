# Corresponding Source

This repository contains the complete source for the custom static wrapper used at
`https://scfurry.com/kb/`:

- `index.html`
- `styles.css`
- `coi-serviceworker.js`
- `scripts/sync-vial-web-assets.py`

It also includes a mirrored binary/static Vial Web runtime under `vial-assets/`. The corresponding
upstream source for that runtime is available from the Vial project:

- Vial GUI/Web source: https://github.com/vial-kb/vial-gui
- Vial QMK source: https://github.com/vial-kb/vial-qmk

The mirrored upstream page reported these revisions:

- Vial: `e42622c352b69eff523a467718db487ab9c9cbf2`
- Web: `3749f8dabc6d186f9b17cb75eed64e6bf0e23e16`
- Support: `3bcf423c970300722a04113de1d20c901b177e42`

Use `scripts/sync-vial-web-assets.py` to recreate the local `vial-assets/` mirror from the public
Vial Web deployment.

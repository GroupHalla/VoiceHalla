# Screenshots

App screenshots used by the site's gallery and hero mockup.

## How to add your own

1. Drop your PNG/JPG/WEBP files in this folder.
2. (Optional) Prefix with a number to pin the order, e.g.
   `01-main-window.png`, `02-welcome.png`.
3. (Optional) To set a custom label, caption or hero image, create a
   `meta.json` in this folder:
   ```json
   {
     "hero": "01-main-window.png",
     "items": [{ "file": "01-main-window.png", "label": "Main window" }]
   }
   ```
4. Done. The dev server reloads automatically; in production, rebuild the
   site (`npm run build`).

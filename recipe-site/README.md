La Cuisine — Vintage French recipe site

This is a small static website with a vintage French aesthetic showcasing sample recipes.

How to run

- Open `index.html` in a browser (double-click or use your browser's Open File).
- Or start a simple static server (recommended during development):

  python3 -m http.server 8000

  Then open http://localhost:8000 in your browser from the `recipe-site` folder.

Notes

- Fonts are loaded from Google Fonts (Playfair Display + Montserrat).
- Images use Unsplash example URLs — replace files in `assets/` and update `js/main.js` if you want local images.
 - Images are now local placeholders stored in `assets/` (SVG). Replace these with your photos named similarly or update `js/main.js` to point to your filenames.
 - Images are now local placeholders stored in `assets/` (SVG). To use your photo attachment for the ravioli dish:
   1. Save the attached JPG to `recipe-site/assets/ravioli.jpg` (overwrite if a file exists).
   2. The recipe is already updated to use `assets/ravioli.jpg` and is titled "Ravioli al fungi e ricotta".
   3. Serve the site (`python3 -m http.server 8000`) and open http://localhost:8000 to verify the image.

  If you'd prefer to paste base64 instead of uploading the file, there's a helper script:

    - `scripts/import_base64.py` — paste the base64-encoded image or point it to a `.b64` file and it will write `assets/ravioli.jpg`.

  Example:

    Create base64 file and import:

  ```bash
  base64 path/to/your/photo.jpg > photo.b64
  python3 scripts/import_base64.py photo.b64
  ```

  Or paste via stdin:

  ```bash
  python3 scripts/import_base64.py -
  # then paste the base64 contents and press Ctrl-D
  ```

Next steps (suggested)

- Add recipe CRUD, pagination, categories, or print-friendly view.
- Add more decorative art (SVG flourishes) or a subtle paper texture background.

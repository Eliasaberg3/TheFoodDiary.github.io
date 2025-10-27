#!/usr/bin/env python3
"""
Simple helper to write a base64-encoded image to assets/ravioli.jpg

Usage:
  1) Copy the image as base64 (e.g., on mac you can run: base64 path/to/image.jpg > image.b64)
  2) Paste the base64 into a file named `image.b64` or run this script and paste into stdin.

Examples:
  python3 scripts/import_base64.py image.b64
  # or
  cat image.b64 | python3 scripts/import_base64.py -

The script will write to `assets/ravioli.jpg` by default.
"""
import sys
import base64
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'assets' / 'ravioli.jpg'

def read_all(fp):
    return fp.read()

def main():
    if len(sys.argv) > 1 and sys.argv[1] != '-':
        path = Path(sys.argv[1])
        if not path.exists():
            print(f"File not found: {path}")
            sys.exit(2)
        b64 = path.read_text()
    else:
        print("Paste base64 image data now, then press Ctrl-D (or Ctrl-Z on Windows):")
        b64 = sys.stdin.read()

    # sanitize
    b64 = b64.strip()
    # if it's a data URL, strip the metadata
    if b64.startswith('data:'):
        comma = b64.find(',')
        if comma != -1:
            b64 = b64[comma+1:]

    try:
        blob = base64.b64decode(b64)
    except Exception as e:
        print("Failed to decode base64:", e)
        sys.exit(3)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_bytes(blob)
    print(f"Wrote {OUT}")

if __name__ == '__main__':
    main()

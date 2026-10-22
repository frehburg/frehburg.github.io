#!/usr/bin/env python3
"""Builds the website into ./_site with ONE Typst command (bundle export).

Typst cannot list directories yet, so this script only tells it which entry
files exist (via --input). Everything else lives in the .typ files.

    python build.py            build into _site/
    python build.py --serve    rebuild on every change and preview locally
"""
import argparse, shutil, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
KINDS = ("blog", "projects", "publications")


def entries(kind):
    files = (ROOT / "content" / kind).glob("*.typ")
    return ",".join(sorted(p.stem for p in files if not p.stem.startswith("_")))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--serve", action="store_true", help="watch for changes and serve on localhost")
    ap.add_argument("--out", default="_site", help="output folder (default: _site)")
    args = ap.parse_args()

    if shutil.which("typst") is None:
        sys.exit("typst not found. Install Typst 0.15 or newer: https://github.com/typst/typst#installation")

    out = ROOT / args.out
    if not args.serve:
        shutil.rmtree(out, ignore_errors=True)  # no stale pages from deleted entries

    cmd = ["typst", "watch" if args.serve else "compile", "--root", str(ROOT),
           "--features", "html,bundle", "--format", "bundle"]
    if (ROOT / "fonts").is_dir():
        cmd += ["--font-path", str(ROOT / "fonts")]  # fonts for the PDF CV
    for kind in KINDS:
        cmd += ["--input", f"{kind}={entries(kind)}"]
    cmd += [str(ROOT / "main.typ"), str(out)]

    print("Entries:", {k: len(entries(k).split(",")) if entries(k) else 0 for k in KINDS})
    try:
        subprocess.run(cmd, check=True)
    except KeyboardInterrupt:
        pass
    except subprocess.CalledProcessError as err:
        sys.exit(err.returncode)
    if not args.serve:
        print(f"Built {out} - open {out / 'index.html'}")


if __name__ == "__main__":
    main()

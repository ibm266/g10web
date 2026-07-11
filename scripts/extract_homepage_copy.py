#!/usr/bin/env python3
"""Extract prose copy from homepage markdown (no images/links noise)."""

from __future__ import annotations

import re
from pathlib import Path

HOME_MD = Path(__file__).resolve().parent.parent / "scraped/content/pages/home.md"
OUT = Path(__file__).resolve().parent.parent / "fable/do-not-load/homepage-copy-raw.md"


def is_noise_line(line: str) -> bool:
    s = line.strip()
    if not s:
        return False
    if s.startswith("!["):
        return True
    if s.startswith("[") and ("](" in s or s == "[ get in touch ]"):
        return True
    if s.startswith("**Source:**") or s.startswith("**Description:**"):
        return True
    if s == "---":
        return True
    if s.startswith("# G10 Studio |") and "Photographer" in s:
        return True
    if s.lower() in ("view fullsize", "* * *"):
        return True
    if re.match(r"^!\[.*\]\(.*\)\s*$", s):
        return True
    return False


def extract() -> str:
    text = HOME_MD.read_text(encoding="utf-8")
    body = text.split("---", 2)[-1] if "---" in text else text
    blocks: list[str] = []
    current: list[str] = []

    for line in body.splitlines():
        if is_noise_line(line):
            if current:
                block = "\n".join(current).strip()
                if block and len(block) > 20:
                    blocks.append(block)
                current = []
            continue
        # Strip markdown link syntax but keep text
        cleaned = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", line)
        cleaned = re.sub(r"\*\*", "", cleaned)
        if cleaned.strip():
            current.append(cleaned.strip())

    if current:
        block = "\n".join(current).strip()
        if block and len(block) > 20:
            blocks.append(block)

    lines = [
        "# Homepage copy (raw extract)",
        "",
        "Auto-extracted from scraped homepage. **BRIEF.md already includes curated homepage copy** — use that for design.",
        "",
        "---",
        "",
    ]
    for block in blocks:
        lines.append(block)
        lines.append("")
        lines.append("---")
        lines.append("")

    return "\n".join(lines)


def main() -> None:
    OUT.write_text(extract(), encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()

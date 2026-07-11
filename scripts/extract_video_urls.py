#!/usr/bin/env python3
"""Extract video and external gallery URLs from scraped HTML (reference only, no downloads)."""

from __future__ import annotations

import html
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parent.parent / "scraped"
HTML_DIR = OUTPUT_DIR / "html"
DATA_DIR = OUTPUT_DIR / "data"


def main() -> int:
    videos: dict[str, dict] = {}
    embeds: list[dict] = []
    external: dict[str, set[str]] = defaultdict(set)

    for html_file in HTML_DIR.rglob("*.html"):
        text = html_file.read_text(errors="ignore")
        rel = str(html_file.relative_to(HTML_DIR))

        for match in re.finditer(r'data-config-video="(\{.*?\})"', text):
            try:
                data = json.loads(html.unescape(match.group(1)))
            except json.JSONDecodeError:
                continue
            vid = data.get("systemDataId")
            if not vid:
                continue
            variants = [v.strip() for v in (data.get("systemDataVariants") or "").split(",") if v.strip()]
            template = data.get("alexandriaUrl") or ""
            entry = videos.setdefault(
                vid,
                {
                    "id": vid,
                    "type": "squarespace-native",
                    "alexandriaUrlTemplate": template,
                    "urlsByResolution": {},
                    "durationSeconds": data.get("durationSeconds"),
                    "aspectRatio": data.get("aspectRatio"),
                    "sourcePages": [],
                    "captions": [],
                },
            )
            for variant in variants:
                entry["urlsByResolution"][variant] = template.replace("{variant}", variant)
            if rel not in entry["sourcePages"]:
                entry["sourcePages"].append(rel)

        for pattern, embed_type in [
            (r"https?://(?:www\.)?youtube\.com/embed/[^\s\"'<>\\]+", "youtube"),
            (r"https?://(?:www\.)?youtu\.be/[^\s\"'<>\\]+", "youtube"),
            (r"https?://(?:player\.)?vimeo\.com/[^\s\"'<>\\]+", "vimeo"),
            (r"https?://(?:www\.)?vimeo\.com/[^\s\"'<>\\]+", "vimeo"),
        ]:
            for url in set(re.findall(pattern, text, re.I)):
                embeds.append(
                    {
                        "url": url.split("&quot;")[0].rstrip("\\"),
                        "type": embed_type,
                        "sourcePage": rel,
                    }
                )

        for url in set(re.findall(r"https?://g10studio\.pixieset\.com[^\s\"'<>\\]*", text, re.I)):
            clean = url.split("&quot;")[0].strip("/").rstrip("\\").lstrip("/")
            if clean.startswith("http"):
                external["pixieset"].add(clean)

    # Pull captions from video blocks
    for html_file in HTML_DIR.rglob("*.html"):
        text = html_file.read_text(errors="ignore")
        rel = str(html_file.relative_to(HTML_DIR))
        for block in re.findall(
            r'data-config-video="\{.*?\}".*?<div class="video-caption">\s*<p[^>]*>(.*?)</p>',
            text,
            re.S,
        ):
            caption = html.unescape(re.sub(r"<[^>]+>", "", block).strip())
            if not caption:
                continue
            for entry in videos.values():
                if rel in entry["sourcePages"] and caption not in entry["captions"]:
                    entry["captions"].append(caption)

    video_list = sorted(videos.values(), key=lambda x: x["id"])
    manifest = {
        "squarespaceVideos": video_list,
        "embeds": embeds,
        "externalGalleries": {k: sorted(v) for k, v in external.items()},
        "stats": {
            "squarespaceVideos": len(video_list),
            "embeds": len(embeds),
            "pixiesetGalleries": len(external.get("pixieset", [])),
        },
    }

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / "videos.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    lines = [
        "# G10 Studio Video References",
        "",
        f"Squarespace native videos: **{len(video_list)}**",
        "",
        "> URLs for reference only — re-host elsewhere for the redesign.",
        "",
    ]
    for video in video_list:
        lines.append(f"## {video['id']}")
        if video.get("captions"):
            lines.append(f"*{video['captions'][0]}*")
            lines.append("")
        lines.append("**URLs:**")
        for resolution, url in sorted(video["urlsByResolution"].items(), reverse=True):
            lines.append(f"- {resolution}: `{url}`")
        lines.append("")
        lines.append(f"Duration: {video.get('durationSeconds', '?')}s")
        lines.append("")

    if external.get("pixieset"):
        lines.extend(["## Pixieset Galleries", ""])
        for url in sorted(external["pixieset"]):
            lines.append(f"- {url}")

    if embeds:
        lines.extend(["", "## Embeds", ""])
        for item in embeds:
            lines.append(f"- [{item['type']}] {item['url']} (from `{item['sourcePage']}`)")

    (DATA_DIR / "videos.md").write_text("\n".join(lines), encoding="utf-8")

    print(json.dumps(manifest["stats"], indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())

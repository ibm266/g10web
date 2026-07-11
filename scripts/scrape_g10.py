#!/usr/bin/env python3
"""Scrape g10.studio content for website redesign."""

from __future__ import annotations

import hashlib
import json
import re
import sys
import time
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import unquote, urlparse, urljoin

import html2text
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.g10.studio"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "scraped"
SITEMAP_PATH = Path(__file__).resolve().parent.parent / "sitemap.xml"

SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "Mozilla/5.0 (compatible; G10RedesignScraper/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }
)

IMAGE_URL_RE = re.compile(
    r"https?://(?:images|static\d?)\.squarespace-cdn\.com/[^\s\"'<>\\]+",
    re.IGNORECASE,
)
VIDEO_URL_RE = re.compile(
    r"https?://(?:video|videos)\.squarespace-cdn\.com/[^\s\"'<>\\]+",
    re.IGNORECASE,
)
EMBED_VIDEO_RE = re.compile(
    r"https?://(?:www\.)?(?:youtube\.com/embed/[^\s\"'<>]+|player\.vimeo\.com/video/[^\s\"'<>]+|youtu\.be/[^\s\"'<>]+)",
    re.IGNORECASE,
)
INTERNAL_LINK_RE = re.compile(r"https?://(?:www\.)?g10\.studio[^\s\"'<>]*", re.IGNORECASE)


def normalize_page_path(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    if not path:
        return "home"
    return path.replace("/", "__")


def page_category(url: str) -> str:
    path = urlparse(url).path.strip("/")
    if not path:
        return "pages"
    if path.startswith("blog/"):
        slug = path.removeprefix("blog/")
        if slug == "blog" or slug.startswith("category/"):
            return "blog"
        return "blog"
    if path.startswith("store"):
        return "store"
    if path.startswith("photography"):
        return "portfolio/photography"
    if "videograph" in path or "video" in path:
        return "portfolio/videography"
    if "photo-portfolio" in path or "portfolio" in path:
        return "portfolio"
    return "pages"


def strip_image_format(url: str) -> str:
    """Prefer original/highest-res image by removing Squarespace format params."""
    parsed = urlparse(url.split("&quot;")[0].split("\\")[0])
    base = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
    return unquote(base)


def safe_filename_from_url(url: str, default_ext: str = "") -> str:
    parsed = urlparse(url)
    name = unquote(Path(parsed.path).name)
    if not name or name == "/":
        digest = hashlib.md5(url.encode()).hexdigest()[:12]
        name = digest + default_ext
    name = re.sub(r"[^\w.\-+]", "_", name)
    if default_ext and "." not in name:
        name += default_ext
    return name[:200]


def fetch(url: str, retries: int = 3) -> requests.Response | None:
    for attempt in range(retries):
        try:
            resp = SESSION.get(url, timeout=60)
            if resp.status_code == 200:
                return resp
            if resp.status_code == 404:
                return None
        except requests.RequestException:
            if attempt == retries - 1:
                return None
            time.sleep(1 + attempt)
    return None


def load_sitemap_urls() -> list[str]:
    urls: set[str] = {BASE_URL, f"{BASE_URL}/"}
    if SITEMAP_PATH.exists():
        tree = ET.parse(SITEMAP_PATH)
        root = tree.getroot()
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        for loc in root.findall(".//sm:loc", ns):
            if loc.text:
                urls.add(loc.text.strip())
    extra = [
        f"{BASE_URL}/videography",
        f"{BASE_URL}/videography/wedding-in-aruba",
        f"{BASE_URL}/videography/events-in-aruba",
        f"{BASE_URL}/videography/reels",
        f"{BASE_URL}/videography/commercial",
        f"{BASE_URL}/photo-portfolio-g10-studio-photographer/destination-weddings-aruba-and-worldwide-photographer",
    ]
    urls.update(extra)
    return sorted(urls)


def discover_links(html: str) -> set[str]:
    found = set(INTERNAL_LINK_RE.findall(html))
    soup = BeautifulSoup(html, "lxml")
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if href.startswith("/"):
            found.add(urljoin(BASE_URL, href))
        elif "g10.studio" in href:
            found.add(href.split("#")[0].rstrip("/"))
    return {u.rstrip("/") for u in found if "g10.studio" in u}


def extract_main_content(soup: BeautifulSoup) -> BeautifulSoup:
    for selector in [
        "article",
        "main",
        ".sections",
        "#sections",
        ".content-wrapper",
        "body",
    ]:
        node = soup.select_one(selector)
        if node:
            return node
    return soup.body or soup


def html_to_markdown(html: str, url: str) -> str:
    soup = BeautifulSoup(html, "lxml")
    title = soup.title.get_text(strip=True) if soup.title else url
    meta_desc = ""
    desc_tag = soup.find("meta", attrs={"name": "description"})
    if desc_tag and desc_tag.get("content"):
        meta_desc = desc_tag["content"].strip()

    content = extract_main_content(soup)
    for tag in content.find_all(["script", "style", "noscript", "svg"]):
        tag.decompose()

    converter = html2text.HTML2Text()
    converter.ignore_links = False
    converter.ignore_images = False
    converter.body_width = 0
    body_md = converter.handle(str(content)).strip()

    lines = [f"# {title}", "", f"**Source:** {url}", ""]
    if meta_desc:
        lines.extend([f"**Description:** {meta_desc}", ""])
    lines.extend(["---", "", body_md])
    return "\n".join(lines)


def extract_media_from_html(html: str) -> tuple[set[str], set[str], set[str]]:
    images: set[str] = set()
    videos: set[str] = set()
    embeds: set[str] = set()

    for match in IMAGE_URL_RE.findall(html):
        url = strip_image_format(match)
        if any(x in url.lower() for x in [".ico", "favicon"]):
            continue
        images.add(url)

    for match in VIDEO_URL_RE.findall(html):
        videos.add(match.split("&quot;")[0].split("\\")[0])

    for match in EMBED_VIDEO_RE.findall(html):
        embeds.add(match.split("&quot;")[0])

    soup = BeautifulSoup(html, "lxml")
    for img in soup.find_all("img"):
        for attr in ("src", "data-src", "data-image", "data-srcset"):
            val = img.get(attr)
            if not val:
                continue
            for part in str(val).split(","):
                u = part.strip().split(" ")[0]
                if "squarespace-cdn.com" in u:
                    images.add(strip_image_format(u))

    for source in soup.find_all("source"):
        src = source.get("src")
        if src and ("squarespace-cdn.com" in src or src.endswith((".mp4", ".webm", ".mov"))):
            videos.add(src)

    for video in soup.find_all("video"):
        src = video.get("src")
        if src:
            videos.add(src)
        for source in video.find_all("source"):
            if source.get("src"):
                videos.add(source["src"])

    return images, videos, embeds


def download_asset(url: str, dest: Path) -> dict | None:
    if dest.exists() and dest.stat().st_size > 0:
        return {"url": url, "path": str(dest.relative_to(OUTPUT_DIR)), "cached": True}

    resp = fetch(url)
    if not resp:
        return None

    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(resp.content)
    return {
        "url": url,
        "path": str(dest.relative_to(OUTPUT_DIR)),
        "size": len(resp.content),
        "cached": False,
    }


def scrape_page(url: str) -> dict:
    result = {
        "url": url,
        "success": False,
        "images": [],
        "videos": [],
        "embeds": [],
        "discovered_links": [],
    }

    resp = fetch(url)
    if not resp:
        result["error"] = "fetch_failed"
        return result

    html = resp.text
    page_slug = normalize_page_path(url)
    category = page_category(url)

    html_dir = OUTPUT_DIR / "html" / category
    content_dir = OUTPUT_DIR / "content" / category
    html_dir.mkdir(parents=True, exist_ok=True)
    content_dir.mkdir(parents=True, exist_ok=True)

    html_path = html_dir / f"{page_slug}.html"
    md_path = content_dir / f"{page_slug}.md"

    html_path.write_text(html, encoding="utf-8")
    md_path.write_text(html_to_markdown(html, url), encoding="utf-8")

    images, videos, embeds = extract_media_from_html(html)
    result["discovered_links"] = sorted(discover_links(html))

    page_images_dir = OUTPUT_DIR / "assets" / "images" / "by-page" / category / page_slug
    page_videos_dir = OUTPUT_DIR / "assets" / "videos" / "by-page" / category / page_slug
    all_images_dir = OUTPUT_DIR / "assets" / "images" / "all"
    all_videos_dir = OUTPUT_DIR / "assets" / "videos" / "all"

    for img_url in sorted(images):
        fname = safe_filename_from_url(img_url)
        page_dest = page_images_dir / fname
        all_dest = all_images_dir / fname
        meta = download_asset(img_url, page_dest)
        if meta:
            if not all_dest.exists():
                all_dest.parent.mkdir(parents=True, exist_ok=True)
                all_dest.write_bytes(page_dest.read_bytes())
            meta["filename"] = fname
            result["images"].append(meta)

    for vid_url in sorted(videos):
        fname = safe_filename_from_url(vid_url, ".mp4")
        page_dest = page_videos_dir / fname
        all_dest = all_videos_dir / fname
        meta = download_asset(vid_url, page_dest)
        if meta:
            if not all_dest.exists():
                all_dest.parent.mkdir(parents=True, exist_ok=True)
                all_dest.write_bytes(page_dest.read_bytes())
            meta["filename"] = fname
            result["videos"].append(meta)

    for embed in sorted(embeds):
        result["embeds"].append({"url": embed, "type": "youtube/vimeo embed"})

    result["success"] = True
    result["html_path"] = str(html_path.relative_to(OUTPUT_DIR))
    result["markdown_path"] = str(md_path.relative_to(OUTPUT_DIR))
    result["title"] = BeautifulSoup(html, "lxml").title.get_text(strip=True) if html else ""
    return result


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Loading URLs from sitemap...")
    urls = load_sitemap_urls()
    print(f"Starting with {len(urls)} URLs")

    manifest: dict = {
        "source": BASE_URL,
        "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "pages": [],
        "stats": {},
    }

    # First pass: scrape known URLs and collect discovered links
    to_scrape = list(urls)
    scraped: set[str] = set()
    all_results: list[dict] = []

    max_workers = 6

    while to_scrape:
        batch = [u for u in to_scrape if u.rstrip("/") not in scraped][:50]
        if not batch:
            break

        print(f"\nScraping batch of {len(batch)} pages ({len(scraped)} done)...")
        with ThreadPoolExecutor(max_workers=max_workers) as pool:
            futures = {pool.submit(scrape_page, url): url for url in batch}
            for future in as_completed(futures):
                url = futures[future]
                scraped.add(url.rstrip("/"))
                try:
                    result = future.result()
                except Exception as exc:  # noqa: BLE001
                    result = {"url": url, "success": False, "error": str(exc)}
                all_results.append(result)
                status = "OK" if result.get("success") else "FAIL"
                imgs = len(result.get("images", []))
                vids = len(result.get("videos", []))
                print(f"  [{status}] {url} ({imgs} imgs, {vids} vids)")

                for link in result.get("discovered_links", []):
                    norm = link.rstrip("/")
                    if norm not in scraped and link not in to_scrape:
                        to_scrape.append(link)

        to_scrape = [u for u in to_scrape if u.rstrip("/") not in scraped]

    manifest["pages"] = sorted(all_results, key=lambda x: x.get("url", ""))
    manifest["stats"] = {
        "total_urls": len(all_results),
        "successful": sum(1 for p in all_results if p.get("success")),
        "failed": sum(1 for p in all_results if not p.get("success")),
        "total_images": sum(len(p.get("images", [])) for p in all_results),
        "total_videos": sum(len(p.get("videos", [])) for p in all_results),
        "total_embeds": sum(len(p.get("embeds", [])) for p in all_results),
    }

    manifest_path = OUTPUT_DIR / "data" / "manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    # Write URL index
    index_lines = ["# G10 Studio Scraped Content Index", "", f"Scraped: {manifest['scraped_at']}", ""]
    by_cat: dict[str, list] = {}
    for page in all_results:
        if not page.get("success"):
            continue
        cat = page_category(page["url"])
        by_cat.setdefault(cat, []).append(page)

    for cat in sorted(by_cat):
        index_lines.append(f"## {cat}")
        index_lines.append("")
        for page in sorted(by_cat[cat], key=lambda p: p["url"]):
            title = page.get("title") or page["url"]
            md = page.get("markdown_path", "")
            index_lines.append(f"- [{title}]({md}) — `{page['url']}`")
        index_lines.append("")

    (OUTPUT_DIR / "INDEX.md").write_text("\n".join(index_lines), encoding="utf-8")

    print("\n=== Scrape complete ===")
    print(json.dumps(manifest["stats"], indent=2))
    print(f"Output: {OUTPUT_DIR}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

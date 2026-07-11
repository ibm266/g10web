#!/usr/bin/env python3
"""Capture reference screenshots of g10.studio for redesign brief."""

from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parent.parent / "context" / "reference" / "screenshots"
OUT.mkdir(parents=True, exist_ok=True)

PAGES = [
    ("home", "https://www.g10.studio/"),
    ("wedding-landing", "https://www.g10.studio/wedding-photographer-in-aruba"),
    ("about", "https://www.g10.studio/about-jiten-melwani-aruba-photographer"),
    ("photography-wedding", "https://www.g10.studio/photography/wedding-in-aruba"),
    ("photography-couple", "https://www.g10.studio/photography/couple-in-aruba"),
    ("videography", "https://www.g10.studio/videography"),
    ("videography-wedding", "https://www.g10.studio/videography/wedding-in-aruba"),
    ("inquire", "https://www.g10.studio/inquiry-decision-wedding-photoshoot"),
    ("blog", "https://www.g10.studio/blog"),
]


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        )
        page = context.new_page()

        for slug, url in PAGES:
            print(f"Capturing {slug}...")
            try:
                page.set_viewport_size({"width": 1440, "height": 900})
                page.goto(url, wait_until="networkidle", timeout=90000)
                page.wait_for_timeout(2500)
                page.screenshot(path=str(OUT / f"{slug}-desktop-hero.png"), full_page=False)
                page.screenshot(path=str(OUT / f"{slug}-desktop-full.png"), full_page=True)

                page.set_viewport_size({"width": 390, "height": 844})
                page.goto(url, wait_until="networkidle", timeout=90000)
                page.wait_for_timeout(1500)
                page.screenshot(path=str(OUT / f"{slug}-mobile-hero.png"), full_page=False)
            except Exception as exc:  # noqa: BLE001
                print(f"  FAILED {slug}: {exc}")

        browser.close()

    print(f"Saved {len(list(OUT.glob('*.png')))} screenshots to {OUT}")


if __name__ == "__main__":
    main()

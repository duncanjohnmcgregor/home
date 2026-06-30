# Austin → Sydney — Move Inventory

A phone-native web app to catalog your possessions and triage what to **ship,
take in luggage, sell, donate, give away, or bin** for the move to Sydney.

Seeded from 2 photos (living room + bedroom/kitchen) → **31 items, ~$9,975 est.**

## Use it on your phone
Open `inventory/index.html` in a mobile browser (see options below). It's a
single self-contained file — works offline, saves to the browser, no login.

- **Tap a card** to edit any field or add a photo (uses your camera).
- **⚡ Quick triage** walks you through flagged items one at a time — tap Ship /
  Sell / Donate / etc. to decide fast.
- **＋ Add item** for anything the photos missed.
- **⋯ menu → Download Notion CSV** to push everything into your Notion page.

### Quickest ways to get it on your phone
1. **GitHub Pages**: enable Pages for this repo → visit `…/inventory/`. (Best —
   it's a real URL you can bookmark / "Add to Home Screen".)
2. Or open the raw file via your repo on your phone.
3. Or run `python3 -m http.server` in this folder and open it on your phone over Wi-Fi.

## Getting it into Notion (no Notion API is connected to this session)
Claude can't write to your Notion page directly here, so use the export:
1. In the app: **⋯ → Download Notion CSV**.
2. In Notion, open **Austin → Sydney move inventory**, type `/import` → **CSV**,
   pick the file (or just drag the file onto the page).
3. Notion builds a database with all columns. Re-export + re-import to update.

`move-inventory.csv` and `move-inventory.md` in this folder are pre-generated
from the seed so you can import immediately, before editing anything.

## Australia-specific flags baked in
- **Voltage:** US is 120V/60Hz, Australia is 240V/50Hz with Type-I plugs.
  Heating appliances (rice cooker, toaster oven) **won't work** → sell here.
  Electronics with dual-voltage bricks (PS5, laptops, phone/tablet chargers)
  are fine with a plug adapter.
- **Biosecurity:** Australia bans bringing live plants & soil → the monstera is
  flagged *give away*.
- **Bed sizes:** AU "King" ≠ US "King", so US sheets won't fit a new AU bed.

## Files
| File | What it is |
|---|---|
| `index.html` | The phone app (open this) |
| `data/seed.json` / `data/seed.js` | The photo-seeded starting inventory |
| `move-inventory.csv` | Ready-to-import Notion database |
| `move-inventory.md` | Readable summary by room |

> Values are rough triage estimates, not appraisals. Items marked 🔎 need your
> confirmation — that's the fastest place to start in **Quick triage**.

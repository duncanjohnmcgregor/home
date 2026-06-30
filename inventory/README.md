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

### Deploy to your homelab (recommended)
It's a static site, so any web server works. Easiest is the included container:

```bash
cd inventory
docker compose up -d --build      # serves on port 8088
```

Then on your phone (same network) open **http://<homelab-ip>:8088** and use
your browser's **Add to Home Screen** so it behaves like a native app.

- Change the port: `INVENTORY_PORT=9000 docker compose up -d --build`
- Already running the full Life-Manager stack? It's wired in there too —
  `docker compose up -d inventory` from the repo root exposes the same `:8088`.
- Put it behind your reverse proxy (Traefik/Caddy/NPM) for a tidy hostname like
  `inventory.home.lan` and HTTPS on your LAN.

### Other quick options
- No Docker: `cd inventory && python3 -m http.server 8088` then open it over Wi-Fi.
- Just want it on one phone: open `index.html` from the repo in mobile Safari/Chrome.

> Data lives in each device's browser (localStorage). To move your edits between
> devices, use **⋯ → Backup JSON** on one and **Restore from JSON** on the other.

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

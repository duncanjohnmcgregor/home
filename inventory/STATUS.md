# Handoff — Austin → Sydney Move Inventory

Context note for a fresh Claude session (e.g. the homelab CLI) picking this up.
Read this first, then `inventory/README.md`.

## Goal
Catalog the owner's possessions and triage them for an **Austin, TX → Sydney, AU**
move (ship / take in luggage / sell / donate / give away / bin). Deliver it as a
**phone-native** experience. Original ask also mentioned populating a Notion page
called "Austin → Sydney move inventory".

## What's done
- Built a self-contained, mobile-first web app: `inventory/index.html`
  (HTML/CSS/JS, no build step). localStorage persistence, per-item camera
  capture, ⚡ quick-triage flow, and CSV/Markdown/JSON export.
- Seeded **31 items, ~$9,975 USD est.** from two photos (living room +
  bedroom/kitchen). Seed data: `inventory/data/seed.json` (+ `seed.js` for the app).
- Pre-generated Notion import: `inventory/move-inventory.csv` and a readable
  `inventory/move-inventory.md`.
- Homelab deploy: `inventory/Dockerfile` + `nginx.conf` + standalone
  `inventory/docker-compose.yml` (serves on `:8088`); also wired an optional
  `inventory` service into the repo-root `docker-compose.yml`.
- Australia-specific flags baked into items: 120V→240V voltage (heating
  appliances won't work), plant/soil biosecurity ban, US-vs-AU King bed sizing.

Branch: `claude/possession-inventory-catalog-x5tzta` (all work committed + pushed).

## Known environment constraints (in the original web session)
- **No Notion integration was connected** — couldn't write to the Notion page
  directly. Worked around it with the importable CSV. If Notion is available in
  the homelab session, populate the page directly instead.
- **No Gmail / Amazon / bank access** — couldn't auto-pull purchase receipts.
  Only Google Drive + GitHub were connected. (Drive had an old `US Move` folder
  + `USA Move Planning` doc from the 2024 move — potential reference.)
- No Docker daemon in the web session, so the image was never actually built —
  validate `docker compose up -d --build` on the homelab.

## Open questions for the owner (start quick-triage here)
- TV: exact size/model? (seeded as ~65" Sony)
- The tall black cylinder by the TV — Sonos? subwoofer? floor speaker? (low confidence)
- Roughly how many boxes of **clothing** and **books**? (drives ship vs sell)
- How many DualSense controllers; iPad model; router brand; sneaker brand/size.

## Suggested next steps
1. Get more **room-by-room photos**: closet/wardrobe close-up, kitchen
   cabinets/drawers open, bathroom, any storage closet, balcony, cables/electronics
   drawer. Add identified items to `data/seed.json` (keep the same field shape).
2. Optional: add a small backend + volume so edits **sync across devices**
   (currently per-device localStorage). The repo already has Node/Express +
   Postgres scaffolding to build on.
3. If Notion access exists here: import `move-inventory.csv` or push rows directly.

## Item field shape (for adding items)
```json
{"id":"unique-id","name":"...","category":"Electronics|Furniture|Kitchen Appliance|Kitchen|Clothing|Shoes|Linens|Decor|Lighting|Fitness|Plants|Misc",
 "room":"Living Room|Bedroom|Kitchen|Bathroom|Office|Other","qty":1,"value":0,
 "decision":"Ship|Take in luggage|Sell|Donate|Give away|Bin|Unsure",
 "voltage":"AU power note or empty","note":"...","confidence":"high|medium|low","needsConfirm":true}
```
After editing `seed.json`, regenerate derivatives:
```bash
cd inventory && python3 - <<'PY'
import json,csv
d=json.load(open('data/seed.json'))
open('data/seed.js','w').write("window.MOVE_SEED = "+json.dumps(d,ensure_ascii=False,indent=2)+";\n")
PY
```
(or just add items in-app and use ⋯ → Backup JSON).

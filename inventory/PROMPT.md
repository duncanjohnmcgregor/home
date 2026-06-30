# ACTION PROMPT — Move Inventory (read and execute)

You are picking up an in-progress project in this repo. Treat this file as your
task brief and start working. Begin by reading `inventory/STATUS.md` and
`inventory/README.md` for full context, then do the work below.

## The mission
Help the owner catalog all their possessions and triage them for an
**Austin, TX → Sydney, AU** move (ship / take in luggage / sell / donate /
give away / bin), delivered as a **phone-native** experience. A prior session
built the app and seeded 31 items from two photos; your job is to extend and
finish it.

## First, check capabilities this environment may have that the prior one lacked
The prior (web) session had **no Notion and no Gmail/Amazon/bank access** — only
Google Drive + GitHub. Check what *you* have:
1. If you have a **Notion** integration: create/populate a page titled
   "Austin → Sydney move inventory" from `inventory/move-inventory.csv`
   (and keep it updated as items change). This was the owner's original request.
2. If you have **Gmail / email / purchase history**: pull receipts/order
   confirmations to (a) discover owned items not in the photos and (b) fill in
   real purchase prices/dates. Add them to the catalog.
3. If neither is available, say so plainly and continue with the steps below.

## Then do these, in order
1. **Confirm the open questions** with the owner before guessing (ask conversationally):
   - TV exact size/model (seeded as ~65" Sony)
   - The tall black cylinder next to the TV — Sonos / subwoofer / floor speaker?
   - Rough box counts for **clothing** and **books** (drives ship-vs-sell)
   - DualSense controller count, iPad model, WiFi router brand, sneaker brand/size
2. **Ask the owner for more room photos** and catalog what you see, room by room:
   closet/wardrobe close-up, kitchen cabinets/drawers open, bathroom, any storage
   closet, balcony, and the cables/electronics drawer. For each new item append an
   object to `inventory/data/seed.json` using the field shape in `STATUS.md`, then
   regenerate `data/seed.js` (and `move-inventory.csv` / `.md`).
3. **Keep the Australia-specific guidance accurate**: US 120V/60Hz → AU 240V/50Hz
   Type-I plugs (heating appliances won't work → sell); no live plants/soil
   (biosecurity); AU "King" ≠ US "King" bedding sizes.
4. **Deploy check** (Docker exists on this homelab, unlike the web session):
   `cd inventory && docker compose up -d --build` → serves on `:8088`. Verify it
   builds and serves, then tell the owner the LAN URL.
5. Optional if asked: add a small backend + DB volume so edits **sync across
   devices** (currently per-device browser localStorage). Express/Postgres
   scaffolding already exists in `backend/`.

## Guardrails
- This is the owner's personal data — don't push it to any public location.
- Work on branch `claude/possession-inventory-catalog-x5tzta`; commit and push
  as you go. Don't open a PR or merge to `main` unless the owner asks.
- When something is ambiguous (e.g. which items to ship vs sell), ask rather
  than assume.

## Regenerate derivatives after editing seed.json
```bash
cd inventory && python3 - <<'PY'
import json
d=json.load(open('data/seed.json'))
open('data/seed.js','w').write("window.MOVE_SEED = "+json.dumps(d,ensure_ascii=False,indent=2)+";\n")
PY
```
(The app's ⋯ → Download Notion CSV / Backup JSON also export current data.)

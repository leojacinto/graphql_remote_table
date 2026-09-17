# Demo steps

Everything below already exists on the instance. See `RECREATE.md` for how
it was built.

Instance: `https://<your-instance>.service-now.com`
Credentials: see `.env`

## The demo (one link)

https://<your-instance>.service-now.com/x_snc_gql_lf_country_list.do

Open it. 250 rows, real country data. That's it — no steps, no curl, no
"here's the JSON."

## What to say when asked "is this live"

**Yes, genuinely.** Say this plainly and be ready to back it up:

- This is a native ServiceNow **Remote Table** (the platform's own
  `com.glide.script.vtable` feature — same mechanism used elsewhere in the
  product, e.g. some SAP integration tables on this very instance).
- The table has **zero real rows stored in the database**. Every time this
  list is opened, a script runs live, sends a real HTTP request to
  `https://countries.trevorblades.com/graphql`, and hands the response back
  as rows on the fly.
- Close the tab and reopen it — the request happens again. There is nothing
  to "refresh" or "sync." There's no sync button because there's nothing to
  sync.

## Proving it, if someone doesn't believe you

```bash
BASE="https://<your-instance>.service-now.com"
AUTH="admin:<password from .env>"

# run it twice, time both
time curl -u "$AUTH" "$BASE/api/now/table/x_snc_gql_lf_country" -o /dev/null -w "%{size_download} bytes\n"
time curl -u "$AUTH" "$BASE/api/now/table/x_snc_gql_lf_country" -o /dev/null -w "%{size_download} bytes\n"
```

Both calls take real network round-trip time (a few hundred ms), not the
near-instant response of a cached database read. That timing is the tell —
a stored copy would be fast and identical every time; this isn't cached
(`cache_ttl = 0` on the script definition), so it's making a fresh outbound
call every single time.

## How it's built, if asked

- Table `x_snc_gql_lf_country`, marked `scriptable_table = true`.
- A `sys_script_vtable` record ("Countries (live GraphQL)") holding the
  query script. It calls the GraphQL API with `sn_ws.RESTMessageV2` and adds
  one row per country via `v_table.addRow(...)`.
- Both are defined as Fluent source and deployed via the Now SDK — see
  `fluent-app/src/fluent/generated/` for the actual `.now.ts` files, and
  `RECREATE.md` for the full build/deploy workflow.
- No proxy, no ngrok, no OpenAPI translation layer, no ZCC-for-ERP
  involvement at all.

## What NOT to claim

- The query sent to GraphQL is fixed (hardcoded), not built dynamically from
  whatever filter/sort the user applies in the list view.
- Only unauthenticated GraphQL sources are supported by this script as
  written.
- This is a proof of concept for one source, not a generic "point this at
  any GraphQL API" tool.

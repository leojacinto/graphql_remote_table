# GraphQL → ServiceNow Remote Table — recreation steps

A live-connectopm, zero-copy ServiceNow table backed by GraphQL API.
No stored copy, no staging table, no transform. Opening
the table triggers a real HTTP call to the real GraphQL API, every time.

Real source used: the free, public, unauthenticated
[Countries GraphQL API](https://countries.trevorblades.com/graphql).

Instance used: `<your-instance>.service-now.com` (credentials in `.env`).

App scope: `x_snc_gql_lf`

**Now managed as a proper Now SDK / Fluent project** in `fluent-app/`, not
ad-hoc Table API calls. See "Fluent conversion" below for how and why.

## What this is, mechanically

ServiceNow has a native, generic platform feature called **Remote Tables**
(plugin `com.glide.script.vtable`) — nothing to do with Zero Copy Connector
for ERP or Data Fabric. A table can be marked `scriptable_table = true` on
its `sys_db_object` record. Once marked, the table has **no real rows in the
database** — every query against it runs an associated `sys_script_vtable`
"Query" script live, which builds rows on the fly via `v_table.addRow(...)`
and hands them back. Close the list, the data is gone; open it again, the
script runs again.

## 1. The script

The `executeQuery(v_table, v_query)` function (now living inside
`fluent-app/src/fluent/generated/other/sys-script-vtable/*.now.ts` as the
`script` property of a `Record('sys_script_vtable', ...)`) that:
1. POSTs a fixed GraphQL query to `https://countries.trevorblades.com/graphql`
   via `sn_ws.RESTMessageV2` (standard outbound REST call, no special access
   needed, no locked script includes involved).
2. Parses the JSON response.
3. Calls `v_table.addRow({...})` once per country.

Nothing here is scoped-app-specific or privileged — this is the same public
API any ServiceNow script can use.

## 2. This is a Now SDK / Fluent project — build and deploy it

Everything below (table + query script) is defined as Fluent source in
`fluent-app/` and deployed with the SDK, not built by hand via raw Table API
calls (that's how it was originally prototyped; see "Fluent conversion"
below for how it got here).

```bash
cd fluent-app
npm install                                    # one-time
npx @servicenow/sdk auth --add https://<your-instance>.service-now.com \
  --type basic --alias <instance-alias> --username admin --password-stdin
                                                # one-time, pipe password in
npx @servicenow/sdk build                       # compile + validate
npx @servicenow/sdk install --auth <instance-alias>   # deploy
```

`scriptable_table: true` on the `Table()` definition is the one property
that matters — it's a documented Fluent `table-api` property, confirmed
against a real, already-existing remote table on this instance
(`sn_erp_integration_st_sap_sales_revenue_recognition`) before relying on it.

`cache_ttl: 0` on the `sys_script_vtable` Record means no caching — every
list refresh re-runs the script and re-hits the real API.

## 3. Use it

Just open the table. No sync step, no separate "run" endpoint, no toggle to
remember:

https://<your-instance>.service-now.com/x_snc_gql_lf_country_list.do

Or via Table API — same effect, triggers the same live call:
```bash
curl -u "admin:<password from .env>" \
  "https://<your-instance>.service-now.com/api/now/table/x_snc_gql_lf_country"
```

Proof it's live, not cached or stored: two consecutive calls both
take real network round-trip time (300-1000ms), not near-instant DB-read
time, and no `insert` was ever made into this table — it has zero real rows
by construction.

## Fluent conversion — how this went from raw API calls to a real SDK project

This was originally built entirely via raw `POST`/`DELETE` calls against
`sys_db_object`, `sys_dictionary`, and `sys_script_vtable` (no local source
of truth, nothing to diff or re-deploy). Converted to Fluent like this:

```bash
mkdir fluent-app && cd fluent-app
npx @servicenow/sdk auth --add <instance-url> --type basic --alias <alias> \
  --username admin --password-stdin
npx @servicenow/sdk init --from <sys_id_of_the_x_snc_gql_lf_app> \
  --auth <alias> --packageName "graphql-live-remote-table-lf"
npm install
npx @servicenow/sdk transform --from .        # XML -> Fluent .now.ts
npx @servicenow/sdk build                     # validate
```

`init --from` pulled the existing table, its columns, the `sys_script_vtable`
record, and the default list layout down as raw XML into `metadata/`.
`transform` converted that XML into two Fluent files: a `Table()` with
`scriptableTable: true`, and a `Record('sys_script_vtable', {...})` holding
the exact same query script, unchanged.

Then, to make the deploy authoritative (avoid ambiguity between the
manually-created live records and what Fluent would create), the manually
created table and `sys_script_vtable` record were deleted from the instance
first, and `npx @servicenow/sdk install` recreated them fresh from the
Fluent source — new `sys_id`s, identical behavior, verified live again
afterward (see "Use it" above).

Fluent has **no dedicated construct for the query script itself** — only the
generic `Record()` fallback API, which just re-embeds the same raw script
string. The only truly "native" Fluent alternative would be rebuilding the
query logic as a `Flow` with a `remoteTableQuery` trigger instead of a plain
script — a different architecture, not attempted here.

## Screenshot

- `screenshot_live_remote_table.png` — the real ServiceNow list view, 250
  rows, populated by the live script on page load (taken under the old
  `x_snc_zccrest_lf` scope name before the rename; content and behavior are
  identical under `x_snc_gql_lf`)

## Known limitations (still true, stated plainly)

- No auth-source support in the script (unauthenticated GraphQL endpoints
  only) — would need a Connection & Credential Alias wired into the script
  for a real auth-protected source.
- The query is fixed (hardcoded GraphQL query string) — no dynamic
  query-building from `v_query`'s filter/sort conditions yet, so ServiceNow
  list filters/sorts apply as post-filtering on the full result, not pushed
  down to the GraphQL query itself.
- Default row cap is 1,000 per the platform's remote table default; larger
  result sets need the `Enhanced Capacity` option on the script definition
  (not enabled here — 250 countries doesn't need it).
- This is a proof of concept for one GraphQL source (Countries API), not a
  generic "any GraphQL API" onboarding tool — there's no UI to point it at a
  different endpoint without editing the script.

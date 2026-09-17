import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_snc_gql_lf_country',
    view: default_view,
    columns: ['name', 'capital', 'code', 'currency', 'languages'],
})

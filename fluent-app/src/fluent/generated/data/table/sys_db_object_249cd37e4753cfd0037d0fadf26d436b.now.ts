import { Table, StringColumn } from '@servicenow/sdk/core'

export const x_snc_gql_lf_country = Table({
    actions: {
        read: true,
        update: false,
        delete: false,
        create: false,
    },
    allowClientScripts: false,
    allowNewFields: false,
    allowUiActions: false,
    allowWebServiceAccess: true,
    attributes: {
        enforce_dot_walk_cross_scope_access: true,
    },
    label: 'Countries (live GraphQL remote table)',
    name: 'x_snc_gql_lf_country',
    schema: {
        capital: StringColumn({
            maxLength: 100,
        }),
        name: StringColumn({
            label: 'Country name',
            maxLength: 100,
        }),
        currency: StringColumn({
            maxLength: 50,
        }),
        languages: StringColumn({
            maxLength: 255,
        }),
        code: StringColumn({
            label: 'Country code',
            maxLength: 10,
        }),
    },
    scriptableTable: true,
})

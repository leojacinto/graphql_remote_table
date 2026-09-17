import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['c9bc5bbe4753cfd0037d0fadf26d4327'],
    table: 'sys_script_vtable',
    data: {
        active: true,
        advanced: false,
        cache_empty_query_results: true,
        cache_isolation_level: 'USER',
        cache_strategy: 'CACHE_BY_QUERY',
        cache_ttl: 0,
        delete_script:
            '(function executeDelete(v_record) {     // Parameters:     //      v_record - a map of field names and values containing (among others) the     //              sys_id of the record that needs to be deleted on the remote system     //          v_record.<field_name>                  - fields in the remote table GlideRecord     //          v_record.setLastErrorMessage(message)   - signal an error      // Sample code:     //  try {     //      update-external-system;     //      if (there-was-an-error) {     //          var message = ...;     //          v_record.setLastErrorMessage(message);     //      }     //  } catch (ex) {     //      var message = ex.getMessage();     //      v_record.setLastErrorMessage(message);     //  }  })(v_record);',
        editable: false,
        enhanced_capacity: false,
        insert_script:
            '(function executeInsert(v_record) {     // Parameters:     //      v_record is a map of field names and values containing the sys_id of the     //              record and the fields that need to be inserted in the record on the     //              remote system (source of data)          //          v_record.<field_name>                   - fields in the remote table GlideRecord     //          v_record.setLastErrorMessage(message)   - signal an error      // Sample code:     //  try {     //      update-external-system;     //      if (there-was-an-error) {     //          var message = ...;     //          v_record.setLastErrorMessage(message);     //      }     //  } catch (ex) {     //      var message = ex.getMessage();     //      v_record.setLastErrorMessage(message);     //  }  })(v_record);',
        name: 'Countries (live GraphQL)',
        script: `(function executeQuery(v_table, v_query) {
    // Genuinely live: this runs every time the remote table is queried
    // (cache_ttl=0, no caching). Nothing about this data is stored anywhere
    // in ServiceNow - it's fetched from the real public GraphQL API on the
    // fly, right here, and handed straight to v_table.addRow().
    var r = new sn_ws.RESTMessageV2();
    r.setHttpMethod('POST');
    r.setEndpoint('https://countries.trevorblades.com/graphql');
    r.setRequestHeader('Content-Type', 'application/json');
    var query = '{ countries { code name capital currency languages { name } } }';
    r.setRequestBody(JSON.stringify({ query: query }));
    var res = r.execute();

    if (res.getStatusCode() != 200) {
        v_query.setLastErrorMessage('GraphQL request failed: HTTP ' + res.getStatusCode());
        return;
    }

    var body = JSON.parse(res.getBody());
    var countries = (body.data && body.data.countries) || [];

    for (var i = 0; i < countries.length; i++) {
        var c = countries[i];
        var langs = (c.languages || []).map(function(l) { return l.name; }).join(', ');
        v_table.addRow({
            sys_id: c.code,
            code: c.code,
            name: c.name || '',
            capital: c.capital || '',
            currency: c.currency || '',
            languages: langs
        });
    }
})(v_table, v_query);
`,
        sys_domain: 'global',
        sys_domain_path: '/',
        table: 'x_snc_gql_lf_country',
        update_script:
            '(function executeUpdate(v_record, v_changed_fields) {     // Parameters:     //    v_record - a map of field names and values containing the sys_id of the record     //          v_record.<field_name>                   - fields in the remote table GlideRecord     //          v_record.setLastErrorMessage(message)   - signal an error     //    v_changed_fields - a map of field names and values containing the sys_id of the     //          v_changed_fields.<field_name>           - changed fields in the remote table GlideRecord      // Sample code:     //  try {     //      update-external-system;     //      if (there-was-an-error) {     //          var message = ...;     //          v_record.setLastErrorMessage(message);     //      }     //  } catch (ex) {     //      var message = ex.getMessage();     //      v_record.setLastErrorMessage(message);     //  }  })(v_record, v_changed_fields);',
    },
})

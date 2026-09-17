import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '717ee5f775e24765bf98906e693e51b8'
                    }
                    c9bc5bbe4753cfd0037d0fadf26d4327: {
                        table: 'sys_script_vtable'
                        id: 'c9bc5bbe4753cfd0037d0fadf26d4327'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'cb6ea16a7af2440a9601680ec533b7b6'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '351406a03f9b46359894d4fb35e2edcd'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3adebaca7f514e7087ad748cf56ddd2d'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'languages'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '419c5b7e4753cfd0037d0fadf26d433b'
                        key: {
                            name: 'x_snc_gql_lf_country'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5bd650bd6f6e4524bc9e9d1befbe7a93'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '628d9f7a4793cfd0037d0fadf26d4390'
                        key: {
                            list_id: {
                                id: 'e68d5bbe4713cfd0037d0fadf26d43ae'
                                key: {
                                    name: 'x_snc_gql_lf_country'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6df9c56ac29b4200b7fbe615316ba115'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'currency'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '730fd6b5e89145108c355feaee80d28b'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'capital'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '841514dc8a904b38951bdfb6cb26635c'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b7eb133678c342fca0efa071d68663b1'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'capital'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bebee0c8de6c407a95b7821eb242f065'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'languages'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c578c2c529ac43b2818cfbe2d411398f'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ca1d4e380da44c439dc20cac6e8b3c36'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'currency'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cbfd3781ba2f40b79256996b81921b64'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'code'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e102907ccc754c4c943e42874105802f'
                        key: {
                            name: 'x_snc_gql_lf_country'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e28d9f7a4793cfd0037d0fadf26d4391'
                        key: {
                            list_id: {
                                id: 'e68d5bbe4713cfd0037d0fadf26d43ae'
                                key: {
                                    name: 'x_snc_gql_lf_country'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'capital'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e28d9f7a4793cfd0037d0fadf26d4392'
                        key: {
                            list_id: {
                                id: 'e68d5bbe4713cfd0037d0fadf26d43ae'
                                key: {
                                    name: 'x_snc_gql_lf_country'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'currency'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'e68d5bbe4713cfd0037d0fadf26d43ae'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ea8d9f7a4793cfd0037d0fadf26d4391'
                        key: {
                            list_id: {
                                id: 'e68d5bbe4713cfd0037d0fadf26d43ae'
                                key: {
                                    name: 'x_snc_gql_lf_country'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'code'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ea8d9f7a4793cfd0037d0fadf26d4392'
                        key: {
                            list_id: {
                                id: 'e68d5bbe4713cfd0037d0fadf26d43ae'
                                key: {
                                    name: 'x_snc_gql_lf_country'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'languages'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fed9c3065914443d886808ea50c1a05f'
                        key: {
                            name: 'x_snc_gql_lf_country'
                            element: 'code'
                        }
                    },
                ]
            }
        }
    }
}

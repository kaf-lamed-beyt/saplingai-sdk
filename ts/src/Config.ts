
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SaplingSdk',
        slug: "sapling-sdk",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.sapling.ai",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        account: {
        },
  
        analysi: {
        },
  
        custom_filter: {
        },
  
        custom_mapping: {
        },
  
        detection: {
        },
  
        dictionary: {
        },
  
        file: {
        },
  
        generation: {
        },
  
        proofreading: {
        },
  
        service: {
        },
  
    }
  }


  entity = {
    "account": {
      "fields": [
        {
          "name": "accepts",
          "title": "Accepts",
          "type": "`$INTEGER`"
        },
        {
          "name": "active_users",
          "title": "Active Users",
          "type": "`$OBJECT`"
        },
        {
          "name": "by_api_key",
          "title": "By Api Key",
          "type": "`$OBJECT`"
        },
        {
          "name": "by_endpoint",
          "title": "By Endpoint",
          "type": "`$OBJECT`"
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`"
        },
        {
          "name": "daily_usage",
          "title": "Daily Usage",
          "type": "`$ANY`",
          "short": "Characters per day."
        },
        {
          "name": "data",
          "title": "Data",
          "type": "`$OBJECT`"
        },
        {
          "name": "edits_accepted",
          "title": "Edits Accepted",
          "type": "`$INTEGER`"
        },
        {
          "name": "edits_ignored",
          "title": "Edits Ignored",
          "type": "`$INTEGER`"
        },
        {
          "name": "edits_shown",
          "title": "Edits Shown",
          "type": "`$INTEGER`"
        },
        {
          "name": "end_date",
          "title": "End Date",
          "type": "`$STRING`"
        },
        {
          "name": "end_days_back",
          "title": "End Days Back",
          "type": "`$INTEGER`",
          "short": "Window end, in days before today."
        },
        {
          "name": "ignores",
          "title": "Ignores",
          "type": "`$INTEGER`"
        },
        {
          "name": "interval",
          "title": "Interval",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "last_updated",
          "title": "Last Updated",
          "type": "`$ANY`",
          "short": "ISO timestamp, or null."
        },
        {
          "name": "monthly_usage",
          "title": "Monthly Usage",
          "type": "`$ANY`",
          "short": "Characters per month."
        },
        {
          "name": "quota",
          "title": "Quota",
          "type": "`$INTEGER`"
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "start_date",
          "title": "Start Date",
          "type": "`$STRING`"
        },
        {
          "name": "start_days_back",
          "title": "Start Days Back",
          "type": "`$INTEGER`",
          "short": "Window start, in days before today."
        },
        {
          "name": "total_characters",
          "title": "Total Characters",
          "type": "`$INTEGER`"
        },
        {
          "name": "total_cost_usd",
          "title": "Total Cost Usd",
          "type": "`$NUMBER`"
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        }
      ],
      "name": "account",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/account/status",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "account"
                },
                {
                  "lit": "status"
                }
              ],
              "parts": [
                "api",
                "v1",
                "account",
                "status"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {
                "$action": "status"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/reporting/api_endpoint_usage",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "reporting"
                },
                {
                  "lit": "api_endpoint_usage"
                }
              ],
              "parts": [
                "api",
                "v1",
                "reporting",
                "api_endpoint_usage"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/reporting/api_quota_usage",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "reporting"
                },
                {
                  "lit": "api_quota_usage"
                }
              ],
              "parts": [
                "api",
                "v1",
                "reporting",
                "api_quota_usage"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/reporting/api_usage",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "reporting"
                },
                {
                  "lit": "api_usage"
                }
              ],
              "parts": [
                "api",
                "v1",
                "reporting",
                "api_usage"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/reporting/api_user_activity",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "reporting"
                },
                {
                  "lit": "api_user_activity"
                }
              ],
              "parts": [
                "api",
                "v1",
                "reporting",
                "api_user_activity"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/account/status",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "account"
                },
                {
                  "lit": "status"
                }
              ],
              "parts": [
                "api",
                "v1",
                "account",
                "status"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {
                "$action": "status"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "analysi": {
      "fields": [
        {
          "name": "categories",
          "title": "Categories",
          "type": "`$ARRAY`",
          "short": "Categories to check."
        },
        {
          "name": "characters",
          "title": "Characters",
          "type": "`$INTEGER`"
        },
        {
          "name": "context",
          "title": "Context",
          "type": "`$STRING`",
          "short": "Optional guidance (max 500 chars): what the texts are and how to decide borderline cases."
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "Naive ISO 8601 timestamp (UTC, no offset)."
        },
        {
          "name": "fields",
          "title": "Fields",
          "type": "`$ARRAY`",
          "req": true,
          "short": "The fields to extract (1-20): field names (<=50 chars), or {name, type, description (<=200 chars), required} objects."
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "keywords",
          "title": "Keywords",
          "type": "`$ARRAY`",
          "short": "Target keyword phrases, most important first (max 10)."
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "`$ARRAY`",
          "req": true,
          "short": "The candidate labels (2-20): label names (<=50 chars), or {name, description (<=200 chars)} objects."
        },
        {
          "name": "lang",
          "title": "Lang",
          "type": "`$STRING`",
          "short": "ISO 639-1 language code of the text (default \"en\")."
        },
        {
          "name": "multi_label",
          "title": "Multi Label",
          "type": "`$BOOLEAN`",
          "short": "true = several labels may apply at once (labels = those scoring >= threshold)."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "list": {
              "type": "`$STRING`"
            }
          }
        },
        {
          "name": "neighbors",
          "title": "Neighbors",
          "type": "`$ARRAY`",
          "short": "[similarity, term] pairs."
        },
        {
          "name": "query",
          "title": "Query",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "results",
          "title": "Results",
          "type": "`$ARRAY`",
          "short": "Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response."
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "rubric",
          "title": "Rubric",
          "type": "`$BOOLEAN`",
          "short": "Also return the LLM rubric: overall + clarity/coherence/correctness/concision scores, summary and quoted issues with suggested rewrites (default false)."
        },
        {
          "name": "rules",
          "title": "Rules",
          "type": "`$ARRAY`",
          "op": {
            "create": {
              "req": true,
              "type": "`$ARRAY`"
            }
          },
          "short": "The style rules to enforce: 1-20 rules, each a rule name string (at most 80 characters) or a {name, description} object (description at most 400 characters adds nuance the model follows)."
        },
        {
          "name": "ruleset",
          "title": "Ruleset",
          "type": "`$STRING`",
          "short": "The name of a saved ruleset (created via POST /api/v1/styleguide/rulesets) to check against in place of inline rules."
        },
        {
          "name": "sentence_scores",
          "title": "Sentence Scores",
          "type": "`$BOOLEAN`",
          "short": "Also return a 1-5 score per sentence (default false)."
        },
        {
          "name": "suggestions",
          "title": "Suggestions",
          "type": "`$BOOLEAN`",
          "short": "Generate titles/meta descriptions/slug/keywords with the LLM (default true)."
        },
        {
          "name": "synonyms",
          "title": "Synonyms",
          "type": "`$ARRAY`"
        },
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The text to process."
        },
        {
          "name": "texts",
          "title": "Texts",
          "type": "`$ARRAY`",
          "short": "Batch form: 1 to 10 texts, each processed with the same options as a single request."
        },
        {
          "name": "threshold",
          "title": "Threshold",
          "type": "`$NUMBER`",
          "short": "Multi-label cut-off on the per-label score (default 0.5)."
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "Naive ISO 8601 timestamp (UTC, no offset)."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        }
      ],
      "name": "analysi",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/classify",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "classify"
                }
              ],
              "parts": [
                "api",
                "v1",
                "classify"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/extract",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "extract"
                }
              ],
              "parts": [
                "api",
                "v1",
                "extract"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/inclusive",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "inclusive"
                }
              ],
              "parts": [
                "api",
                "v1",
                "inclusive"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/quality",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "quality"
                }
              ],
              "parts": [
                "api",
                "v1",
                "quality"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/sentiment",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "sentiment"
                }
              ],
              "parts": [
                "api",
                "v1",
                "sentiment"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/seo",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "seo"
                }
              ],
              "parts": [
                "api",
                "v1",
                "seo"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.usage`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/statistics",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "statistics"
                }
              ],
              "parts": [
                "api",
                "v1",
                "statistics"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.usage`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/styleguide",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "styleguide"
                }
              ],
              "parts": [
                "api",
                "v1",
                "styleguide"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/styleguide/rulesets",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "styleguide"
                },
                {
                  "lit": "rulesets"
                }
              ],
              "parts": [
                "api",
                "v1",
                "styleguide",
                "rulesets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/thesaurus",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "thesaurus"
                }
              ],
              "parts": [
                "api",
                "v1",
                "thesaurus"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/tone",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "tone"
                }
              ],
              "parts": [
                "api",
                "v1",
                "tone"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/styleguide/rulesets",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "styleguide"
                },
                {
                  "lit": "rulesets"
                }
              ],
              "parts": [
                "api",
                "v1",
                "styleguide",
                "rulesets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rulesets`"
              },
              "args": {
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/styleguide/rulesets",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "styleguide"
                },
                {
                  "lit": "rulesets"
                }
              ],
              "parts": [
                "api",
                "v1",
                "styleguide",
                "rulesets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "custom_filter": {
      "fields": [
        {
          "name": "case_sensitive",
          "title": "Case Sensitive",
          "type": "`$BOOLEAN`",
          "short": "Whether matching is case sensitive."
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "RFC 1123 timestamp, e.g."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "format": "uuid"
        },
        {
          "name": "inp",
          "title": "Inp",
          "type": "`$STRING`",
          "short": "Original text of the suggestion."
        },
        {
          "name": "input",
          "title": "Input",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "out",
          "title": "Out",
          "type": "`$STRING`",
          "short": "Replacement to suppress."
        },
        {
          "name": "output",
          "title": "Output",
          "type": "`$STRING`"
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "RFC 1123 timestamp."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "custom_filter",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/custom_filter",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "custom_filter"
                }
              ],
              "parts": [
                "api",
                "v1",
                "custom_filter"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/custom_filter",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "custom_filter"
                }
              ],
              "parts": [
                "api",
                "v1",
                "custom_filter"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.custom_filters`"
              },
              "args": {
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/custom_filter/{filter_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "custom_filter"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "v1",
                "custom_filter",
                "{id}"
              ],
              "rename": {
                "param": {
                  "filter_id": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "filter_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "custom_mapping": {
      "fields": [
        {
          "name": "case_sensitive",
          "title": "Case Sensitive",
          "type": "`$BOOLEAN`",
          "short": "Whether matching is case sensitive."
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "RFC 1123 timestamp, e.g."
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Shown to the user with the suggestion; null when none was set."
        },
        {
          "name": "entry",
          "title": "Entry",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          }
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "format": "uuid"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "mapping",
          "title": "Mapping",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          }
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "RFC 1123 timestamp."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "custom_mapping",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/custom_mapping",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "custom_mapping"
                }
              ],
              "parts": [
                "api",
                "v1",
                "custom_mapping"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/custom_mapping",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "custom_mapping"
                }
              ],
              "parts": [
                "api",
                "v1",
                "custom_mapping"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.custom_mappings`"
              },
              "args": {
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/custom_mapping/{mapping_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "custom_mapping"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "v1",
                "custom_mapping",
                "{id}"
              ],
              "rename": {
                "param": {
                  "mapping_id": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "mapping_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "detection": {
      "fields": [
        {
          "name": "ai_fraction",
          "title": "Ai Fraction",
          "type": "`$NUMBER`",
          "short": "Share (0-1) of the text in sentences scoring >= 0.5; reports partially AI-written documents whose overall score stays below 0.5."
        },
        {
          "name": "characters",
          "title": "Characters",
          "type": "`$INTEGER`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "labels",
          "title": "Labels",
          "type": "`$ARRAY`"
        },
        {
          "name": "redact",
          "title": "Redact",
          "type": "`$BOOLEAN`",
          "short": "If true, the response includes redacted_text with every detected entity replaced by its placeholder."
        },
        {
          "name": "results",
          "title": "Results",
          "type": "`$ARRAY`",
          "short": "Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response."
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "score",
          "title": "Score",
          "type": "`$NUMBER`"
        },
        {
          "name": "score_string",
          "title": "Score String",
          "type": "`$STRING`"
        },
        {
          "name": "segments",
          "title": "Segments",
          "type": "`$BOOLEAN`",
          "short": "Also detect the language of each sentence-ish segment for mixed-language text (default false)."
        },
        {
          "name": "sent_scores",
          "title": "Sent Scores",
          "type": "`$BOOLEAN`",
          "short": "Include per-sentence scores (default true)."
        },
        {
          "name": "sentence_scores",
          "title": "Sentence Scores",
          "type": "`$ARRAY`"
        },
        {
          "name": "spans",
          "title": "Spans",
          "type": "`$BOOLEAN`",
          "short": "true = also return the offending passages as spans with offsets and per-passage scores."
        },
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The text to process."
        },
        {
          "name": "texts",
          "title": "Texts",
          "type": "`$ARRAY`",
          "short": "Batch form: 1 to 10 texts, each processed with the same options as a single request."
        },
        {
          "name": "threshold",
          "title": "Threshold",
          "type": "`$NUMBER`",
          "short": "Flagging cut-off on each category score (default 0.5)."
        },
        {
          "name": "toks",
          "title": "Toks",
          "type": "`$ARRAY`"
        },
        {
          "name": "top_k",
          "title": "Top K",
          "type": "`$INTEGER`",
          "short": "Number of top language candidates to return (default 3)."
        },
        {
          "name": "types",
          "title": "Types",
          "type": "`$ARRAY`",
          "short": "Entity types to recognize."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`"
        }
      ],
      "name": "detection",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/aidetect",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "aidetect"
                }
              ],
              "parts": [
                "api",
                "v1",
                "aidetect"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/docx-aidetect",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "docx-aidetect"
                }
              ],
              "parts": [
                "api",
                "v1",
                "docx-aidetect"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.usage`"
              },
              "args": {
                "query": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "body": {
                "fields": [
                  {
                    "binary": true,
                    "name": "file"
                  },
                  {
                    "binary": true,
                    "name": "jsonParams"
                  },
                  {
                    "name": "return_usage"
                  }
                ],
                "kind": "multipart",
                "media": "multipart/form-data"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/langdetect",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "langdetect"
                }
              ],
              "parts": [
                "api",
                "v1",
                "langdetect"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ner",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ner"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ner"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/pdf-aidetect",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "pdf-aidetect"
                }
              ],
              "parts": [
                "api",
                "v1",
                "pdf-aidetect"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "body": {
                "fields": [
                  {
                    "binary": true,
                    "name": "file"
                  },
                  {
                    "binary": true,
                    "name": "jsonParams"
                  },
                  {
                    "name": "return_usage"
                  }
                ],
                "kind": "multipart",
                "media": "multipart/form-data"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/pii",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "pii"
                }
              ],
              "parts": [
                "api",
                "v1",
                "pii"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.usage`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/profanity",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "profanity"
                }
              ],
              "parts": [
                "api",
                "v1",
                "profanity"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/safety",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "safety"
                }
              ],
              "parts": [
                "api",
                "v1",
                "safety"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "dictionary": {
      "fields": [
        {
          "name": "case_sensitive",
          "title": "Case Sensitive",
          "type": "`$BOOLEAN`",
          "short": "Whether matching is case sensitive."
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "RFC 1123 timestamp, e.g."
        },
        {
          "name": "entry",
          "title": "Entry",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          }
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "format": "uuid"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "RFC 1123 timestamp."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "dictionary",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/dictionary",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "dictionary"
                }
              ],
              "parts": [
                "api",
                "v1",
                "dictionary"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/dictionary",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "dictionary"
                }
              ],
              "parts": [
                "api",
                "v1",
                "dictionary"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/v1/dictionary/{entry_id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "dictionary"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "v1",
                "dictionary",
                "{id}"
              ],
              "rename": {
                "param": {
                  "entry_id": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "entry_id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "file": {
      "fields": [
        {
          "name": "chunks",
          "title": "Chunks",
          "type": "`$ARRAY`"
        },
        {
          "name": "html",
          "title": "Html",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "max_length",
          "title": "Max Length",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Maximum chunk length in characters."
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "step_size",
          "title": "Step Size",
          "type": "`$INTEGER`",
          "short": "Characters to advance between chunk starts; 0 means 10% of max_length."
        },
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          }
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        }
      ],
      "name": "file",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ingest/chunk_html",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ingest"
                },
                {
                  "lit": "chunk_html"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ingest",
                "chunk_html"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ingest/chunk_text",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ingest"
                },
                {
                  "lit": "chunk_text"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ingest",
                "chunk_text"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ingest/docx_to_text",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ingest"
                },
                {
                  "lit": "docx_to_text"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ingest",
                "docx_to_text"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "body": {
                "fields": [
                  {
                    "binary": true,
                    "name": "file"
                  },
                  {
                    "binary": true,
                    "name": "jsonParams"
                  },
                  {
                    "name": "return_usage"
                  }
                ],
                "kind": "multipart",
                "media": "multipart/form-data"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ingest/pdf_to_text",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ingest"
                },
                {
                  "lit": "pdf_to_text"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ingest",
                "pdf_to_text"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "return_usage",
                    "orig": "return_usage",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false,
                    "field": true
                  }
                ]
              },
              "select": {},
              "body": {
                "fields": [
                  {
                    "binary": true,
                    "name": "file"
                  },
                  {
                    "binary": true,
                    "name": "jsonParams"
                  },
                  {
                    "name": "return_usage"
                  }
                ],
                "kind": "multipart",
                "media": "multipart/form-data"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "generation": {
      "fields": [
        {
          "name": "characters",
          "title": "Characters",
          "type": "`$INTEGER`"
        },
        {
          "name": "context",
          "title": "Context",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "formality",
          "title": "Formality",
          "type": "`$STRING`",
          "short": "Optional register: \"formal\" (vous/Sie/usted) or \"informal\" (tu/du/tú)."
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "lang",
          "title": "Lang",
          "type": "`$STRING`",
          "short": "ISO 639-1 code used to pick the readability formula for the before/after scores and the billed language."
        },
        {
          "name": "length",
          "title": "Length",
          "type": "`$STRING`",
          "short": "Target summary size: \"short\" (1-2 sentences), \"medium\" (one paragraph, the default) or \"long\" (a few short paragraphs)."
        },
        {
          "name": "mapping",
          "title": "Mapping",
          "type": "`$STRING`",
          "short": "Transformation to apply."
        },
        {
          "name": "num_results",
          "title": "Num Results",
          "type": "`$INTEGER`",
          "short": "Number of alternatives to return (default 5)."
        },
        {
          "name": "preserve_terms",
          "title": "Preserve Terms",
          "type": "`$ARRAY`",
          "short": "Terms the rewrite must keep exactly as written (product names, defined legal terms)."
        },
        {
          "name": "query",
          "title": "Query",
          "type": "`$STRING`",
          "req": true,
          "short": "The partial text to continue, at most 200 characters."
        },
        {
          "name": "reading_level",
          "title": "Reading Level",
          "type": "`$STRING`",
          "short": "Target audience: \"plain\" (plain-language style for a general audience, the default), \"elementary\" (~US grade 3-5), \"middle_school\" (~grade 6-8) or \"high_school\" (~grade 9-10)."
        },
        {
          "name": "results",
          "title": "Results",
          "type": "`$ARRAY`",
          "short": "Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response."
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "session_id",
          "title": "Session Id",
          "type": "`$STRING`",
          "short": "Optional session identifier used to group feedback events."
        },
        {
          "name": "source_lang",
          "title": "Source Lang",
          "type": "`$STRING`",
          "short": "Optional hint for the source language (same forms as target_lang)."
        },
        {
          "name": "target_lang",
          "title": "Target Lang",
          "type": "`$STRING`",
          "req": true,
          "short": "Language to translate into: ISO 639 code (\"fr\", \"zh-TW\") or English name (\"French\")."
        },
        {
          "name": "tense_mapping",
          "title": "Tense Mapping",
          "type": "`$STRING`",
          "short": "Target tense."
        },
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The text to process."
        },
        {
          "name": "texts",
          "title": "Texts",
          "type": "`$ARRAY`",
          "short": "Batch form: 1 to 10 texts, each processed with the same options as a single request."
        },
        {
          "name": "tone_mapping",
          "title": "Tone Mapping",
          "type": "`$STRING`",
          "short": "Target tone."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "short": "Present only when the request sent return_usage: true."
        }
      ],
      "name": "generation",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/complete/{completion_hash}/accept",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "complete"
                },
                {
                  "var": "completion_hash"
                },
                {
                  "lit": "accept"
                }
              ],
              "parts": [
                "api",
                "v1",
                "complete",
                "{completion_hash}",
                "accept"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "completion_hash",
                    "orig": "completion_hash",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "completion_hash"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/complete",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "complete"
                }
              ],
              "parts": [
                "api",
                "v1",
                "complete"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/paraphrase",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "paraphrase"
                }
              ],
              "parts": [
                "api",
                "v1",
                "paraphrase"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/rephrase",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "rephrase"
                }
              ],
              "parts": [
                "api",
                "v1",
                "rephrase"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.usage`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/sentence_split",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "sentence_split"
                }
              ],
              "parts": [
                "api",
                "v1",
                "sentence_split"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/simplify",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "simplify"
                }
              ],
              "parts": [
                "api",
                "v1",
                "simplify"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/summarize",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "summarize"
                }
              ],
              "parts": [
                "api",
                "v1",
                "summarize"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/translate",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "translate"
                }
              ],
              "parts": [
                "api",
                "v1",
                "translate"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "proofreading": {
      "fields": [
        {
          "name": "auto_apply",
          "title": "Auto Apply",
          "type": "`$BOOLEAN`",
          "short": "If true, the response includes applied_text with all edits applied to the input."
        },
        {
          "name": "include_error_categories",
          "title": "Include Error Categories",
          "type": "`$BOOLEAN`",
          "short": "Defaults to true."
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "short": "Sapling API key."
        },
        {
          "name": "lang",
          "title": "Lang",
          "type": "`$STRING`",
          "short": "ISO 639-1 language code of the text (e.g."
        },
        {
          "name": "return_usage",
          "title": "Return Usage",
          "type": "`$BOOLEAN`",
          "short": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…"
        },
        {
          "name": "session_id",
          "title": "Session Id",
          "type": "`$STRING`",
          "short": "Optional session identifier used to group feedback events."
        },
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`",
          "req": true,
          "short": "The text to process."
        },
        {
          "name": "user_id",
          "title": "User Id",
          "type": "`$STRING`",
          "short": "Your identifier for the end user."
        },
        {
          "name": "variety",
          "title": "Variety",
          "type": "`$STRING`",
          "short": "English variety to enforce, e.g."
        }
      ],
      "name": "proofreading",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/edits/{edit_hash}/accept",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "edits"
                },
                {
                  "var": "edit_hash"
                },
                {
                  "lit": "accept"
                }
              ],
              "parts": [
                "api",
                "v1",
                "edits",
                "{edit_hash}",
                "accept"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "edit_hash",
                    "orig": "edit_hash",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "edit_hash"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/edits/{edit_hash}/reject",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "edits"
                },
                {
                  "var": "edit_hash"
                },
                {
                  "lit": "reject"
                }
              ],
              "parts": [
                "api",
                "v1",
                "edits",
                "{edit_hash}",
                "reject"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "edit_hash",
                    "orig": "edit_hash",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "edit_hash"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/edits",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "edits"
                }
              ],
              "parts": [
                "api",
                "v1",
                "edits"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/spellcheck",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "spellcheck"
                }
              ],
              "parts": [
                "api",
                "v1",
                "spellcheck"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "service": {
      "fields": [
        {
          "name": "build",
          "title": "Build",
          "type": "`$STRING`"
        },
        {
          "name": "msg",
          "title": "Msg",
          "type": "`$STRING`"
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$STRING`"
        }
      ],
      "name": "service",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/liveness",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "liveness"
                }
              ],
              "parts": [
                "api",
                "v1",
                "liveness"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/version",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "version"
                }
              ],
              "parts": [
                "api",
                "v1",
                "version"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


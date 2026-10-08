import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "account",
    "accessor": "Account",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/account/status",
    "action": "status",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "api_access": true,
      "credits": {},
      "retry_after": 1,
      "subscription": {},
      "trial": {},
      "usage": {}
    },
    "idField": "id"
  },
  {
    "entity": "account",
    "accessor": "Account",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/account/status",
    "action": "status",
    "args": [],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "api_access": true,
      "credits": {},
      "retry_after": 1,
      "subscription": {},
      "trial": {},
      "usage": {}
    },
    "idField": "id"
  },
  {
    "entity": "analysi",
    "accessor": "Analysi",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/styleguide/rulesets",
    "args": [],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "rulesets": [
        {
          "created_at": "x",
          "name": "x",
          "rules": [
            {
              "description": "x",
              "name": "x"
            }
          ],
          "updated_at": "x"
        }
      ],
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "analysi",
    "accessor": "Analysi",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/styleguide/rulesets",
    "args": [],
    "select": {
      "key": "v1",
      "name": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "name",
      "key"
    ],
    "queryArgs": [
      {
        "name": "key",
        "wire": "key"
      },
      {
        "name": "name",
        "wire": "name"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": {
      "deleted": "x",
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "custom_filter",
    "accessor": "CustomFilter",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/custom_filter",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "case_sensitive": true,
      "created_at": "x",
      "id": "x",
      "input": "x",
      "output": "x",
      "updated_at": "x",
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "custom_filter",
    "accessor": "CustomFilter",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/custom_filter",
    "args": [],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "custom_filters": [
        {
          "case_sensitive": true,
          "created_at": "x",
          "id": "x",
          "input": "x",
          "output": "x",
          "updated_at": "x"
        }
      ],
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "custom_filter",
    "accessor": "CustomFilter",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/custom_filter/{filter_id}",
    "args": [
      {
        "name": "id",
        "wire": "filter_id",
        "value": "p1"
      }
    ],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "custom_mapping",
    "accessor": "CustomMapping",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/custom_mapping",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "case_sensitive": true,
      "created_at": "x",
      "entry": "x",
      "id": "x",
      "mapping": "x",
      "updated_at": "x",
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "custom_mapping",
    "accessor": "CustomMapping",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/custom_mapping",
    "args": [],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "custom_mappings": [
        {
          "case_sensitive": true,
          "created_at": "x",
          "entry": "x",
          "id": "x",
          "mapping": "x",
          "updated_at": "x"
        }
      ],
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "custom_mapping",
    "accessor": "CustomMapping",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/custom_mapping/{mapping_id}",
    "args": [
      {
        "name": "id",
        "wire": "mapping_id",
        "value": "p1"
      }
    ],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "dictionary",
    "accessor": "Dictionary",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/dictionary",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "case_sensitive": true,
      "created_at": "x",
      "entry": "x",
      "id": "x",
      "updated_at": "x",
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "dictionary",
    "accessor": "Dictionary",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/dictionary",
    "args": [],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "case_sensitive": true,
        "created_at": "x",
        "entry": "x",
        "id": "x",
        "updated_at": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "dictionary",
    "accessor": "Dictionary",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/v1/dictionary/{entry_id}",
    "args": [
      {
        "name": "id",
        "wire": "entry_id",
        "value": "p1"
      }
    ],
    "select": {
      "return_usage": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "return_usage"
    ],
    "queryArgs": [
      {
        "name": "return_usage",
        "wire": "return_usage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "generation",
    "accessor": "Generation",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/complete/{completion_hash}/accept",
    "args": [
      {
        "name": "completion_hash",
        "wire": "completion_hash",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 201,
    "sample": {
      "result": "success",
      "usage": {
        "characters": 1
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})

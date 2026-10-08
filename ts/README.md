# SaplingSdk TypeScript SDK



The TypeScript SDK for the SaplingSdk API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Account()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/sapling-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/sapling-sdk
npm install ./sapling-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { SaplingSdkSDK } from '@voxgig-sdk/sapling-sdk'

const client = new SaplingSdkSDK({
  apikey: process.env.SAPLING_SDK_APIKEY,
})
```

### 3. Load an account

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const account = await client.Account().load()
  console.log(account.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Account ENTITY (.data() for the record)
const created = await client.Account().create({
  accepts: 1,
  active_users: {},
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const dictionarys = await client.Dictionary().list()
  console.log(dictionarys.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = SaplingSdkSDK.test()

const dictionarys = await client.Dictionary().list()
// dictionarys is an array of Dictionary entities, one per mock record
console.log(dictionarys.map((dictionary) => dictionary.data()))
```

You can also use the instance method:

```ts
const client = new SaplingSdkSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Dictionary()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new SaplingSdkSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SAPLING_SDK_TEST_LIVE=TRUE
SAPLING_SDK_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### SaplingSdkSDK

#### Constructor

```ts
new SaplingSdkSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Account(data?)` | `AccountEntity` | Create an Account entity instance. |
| `Analysi(data?)` | `AnalysiEntity` | Create an Analysi entity instance. |
| `CustomFilter(data?)` | `CustomFilterEntity` | Create a CustomFilter entity instance. |
| `CustomMapping(data?)` | `CustomMappingEntity` | Create a CustomMapping entity instance. |
| `Detection(data?)` | `DetectionEntity` | Create a Detection entity instance. |
| `Dictionary(data?)` | `DictionaryEntity` | Create a Dictionary entity instance. |
| `File(data?)` | `FileEntity` | Create a File entity instance. |
| `Generation(data?)` | `GenerationEntity` | Create a Generation entity instance. |
| `Proofreading(data?)` | `ProofreadingEntity` | Create a Proofreading entity instance. |
| `Service(data?)` | `ServiceEntity` | Create a Service entity instance. |
| `tester(testopts?, sdkopts?)` | `SaplingSdkSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `SaplingSdkSDK.test(testopts?, sdkopts?)` | `SaplingSdkSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): SaplingSdkSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Account

| Field | Description |
| --- | --- |
| `accepts` |  |
| `active_users` |  |
| `by_api_key` |  |
| `by_endpoint` |  |
| `currency` |  |
| `daily_usage` | Characters per day. |
| `data` |  |
| `edits_accepted` |  |
| `edits_ignored` |  |
| `edits_shown` |  |
| `end_date` |  |
| `end_days_back` | Window end, in days before today. |
| `ignores` |  |
| `interval` |  |
| `key` | Sapling API key. |
| `last_updated` | ISO timestamp, or null. |
| `monthly_usage` | Characters per month. |
| `quota` |  |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `start_date` |  |
| `start_days_back` | Window start, in days before today. |
| `total_characters` |  |
| `total_cost_usd` |  |
| `usage` | Present only when the request sent return_usage: true. |

Operations: create, load.

API path: `/api/v1/account/status`

#### Analysi

| Field | Description |
| --- | --- |
| `categories` | Categories to check. |
| `characters` |  |
| `context` | Optional guidance (max 500 chars): what the texts are and how to decide borderline cases. |
| `created` |  |
| `created_at` | Naive ISO 8601 timestamp (UTC, no offset). |
| `fields` | The fields to extract (1-20): field names (<=50 chars), or {name, type, description (<=200 chars), required} objects. |
| `key` | Sapling API key. |
| `keywords` | Target keyword phrases, most important first (max 10). |
| `labels` | The candidate labels (2-20): label names (<=50 chars), or {name, description (<=200 chars)} objects. |
| `lang` | ISO 639-1 language code of the text (default "en"). |
| `multi_label` | true = several labels may apply at once (labels = those scoring >= threshold). |
| `name` |  |
| `neighbors` | [similarity, term] pairs. |
| `query` |  |
| `results` | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `rubric` | Also return the LLM rubric: overall + clarity/coherence/correctness/concision scores, summary and quoted issues with suggested rewrites (default false). |
| `rules` | The style rules to enforce: 1-20 rules, each a rule name string (at most 80 characters) or a {name, description} object (description at most 400 characters adds nuance the model follows). |
| `ruleset` | The name of a saved ruleset (created via POST /api/v1/styleguide/rulesets) to check against in place of inline rules. |
| `sentence_scores` | Also return a 1-5 score per sentence (default false). |
| `suggestions` | Generate titles/meta descriptions/slug/keywords with the LLM (default true). |
| `synonyms` |  |
| `text` | The text to process. |
| `texts` | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `threshold` | Multi-label cut-off on the per-label score (default 0.5). |
| `updated_at` | Naive ISO 8601 timestamp (UTC, no offset). |
| `usage` | Present only when the request sent return_usage: true. |

Operations: create, list, remove.

API path: `/api/v1/classify`

#### CustomFilter

| Field | Description |
| --- | --- |
| `case_sensitive` | Whether matching is case sensitive. |
| `created_at` | RFC 1123 timestamp, e.g. |
| `id` |  |
| `inp` | Original text of the suggestion. |
| `input` |  |
| `key` | Sapling API key. |
| `out` | Replacement to suppress. |
| `output` |  |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | RFC 1123 timestamp. |
| `usage` | Present only when the request sent return_usage: true. |

Operations: create, list, remove.

API path: `/api/v1/custom_filter`

#### CustomMapping

| Field | Description |
| --- | --- |
| `case_sensitive` | Whether matching is case sensitive. |
| `created_at` | RFC 1123 timestamp, e.g. |
| `description` | Shown to the user with the suggestion; null when none was set. |
| `entry` |  |
| `id` |  |
| `key` | Sapling API key. |
| `mapping` |  |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | RFC 1123 timestamp. |
| `usage` | Present only when the request sent return_usage: true. |

Operations: create, list, remove.

API path: `/api/v1/custom_mapping`

#### Detection

| Field | Description |
| --- | --- |
| `ai_fraction` | Share (0-1) of the text in sentences scoring >= 0.5; reports partially AI-written documents whose overall score stays below 0.5. |
| `characters` |  |
| `key` | Sapling API key. |
| `labels` |  |
| `redact` | If true, the response includes redacted_text with every detected entity replaced by its placeholder. |
| `results` | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `score` |  |
| `score_string` |  |
| `segments` | Also detect the language of each sentence-ish segment for mixed-language text (default false). |
| `sent_scores` | Include per-sentence scores (default true). |
| `sentence_scores` |  |
| `spans` | true = also return the offending passages as spans with offsets and per-passage scores. |
| `text` | The text to process. |
| `texts` | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `threshold` | Flagging cut-off on each category score (default 0.5). |
| `toks` |  |
| `top_k` | Number of top language candidates to return (default 3). |
| `types` | Entity types to recognize. |
| `usage` | Present only when the request sent return_usage: true. |
| `version` |  |

Operations: create.

API path: `/api/v1/aidetect`

#### Dictionary

| Field | Description |
| --- | --- |
| `case_sensitive` | Whether matching is case sensitive. |
| `created_at` | RFC 1123 timestamp, e.g. |
| `entry` |  |
| `id` |  |
| `key` | Sapling API key. |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | RFC 1123 timestamp. |
| `usage` | Present only when the request sent return_usage: true. |

Operations: create, list, remove.

API path: `/api/v1/dictionary`

#### File

| Field | Description |
| --- | --- |
| `chunks` |  |
| `html` |  |
| `key` | Sapling API key. |
| `max_length` | Maximum chunk length in characters. |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `step_size` | Characters to advance between chunk starts; 0 means 10% of max_length. |
| `text` |  |
| `usage` | Present only when the request sent return_usage: true. |

Operations: create.

API path: `/api/v1/ingest/chunk_html`

#### Generation

| Field | Description |
| --- | --- |
| `characters` |  |
| `context` |  |
| `formality` | Optional register: "formal" (vous/Sie/usted) or "informal" (tu/du/tú). |
| `key` | Sapling API key. |
| `lang` | ISO 639-1 code used to pick the readability formula for the before/after scores and the billed language. |
| `length` | Target summary size: "short" (1-2 sentences), "medium" (one paragraph, the default) or "long" (a few short paragraphs). |
| `mapping` | Transformation to apply. |
| `num_results` | Number of alternatives to return (default 5). |
| `preserve_terms` | Terms the rewrite must keep exactly as written (product names, defined legal terms). |
| `query` | The partial text to continue, at most 200 characters. |
| `reading_level` | Target audience: "plain" (plain-language style for a general audience, the default), "elementary" (~US grade 3-5), "middle_school" (~grade 6-8) or "high_school" (~grade 9-10). |
| `results` | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `session_id` | Optional session identifier used to group feedback events. |
| `source_lang` | Optional hint for the source language (same forms as target_lang). |
| `target_lang` | Language to translate into: ISO 639 code ("fr", "zh-TW") or English name ("French"). |
| `tense_mapping` | Target tense. |
| `text` | The text to process. |
| `texts` | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `tone_mapping` | Target tone. |
| `usage` | Present only when the request sent return_usage: true. |

Operations: create.

API path: `/api/v1/complete/{completion_hash}/accept`

#### Proofreading

| Field | Description |
| --- | --- |
| `auto_apply` | If true, the response includes applied_text with all edits applied to the input. |
| `include_error_categories` | Defaults to true. |
| `key` | Sapling API key. |
| `lang` | ISO 639-1 language code of the text (e.g. |
| `return_usage` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `session_id` | Optional session identifier used to group feedback events. |
| `text` | The text to process. |
| `user_id` | Your identifier for the end user. |
| `variety` | English variety to enforce, e.g. |

Operations: create.

API path: `/api/v1/edits/{edit_hash}/accept`

#### Service

| Field | Description |
| --- | --- |
| `build` |  |
| `msg` |  |
| `version` |  |

Operations: load.

API path: `/api/v1/liveness`



## Entities


### Account

Create an instance: `const account = client.Account()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accepts` | `number` |  |
| `active_users` | `Record<string, any>` |  |
| `by_api_key` | `Record<string, any>` |  |
| `by_endpoint` | `Record<string, any>` |  |
| `currency` | `string` |  |
| `daily_usage` | `any` | Characters per day. |
| `data` | `Record<string, any>` |  |
| `edits_accepted` | `number` |  |
| `edits_ignored` | `number` |  |
| `edits_shown` | `number` |  |
| `end_date` | `string` |  |
| `end_days_back` | `number` | Window end, in days before today. |
| `ignores` | `number` |  |
| `interval` | `string` |  |
| `key` | `string` | Sapling API key. |
| `last_updated` | `any` | ISO timestamp, or null. |
| `monthly_usage` | `any` | Characters per month. |
| `quota` | `number` |  |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `start_date` | `string` |  |
| `start_days_back` | `number` | Window start, in days before today. |
| `total_characters` | `number` |  |
| `total_cost_usd` | `number` |  |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |

#### Example: Load

```ts
const account = await client.Account().load()
```

#### Example: Create

```ts
const account = await client.Account().create({
})
```


### Analysi

Create an instance: `const analysi = client.Analysi()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `categories` | `any[]` | Categories to check. |
| `characters` | `number` |  |
| `context` | `string` | Optional guidance (max 500 chars): what the texts are and how to decide borderline cases. |
| `created` | `boolean` |  |
| `created_at` | `string` | Naive ISO 8601 timestamp (UTC, no offset). |
| `fields` | `any[]` | The fields to extract (1-20): field names (<=50 chars), or {name, type, description (<=200 chars), required} objects. |
| `key` | `string` | Sapling API key. |
| `keywords` | `any[]` | Target keyword phrases, most important first (max 10). |
| `labels` | `any[]` | The candidate labels (2-20): label names (<=50 chars), or {name, description (<=200 chars)} objects. |
| `lang` | `string` | ISO 639-1 language code of the text (default "en"). |
| `multi_label` | `boolean` | true = several labels may apply at once (labels = those scoring >= threshold). |
| `name` | `string` |  |
| `neighbors` | `any[]` | [similarity, term] pairs. |
| `query` | `string` |  |
| `results` | `any[]` | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `rubric` | `boolean` | Also return the LLM rubric: overall + clarity/coherence/correctness/concision scores, summary and quoted issues with suggested rewrites (default false). |
| `rules` | `any[]` | The style rules to enforce: 1-20 rules, each a rule name string (at most 80 characters) or a {name, description} object (description at most 400 characters adds nuance the model follows). |
| `ruleset` | `string` | The name of a saved ruleset (created via POST /api/v1/styleguide/rulesets) to check against in place of inline rules. |
| `sentence_scores` | `boolean` | Also return a 1-5 score per sentence (default false). |
| `suggestions` | `boolean` | Generate titles/meta descriptions/slug/keywords with the LLM (default true). |
| `synonyms` | `any[]` |  |
| `text` | `string` | The text to process. |
| `texts` | `any[]` | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `threshold` | `number` | Multi-label cut-off on the per-label score (default 0.5). |
| `updated_at` | `string` | Naive ISO 8601 timestamp (UTC, no offset). |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |

#### Example: List

```ts
const analysis = await client.Analysi().list()
```

#### Example: Create

```ts
const analysi = await client.Analysi().create({
  fields: [],
  labels: [],
  name: 'example_name',
  query: 'example_query',
})
```


### CustomFilter

Create an instance: `const custom_filter = client.CustomFilter()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `case_sensitive` | `boolean` | Whether matching is case sensitive. |
| `created_at` | `string` | RFC 1123 timestamp, e.g. |
| `id` | `string` |  |
| `inp` | `string` | Original text of the suggestion. |
| `input` | `string` |  |
| `key` | `string` | Sapling API key. |
| `out` | `string` | Replacement to suppress. |
| `output` | `string` |  |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | `string` | RFC 1123 timestamp. |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |

#### Example: List

```ts
const custom_filters = await client.CustomFilter().list()
```

#### Example: Create

```ts
const custom_filter = await client.CustomFilter().create({
})
```


### CustomMapping

Create an instance: `const custom_mapping = client.CustomMapping()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `case_sensitive` | `boolean` | Whether matching is case sensitive. |
| `created_at` | `string` | RFC 1123 timestamp, e.g. |
| `description` | `string` | Shown to the user with the suggestion; null when none was set. |
| `entry` | `string` |  |
| `id` | `string` |  |
| `key` | `string` | Sapling API key. |
| `mapping` | `string` |  |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | `string` | RFC 1123 timestamp. |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |

#### Example: List

```ts
const custom_mappings = await client.CustomMapping().list()
```

#### Example: Create

```ts
const custom_mapping = await client.CustomMapping().create({
})
```


### Detection

Create an instance: `const detection = client.Detection()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ai_fraction` | `number` | Share (0-1) of the text in sentences scoring >= 0.5; reports partially AI-written documents whose overall score stays below 0.5. |
| `characters` | `number` |  |
| `key` | `string` | Sapling API key. |
| `labels` | `any[]` |  |
| `redact` | `boolean` | If true, the response includes redacted_text with every detected entity replaced by its placeholder. |
| `results` | `any[]` | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `score` | `number` |  |
| `score_string` | `string` |  |
| `segments` | `boolean` | Also detect the language of each sentence-ish segment for mixed-language text (default false). |
| `sent_scores` | `boolean` | Include per-sentence scores (default true). |
| `sentence_scores` | `any[]` |  |
| `spans` | `boolean` | true = also return the offending passages as spans with offsets and per-passage scores. |
| `text` | `string` | The text to process. |
| `texts` | `any[]` | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `threshold` | `number` | Flagging cut-off on each category score (default 0.5). |
| `toks` | `any[]` |  |
| `top_k` | `number` | Number of top language candidates to return (default 3). |
| `types` | `any[]` | Entity types to recognize. |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |
| `version` | `string` |  |

#### Example: Create

```ts
const detection = await client.Detection().create({
})
```


### Dictionary

Create an instance: `const dictionary = client.Dictionary()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `case_sensitive` | `boolean` | Whether matching is case sensitive. |
| `created_at` | `string` | RFC 1123 timestamp, e.g. |
| `entry` | `string` |  |
| `id` | `string` |  |
| `key` | `string` | Sapling API key. |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | `string` | RFC 1123 timestamp. |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |

#### Example: List

```ts
const dictionarys = await client.Dictionary().list()
```

#### Example: Create

```ts
const dictionary = await client.Dictionary().create({
})
```


### File

Create an instance: `const file = client.File()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chunks` | `any[]` |  |
| `html` | `string` |  |
| `key` | `string` | Sapling API key. |
| `max_length` | `number` | Maximum chunk length in characters. |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `step_size` | `number` | Characters to advance between chunk starts; 0 means 10% of max_length. |
| `text` | `string` |  |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |

#### Example: Create

```ts
const file = await client.File().create({
  html: 'example_html',
  max_length: 1,
  text: 'example_text',
})
```


### Generation

Create an instance: `const generation = client.Generation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `number` |  |
| `context` | `Record<string, any>` |  |
| `formality` | `string` | Optional register: "formal" (vous/Sie/usted) or "informal" (tu/du/tú). |
| `key` | `string` | Sapling API key. |
| `lang` | `string` | ISO 639-1 code used to pick the readability formula for the before/after scores and the billed language. |
| `length` | `string` | Target summary size: "short" (1-2 sentences), "medium" (one paragraph, the default) or "long" (a few short paragraphs). |
| `mapping` | `string` | Transformation to apply. |
| `num_results` | `number` | Number of alternatives to return (default 5). |
| `preserve_terms` | `any[]` | Terms the rewrite must keep exactly as written (product names, defined legal terms). |
| `query` | `string` | The partial text to continue, at most 200 characters. |
| `reading_level` | `string` | Target audience: "plain" (plain-language style for a general audience, the default), "elementary" (~US grade 3-5), "middle_school" (~grade 6-8) or "high_school" (~grade 9-10). |
| `results` | `any[]` | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `session_id` | `string` | Optional session identifier used to group feedback events. |
| `source_lang` | `string` | Optional hint for the source language (same forms as target_lang). |
| `target_lang` | `string` | Language to translate into: ISO 639 code ("fr", "zh-TW") or English name ("French"). |
| `tense_mapping` | `string` | Target tense. |
| `text` | `string` | The text to process. |
| `texts` | `any[]` | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `tone_mapping` | `string` | Target tone. |
| `usage` | `Record<string, any>` | Present only when the request sent return_usage: true. |

#### Example: Create

```ts
const generation = await client.Generation().create({
  context: {},
  query: 'example_query',
  target_lang: 'example_target_lang',
  text: 'example_text',
})
```


### Proofreading

Create an instance: `const proofreading = client.Proofreading()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auto_apply` | `boolean` | If true, the response includes applied_text with all edits applied to the input. |
| `include_error_categories` | `boolean` | Defaults to true. |
| `key` | `string` | Sapling API key. |
| `lang` | `string` | ISO 639-1 language code of the text (e.g. |
| `return_usage` | `boolean` | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `session_id` | `string` | Optional session identifier used to group feedback events. |
| `text` | `string` | The text to process. |
| `user_id` | `string` | Your identifier for the end user. |
| `variety` | `string` | English variety to enforce, e.g. |

#### Example: Create

```ts
const proofreading = await client.Proofreading().create({
  text: 'example_text',
})
```


### Service

Create an instance: `const service = client.Service()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `build` | `string` |  |
| `msg` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const service = await client.Service().load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
sapling-sdk/
├── src/
│   ├── SaplingSdkSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { SaplingSdkSDK } from '@voxgig-sdk/sapling-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const dictionary = client.Dictionary()
await dictionary.list()

// dictionary.data() now returns the dictionary data from the last `list`
// dictionary.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

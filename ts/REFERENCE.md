# SaplingSdk TypeScript SDK Reference

Complete API reference for the SaplingSdk TypeScript SDK.


## SaplingSdkSDK

### Constructor

```ts
new SaplingSdkSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SaplingSdkSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = SaplingSdkSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `SaplingSdkSDK` instance in test mode.


### Instance Methods

#### `Account(data?: object)`

Create a new `Account` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountEntity` instance.

#### `Analysi(data?: object)`

Create a new `Analysi` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AnalysiEntity` instance.

#### `CustomFilter(data?: object)`

Create a new `CustomFilter` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CustomFilterEntity` instance.

#### `CustomMapping(data?: object)`

Create a new `CustomMapping` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CustomMappingEntity` instance.

#### `Detection(data?: object)`

Create a new `Detection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DetectionEntity` instance.

#### `Dictionary(data?: object)`

Create a new `Dictionary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DictionaryEntity` instance.

#### `File(data?: object)`

Create a new `File` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FileEntity` instance.

#### `Generation(data?: object)`

Create a new `Generation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GenerationEntity` instance.

#### `Proofreading(data?: object)`

Create a new `Proofreading` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProofreadingEntity` instance.

#### `Service(data?: object)`

Create a new `Service` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ServiceEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `SaplingSdkSDK.test()`.

**Returns:** `SaplingSdkSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AccountEntity

```ts
const account = client.Account()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accepts` | `number` | No |  |
| `active_users` | `Record<string, any>` | No |  |
| `by_api_key` | `Record<string, any>` | No |  |
| `by_endpoint` | `Record<string, any>` | No |  |
| `currency` | `string` | No |  |
| `daily_usage` | `any` | No | Characters per day. |
| `data` | `Record<string, any>` | No |  |
| `edits_accepted` | `number` | No |  |
| `edits_ignored` | `number` | No |  |
| `edits_shown` | `number` | No |  |
| `end_date` | `string` | No |  |
| `end_days_back` | `number` | No | Window end, in days before today. |
| `ignores` | `number` | No |  |
| `interval` | `string` | No |  |
| `key` | `string` | No | Sapling API key. |
| `last_updated` | `any` | No | ISO timestamp, or null. |
| `monthly_usage` | `any` | No | Characters per month. |
| `quota` | `number` | No |  |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `start_date` | `string` | No |  |
| `start_days_back` | `number` | No | Window start, in days before today. |
| `total_characters` | `number` | No |  |
| `total_cost_usd` | `number` | No |  |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `status` | `/api/v1/account/status` | `client.Account().create({ $action: 'status', ... })` |
| `status` | `/api/v1/account/status` | `client.Account().load({ $action: 'status', ... })` |

An action returns that action's OWN response, which is not necessarily a
Account record — check the API definition for its shape.

```ts
const result = await client.Account().create({
  $action: 'status',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Account().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Account().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AnalysiEntity

```ts
const analysi = client.Analysi()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `categories` | `any[]` | No | Categories to check. |
| `characters` | `number` | No |  |
| `context` | `string` | No | Optional guidance (max 500 chars): what the texts are and how to decide borderline cases. |
| `created` | `boolean` | No |  |
| `created_at` | `string` | No | Naive ISO 8601 timestamp (UTC, no offset). |
| `fields` | `any[]` | Yes | The fields to extract (1-20): field names (<=50 chars), or {name, type, description (<=200 chars), required} objects. |
| `key` | `string` | No | Sapling API key. |
| `keywords` | `any[]` | No | Target keyword phrases, most important first (max 10). |
| `labels` | `any[]` | Yes | The candidate labels (2-20): label names (<=50 chars), or {name, description (<=200 chars)} objects. |
| `lang` | `string` | No | ISO 639-1 language code of the text (default "en"). |
| `multi_label` | `boolean` | No | true = several labels may apply at once (labels = those scoring >= threshold). |
| `name` | `string` | Yes |  |
| `neighbors` | `any[]` | No | [similarity, term] pairs. |
| `query` | `string` | Yes |  |
| `results` | `any[]` | No | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `rubric` | `boolean` | No | Also return the LLM rubric: overall + clarity/coherence/correctness/concision scores, summary and quoted issues with suggested rewrites (default false). |
| `rules` | `any[]` | No | The style rules to enforce: 1-20 rules, each a rule name string (at most 80 characters) or a {name, description} object (description at most 400 characters adds nuance the model follows). |
| `ruleset` | `string` | No | The name of a saved ruleset (created via POST /api/v1/styleguide/rulesets) to check against in place of inline rules. |
| `sentence_scores` | `boolean` | No | Also return a 1-5 score per sentence (default false). |
| `suggestions` | `boolean` | No | Generate titles/meta descriptions/slug/keywords with the LLM (default true). |
| `synonyms` | `any[]` | No |  |
| `text` | `string` | No | The text to process. |
| `texts` | `any[]` | No | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `threshold` | `number` | No | Multi-label cut-off on the per-label score (default 0.5). |
| `updated_at` | `string` | No | Naive ISO 8601 timestamp (UTC, no offset). |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `categories` | - | - | - |
| `characters` | - | - | - |
| `context` | - | - | - |
| `created` | - | - | - |
| `created_at` | - | - | - |
| `fields` | - | - | - |
| `key` | - | - | - |
| `keywords` | - | - | - |
| `labels` | - | - | - |
| `lang` | - | - | - |
| `multi_label` | - | - | - |
| `name` | Yes | - | - |
| `neighbors` | - | - | - |
| `query` | - | - | - |
| `results` | - | - | - |
| `return_usage` | - | - | - |
| `rubric` | - | - | - |
| `rules` | - | Yes | - |
| `ruleset` | - | - | - |
| `sentence_scores` | - | - | - |
| `suggestions` | - | - | - |
| `synonyms` | - | - | - |
| `text` | - | Yes | - |
| `texts` | - | - | - |
| `threshold` | - | - | - |
| `updated_at` | - | - | - |
| `usage` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Analysi().create({
  fields: [],
  labels: [],
  name: 'example_name',
  query: 'example_query',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Analysi().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Analysi().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AnalysiEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CustomFilterEntity

```ts
const custom_filter = client.CustomFilter()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `case_sensitive` | `boolean` | No | Whether matching is case sensitive. |
| `created_at` | `string` | No | RFC 1123 timestamp, e.g. |
| `id` | `string` | No |  |
| `inp` | `string` | No | Original text of the suggestion. |
| `input` | `string` | No |  |
| `key` | `string` | No | Sapling API key. |
| `out` | `string` | No | Replacement to suppress. |
| `output` | `string` | No |  |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | `string` | No | RFC 1123 timestamp. |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CustomFilter().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CustomFilter().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CustomFilter().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CustomFilterEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CustomMappingEntity

```ts
const custom_mapping = client.CustomMapping()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `case_sensitive` | `boolean` | No | Whether matching is case sensitive. |
| `created_at` | `string` | No | RFC 1123 timestamp, e.g. |
| `description` | `string` | No | Shown to the user with the suggestion; null when none was set. |
| `entry` | `string` | No |  |
| `id` | `string` | No |  |
| `key` | `string` | No | Sapling API key. |
| `mapping` | `string` | No |  |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | `string` | No | RFC 1123 timestamp. |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `case_sensitive` | - | - | - |
| `created_at` | - | - | - |
| `description` | - | - | - |
| `entry` | - | Yes | - |
| `id` | - | - | - |
| `key` | - | - | - |
| `mapping` | - | Yes | - |
| `return_usage` | - | - | - |
| `updated_at` | - | - | - |
| `usage` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CustomMapping().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.CustomMapping().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.CustomMapping().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CustomMappingEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DetectionEntity

```ts
const detection = client.Detection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ai_fraction` | `number` | No | Share (0-1) of the text in sentences scoring >= 0.5; reports partially AI-written documents whose overall score stays below 0.5. |
| `characters` | `number` | No |  |
| `key` | `string` | No | Sapling API key. |
| `labels` | `any[]` | No |  |
| `redact` | `boolean` | No | If true, the response includes redacted_text with every detected entity replaced by its placeholder. |
| `results` | `any[]` | No | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `score` | `number` | No |  |
| `score_string` | `string` | No |  |
| `segments` | `boolean` | No | Also detect the language of each sentence-ish segment for mixed-language text (default false). |
| `sent_scores` | `boolean` | No | Include per-sentence scores (default true). |
| `sentence_scores` | `any[]` | No |  |
| `spans` | `boolean` | No | true = also return the offending passages as spans with offsets and per-passage scores. |
| `text` | `string` | No | The text to process. |
| `texts` | `any[]` | No | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `threshold` | `number` | No | Flagging cut-off on each category score (default 0.5). |
| `toks` | `any[]` | No |  |
| `top_k` | `number` | No | Number of top language candidates to return (default 3). |
| `types` | `any[]` | No | Entity types to recognize. |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |
| `version` | `string` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ai_fraction` | - |
| `characters` | - |
| `key` | - |
| `labels` | - |
| `redact` | - |
| `results` | - |
| `return_usage` | - |
| `score` | - |
| `score_string` | - |
| `segments` | - |
| `sent_scores` | - |
| `sentence_scores` | - |
| `spans` | - |
| `text` | Yes |
| `texts` | - |
| `threshold` | - |
| `toks` | - |
| `top_k` | - |
| `types` | - |
| `usage` | - |
| `version` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Detection().create({
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DetectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DictionaryEntity

```ts
const dictionary = client.Dictionary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `case_sensitive` | `boolean` | No | Whether matching is case sensitive. |
| `created_at` | `string` | No | RFC 1123 timestamp, e.g. |
| `entry` | `string` | No |  |
| `id` | `string` | No |  |
| `key` | `string` | No | Sapling API key. |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `updated_at` | `string` | No | RFC 1123 timestamp. |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `case_sensitive` | - | - | - |
| `created_at` | - | - | - |
| `entry` | - | Yes | - |
| `id` | - | - | - |
| `key` | - | - | - |
| `return_usage` | - | - | - |
| `updated_at` | - | - | - |
| `usage` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Dictionary().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Dictionary().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Dictionary().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DictionaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FileEntity

```ts
const file = client.File()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chunks` | `any[]` | No |  |
| `html` | `string` | Yes |  |
| `key` | `string` | No | Sapling API key. |
| `max_length` | `number` | Yes | Maximum chunk length in characters. |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `step_size` | `number` | No | Characters to advance between chunk starts; 0 means 10% of max_length. |
| `text` | `string` | Yes |  |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `chunks` | - |
| `html` | - |
| `key` | - |
| `max_length` | - |
| `return_usage` | - |
| `step_size` | - |
| `text` | Yes |
| `usage` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.File().create({
  html: 'example_html',
  max_length: 1,
  text: 'example_text',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FileEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GenerationEntity

```ts
const generation = client.Generation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `number` | No |  |
| `context` | `Record<string, any>` | Yes |  |
| `formality` | `string` | No | Optional register: "formal" (vous/Sie/usted) or "informal" (tu/du/tú). |
| `key` | `string` | No | Sapling API key. |
| `lang` | `string` | No | ISO 639-1 code used to pick the readability formula for the before/after scores and the billed language. |
| `length` | `string` | No | Target summary size: "short" (1-2 sentences), "medium" (one paragraph, the default) or "long" (a few short paragraphs). |
| `mapping` | `string` | No | Transformation to apply. |
| `num_results` | `number` | No | Number of alternatives to return (default 5). |
| `preserve_terms` | `any[]` | No | Terms the rewrite must keep exactly as written (product names, defined legal terms). |
| `query` | `string` | Yes | The partial text to continue, at most 200 characters. |
| `reading_level` | `string` | No | Target audience: "plain" (plain-language style for a general audience, the default), "elementary" (~US grade 3-5), "middle_school" (~grade 6-8) or "high_school" (~grade 9-10). |
| `results` | `any[]` | No | Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response. |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `session_id` | `string` | No | Optional session identifier used to group feedback events. |
| `source_lang` | `string` | No | Optional hint for the source language (same forms as target_lang). |
| `target_lang` | `string` | Yes | Language to translate into: ISO 639 code ("fr", "zh-TW") or English name ("French"). |
| `tense_mapping` | `string` | No | Target tense. |
| `text` | `string` | Yes | The text to process. |
| `texts` | `any[]` | No | Batch form: 1 to 10 texts, each processed with the same options as a single request. |
| `tone_mapping` | `string` | No | Target tone. |
| `usage` | `Record<string, any>` | No | Present only when the request sent return_usage: true. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `characters` | - |
| `context` | - |
| `formality` | - |
| `key` | - |
| `lang` | - |
| `length` | - |
| `mapping` | - |
| `num_results` | - |
| `preserve_terms` | - |
| `query` | - |
| `reading_level` | - |
| `results` | - |
| `return_usage` | - |
| `session_id` | - |
| `source_lang` | - |
| `target_lang` | - |
| `tense_mapping` | - |
| `text` | Yes |
| `texts` | - |
| `tone_mapping` | - |
| `usage` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Generation().create({
  context: {},
  query: 'example_query',
  target_lang: 'example_target_lang',
  text: 'example_text',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GenerationEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProofreadingEntity

```ts
const proofreading = client.Proofreading()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auto_apply` | `boolean` | No | If true, the response includes applied_text with all edits applied to the input. |
| `include_error_categories` | `boolean` | No | Defaults to true. |
| `key` | `string` | No | Sapling API key. |
| `lang` | `string` | No | ISO 639-1 language code of the text (e.g. |
| `return_usage` | `boolean` | No | When true, a successful JSON-object response additionally carries "usage": {"characters": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ… |
| `session_id` | `string` | No | Optional session identifier used to group feedback events. |
| `text` | `string` | Yes | The text to process. |
| `user_id` | `string` | No | Your identifier for the end user. |
| `variety` | `string` | No | English variety to enforce, e.g. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Proofreading().create({
  text: 'example_text',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProofreadingEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ServiceEntity

```ts
const service = client.Service()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `build` | `string` | No |  |
| `msg` | `string` | No |  |
| `version` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Service().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ServiceEntity` instance with the same client and
options.

#### `client()`

Return the parent `SaplingSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new SaplingSdkSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.


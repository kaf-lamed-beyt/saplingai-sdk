# Sapling AI API

> Language AI endpoints for grammar checking, AI-content detection, rewriting, moderation, and text analysis.
>
> ## Authentication
>
> Every endpoint except the `service` health probes requires a Sapling API key, sent either as an `Authorization: Bearer &lt;key&gt;` header or as a `key` field in the JSON request body (GET/DELETE operations and file uploads take a `key` query parameter instead). When both are sent, the body or query `key` takes precedence. Create keys at https://sapling.ai/api_settings.
>
> Agents that cannot ask a user for an API key can instead obtain an OAuth access token (authorization code + PKCE S256, scope `sapling:api`) from the authorization server described by the `oauth2` security scheme, and send it as the `Authorization: Bearer` header. Such a token acts on the API key the user picks at consent and is accepted only on the language-tool operations that advertise OAuth security. Other authenticated operations require an API key. Discovery metadata: `/.well-known/oauth-protected-resource` (RFC 9728) and `/.well-known/oauth-authorization-server` (RFC 8414).
>
> ## Usage reporting
>
> Every API-key operation accepts an optional `return_usage: true` request field (or `?return_usage=true` for GET/DELETE and file uploads). When set, a successful JSON-object response additionally carries `&quot;usage&quot;: &#123;&quot;characters&quot;: &lt;n&gt;&#125;` , the billable character count the request submitted (0 when nothing was billed; the 2.5x logographic-language adjustment is included, and the number is an upper bound on the final charge, since repeat texts inside the billing deduplication window are counted but not re-charged). Existing `usage` fields, including the account/status summary and completion token usage, are preserved.
>
> ## Batch requests
>
> Operations whose request schema lists a `texts` property also accept a batch of 1 to 10 texts in one request: send exactly one of `text` or `texts`, and the response is `&#123;&quot;results&quot;: [...]&#125;`, one single-text response per input text in input order.
>
> ## Rate limiting
>
> Token-bucket rate-limited operations (those whose responses declare the headers below) carry `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers describing the caller&#39;s token bucket, unless the API key itself is configured as unthrottled, in which case no rate-limit headers are emitted. (A deployment that disables API burst limits emits none of them and no bucket 429s; the document it serves reflects that.) `X-RateLimit-Reset` is the number of SECONDS until the bucket is full again, not an epoch timestamp. 429 responses additionally carry `Retry-After` (seconds) and a numeric `retry_after` body field; when `retry_after` is absent from a 429 body, the request can never succeed at its current size, so do not retry it unchanged.
>
> ## Errors
>
> Errors are JSON objects with a human-readable `msg` field and an appropriate HTTP status, including request-validation 400s, auth 401s, unknown paths (404), wrong methods (405), and unexpected 500s. Some operations use an `error` field or `message`/`result` keys instead of `msg` (including the 4MB 413 and invalid feedback IDs), and `/api/v1/edits` can answer a transient tokenizer outage with an empty JSON array and status 400. Treat the status code as authoritative and see each operation&#39;s response schemas for the exact shapes. 5xx/503 responses may carry `Retry-After`; honor it before retrying.
>
> The language operations are generated from the same registry that backs the hosted MCP server (https://mcp.sapling.ai), so tool names and their operationIds match. OAuth access tokens issued for that server work only on those operations; every other operation needs an API key. Full response schemas and guides: https://sapling.ai/docs/api

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 54 HTTP routes. There are 1 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Account

Results: Access verdict plus credit, subscription, usage and trial details.; &#123;&quot;data&quot;: &#123;endpoint: &#123;bucket: characters&#125;&#125;, &quot;`last_updated`&quot;&#125;.; Quota summary.; Usage report.; Activity summary.

SDK operations: `create`, `load`.

Key fields to recognise:

- `daily_usage`: Characters per day.
- `end_days_back`: Window end, in days before today.
- `key`: Sapling API key.
- `last_updated`: ISO timestamp, or null.
- `monthly_usage`: Characters per month.

### Analysi

Results: Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/classify/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/extract/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/inclusive/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/quality/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/sentiment/ A bare JSON array (no per-sentence results) is the degraded shape served when sentence tokenization fails upstream.; The text contained no scoreable sentences (empty or markup-only input). Empty body.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/seo/; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/statistics/; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/styleguide/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; The saved rule set, and whether it was newly created.; Neighbors as [similarity, term] pairs, plus synonyms.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/tone/ A bare JSON array (no per-sentence results) is the degraded shape served when sentence tokenization fails upstream.; Saved rule sets, ordered by name.; Deleted.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `categories`: Categories to check.
- `context`: Optional guidance (max 500 chars): what the texts are and how to decide borderline cases.
- `created_at`: Naive ISO 8601 timestamp (UTC, no offset).
- `fields`: The fields to extract (1-20): field names (&lt;=50 chars), or &#123;name, type, description (&lt;=200 chars), required&#125; objects.
- `key`: Sapling API key.

### CustomFilter

Results: The created filter.; Custom filters.; Deleted. Empty body.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `case_sensitive`: Whether matching is case sensitive.
- `created_at`: RFC 1123 timestamp, for example &quot;Wed, 07 Oct 2020 21:15:47 GMT&quot;.
- `inp`: Original text of the suggestion.
- `key`: Sapling API key.
- `out`: Replacement to suppress.

### CustomMapping

Results: The created mapping.; Custom mappings.; Deleted. Empty body.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `case_sensitive`: Whether matching is case sensitive.
- `created_at`: RFC 1123 timestamp, for example &quot;Wed, 07 Oct 2020 21:15:47 GMT&quot;.
- `description`: Shown to the user with the suggestion; null when none was set.
- `key`: Sapling API key.
- `return_usage`: When true, a successful JSON-object response additionally carries &quot;usage&quot;: &#123;&quot;characters&quot;: &lt;n&gt;&#125;, the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…

### Detection

Results: Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/detector/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Same shape as /api/v1/aidetect with `sent_scores` and `score_string` enabled.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/langdetect/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/ner/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/pii/; Tokens and aligned labels.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/safety/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.

SDK operations: `create`.

Key fields to recognise:

- `ai_fraction`: Share (0-1) of the text in sentences scoring &gt;= 0.5; reports partially AI-written documents whose overall score stays below 0.5.
- `key`: Sapling API key.
- `redact`: If true, the response includes `redacted_text` with every detected entity replaced by its placeholder.
- `results`: Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response.
- `return_usage`: When true, a successful JSON-object response additionally carries &quot;usage&quot;: &#123;&quot;characters&quot;: &lt;n&gt;&#125;, the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…

### Dictionary

Results: The created entry.; Dictionary entries.; Deleted. Empty body.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `case_sensitive`: Whether matching is case sensitive.
- `created_at`: RFC 1123 timestamp, for example &quot;Wed, 07 Oct 2020 21:15:47 GMT&quot;.
- `key`: Sapling API key.
- `return_usage`: When true, a successful JSON-object response additionally carries &quot;usage&quot;: &#123;&quot;characters&quot;: &lt;n&gt;&#125;, the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…
- `updated_at`: RFC 1123 timestamp.

### File

Results: Chunks in document order.; Extracted text.

SDK operations: `create`.

Key fields to recognise:

- `key`: Sapling API key.
- `max_length`: Maximum chunk length in characters.
- `return_usage`: When true, a successful JSON-object response additionally carries &quot;usage&quot;: &#123;&quot;characters&quot;: &lt;n&gt;&#125;, the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…
- `step_size`: Characters to advance between chunk starts; 0 means 10% of `max_length`.
- `usage`: Present only when the request sent `return_usage`: true. characters is the billable character count the request submitted; see the `return_usage` request field for the exact semantics.

### Generation

Results: Recorded.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/autocomplete/ An empty JSON array is returned when no completion is available (prediction failed or was shorter than the minimum length).; Alternatives: &#123;&quot;results&quot;: [&#123;hash, original, replacement, `rephrase_type`, `model_version`&#125;]&#125;.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/rephrase/; Alternatives: &#123;&quot;results&quot;: [&#123;hash, original, replacement, `rephrase_type`, `model_version`&#125;]&#125;. Empty when no split improves the text.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/simplify/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/summarize/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/translate/ A batch (`texts`) request answers &#123;&quot;results&quot;: [...]&#125; instead: one single-text response per input text, in input order.

SDK operations: `create`.

Key fields to recognise:

- `formality`: Optional register: &quot;formal&quot; (vous/Sie/usted) or &quot;informal&quot; (tu/du/tú).
- `key`: Sapling API key.
- `lang`: ISO 639-1 code used to pick the readability formula for the before/after scores and the billed language.
- `length`: Target summary size: &quot;short&quot; (1-2 sentences), &quot;medium&quot; (one paragraph, the default) or &quot;long&quot; (a few short paragraphs).
- `mapping`: Transformation to apply.

### Proofreading

Results: Acknowledged.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/edits-overview/ With noformat=true (the SDK response shape) the body is a bare array of edit objects instead. A partial result (some corrections may be missing) adds a `degraded` object; retry for a complete result.; Successful response. Field-level schemas and examples: https://sapling.ai/docs/api/spellcheck/ With noformat=true (the SDK response shape) the body is a bare array of edit objects instead. A partial result (some corrections may be missing) adds a `degraded` object; retry for a complete result.

SDK operations: `create`.

Key fields to recognise:

- `auto_apply`: If true, the response includes `applied_text` with all edits applied to the input.
- `include_error_categories`: Defaults to true.
- `key`: Sapling API key.
- `lang`: ISO 639-1 language code of the text (for example
- `return_usage`: When true, a successful JSON-object response additionally carries &quot;usage&quot;: &#123;&quot;characters&quot;: &lt;n&gt;&#125;, the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…

### Service

Results: Alive.; Version.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Account | `create` | `POST /api/v1/account/status` | Not required |
| Account | `create` | `POST /api/v1/reporting/api_endpoint_usage` | Not required |
| Account | `create` | `POST /api/v1/reporting/api_quota_usage` | Not required |
| Account | `create` | `POST /api/v1/reporting/api_usage` | Not required |
| Account | `create` | `POST /api/v1/reporting/api_user_activity` | Not required |
| Account | `load` | `GET /api/v1/account/status` | Required |
| Analysi | `create` | `POST /api/v1/classify` | Not required |
| Analysi | `create` | `POST /api/v1/extract` | Not required |
| Analysi | `create` | `POST /api/v1/inclusive` | Not required |
| Analysi | `create` | `POST /api/v1/quality` | Not required |
| Analysi | `create` | `POST /api/v1/sentiment` | Not required |
| Analysi | `create` | `POST /api/v1/seo` | Not required |
| Analysi | `create` | `POST /api/v1/statistics` | Not required |
| Analysi | `create` | `POST /api/v1/styleguide` | Not required |
| Analysi | `create` | `POST /api/v1/styleguide/rulesets` | Not required |
| Analysi | `create` | `POST /api/v1/thesaurus` | Not required |
| Analysi | `create` | `POST /api/v1/tone` | Not required |
| Analysi | `list` | `GET /api/v1/styleguide/rulesets` | Required |
| Analysi | `remove` | `DELETE /api/v1/styleguide/rulesets` | Not required |
| CustomFilter | `create` | `POST /api/v1/custom_filter` | Not required |
| CustomFilter | `list` | `GET /api/v1/custom_filter` | Required |
| CustomFilter | `remove` | `DELETE /api/v1/custom_filter/{filter_id}` | Required |
| CustomMapping | `create` | `POST /api/v1/custom_mapping` | Not required |
| CustomMapping | `list` | `GET /api/v1/custom_mapping` | Required |
| CustomMapping | `remove` | `DELETE /api/v1/custom_mapping/{mapping_id}` | Required |
| Detection | `create` | `POST /api/v1/aidetect` | Not required |
| Detection | `create` | `POST /api/v1/docx-aidetect` | Not required |
| Detection | `create` | `POST /api/v1/langdetect` | Not required |
| Detection | `create` | `POST /api/v1/ner` | Not required |
| Detection | `create` | `POST /api/v1/pdf-aidetect` | Not required |
| Detection | `create` | `POST /api/v1/pii` | Not required |
| Detection | `create` | `POST /api/v1/profanity` | Not required |
| Detection | `create` | `POST /api/v1/safety` | Not required |
| Dictionary | `create` | `POST /api/v1/dictionary` | Not required |
| Dictionary | `list` | `GET /api/v1/dictionary` | Required |
| Dictionary | `remove` | `DELETE /api/v1/dictionary/{entry_id}` | Required |
| File | `create` | `POST /api/v1/ingest/chunk_html` | Not required |
| File | `create` | `POST /api/v1/ingest/chunk_text` | Not required |
| File | `create` | `POST /api/v1/ingest/docx_to_text` | Not required |
| File | `create` | `POST /api/v1/ingest/pdf_to_text` | Not required |
| Generation | `create` | `POST /api/v1/complete/{completion_hash}/accept` | Not required |
| Generation | `create` | `POST /api/v1/complete` | Not required |
| Generation | `create` | `POST /api/v1/paraphrase` | Not required |
| Generation | `create` | `POST /api/v1/rephrase` | Not required |
| Generation | `create` | `POST /api/v1/sentence_split` | Not required |
| Generation | `create` | `POST /api/v1/simplify` | Not required |
| Generation | `create` | `POST /api/v1/summarize` | Not required |
| Generation | `create` | `POST /api/v1/translate` | Not required |
| Proofreading | `create` | `POST /api/v1/edits/{edit_hash}/accept` | Not required |
| Proofreading | `create` | `POST /api/v1/edits/{edit_hash}/reject` | Not required |
| Proofreading | `create` | `POST /api/v1/edits` | Not required |
| Proofreading | `create` | `POST /api/v1/spellcheck` | Not required |
| Service | `load` | `GET /api/v1/liveness` | Not required |
| Service | `load` | `GET /api/v1/version` | Not required |

## Connect to the API

- The deployment serving this document: `https://api.sapling.ai`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Sapling API key passed as the `key` query parameter, an alternative to the Authorization bearer header.

Sapling API key. Language-tool operations also accept an OAuth access token from the Sapling authorization server, see the oauth2 scheme. The key may instead be sent as a `key` field in the JSON body, which takes precedence when both are present.

OAuth 2.1 authorization code flow with PKCE (S256). Clients may register dynamically (RFC 7591) at https://api.sapling.ai/oauth/register; server metadata is at https://api.sapling.ai/.well-known/oauth-authorization-server. The access token is sent as an `Authorization: Bearer` header and is accepted only on the language-tool operations that advertise OAuth security. Other authenticated operations require an API key.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /api/v1/liveness`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api.sapling.ai/api/v1/liveness'
```

Inspect the response using the Service reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.


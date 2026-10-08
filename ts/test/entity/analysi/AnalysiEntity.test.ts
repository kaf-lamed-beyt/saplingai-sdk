

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SaplingSdkSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AnalysiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SAPLING_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('SAPLING_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaplingSdkSDK.test()
    const ent = testsdk.Analysi()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('analysi hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of SaplingSdkSDK.test(offline).Analysi().stream('list')) { }
    }, /offline/)

    for await (const _item of SaplingSdkSDK.test(offline).Analysi()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = SaplingSdkSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Analysi().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of SaplingSdkSDK.test().Analysi().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new SaplingSdkSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Analysi().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Analysi().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SaplingSdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Analysi().list({"return_usage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SAPLING_SDK_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'analysi.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"categories":{"a":true,"h":"Categories","n":"categories","r":false,"sh":"Categories to check.","t":"`$ARRAY`","key$":"categories","index$":0},"characters":{"a":true,"h":"Characters","n":"characters","r":false,"t":"`$INTEGER`","key$":"characters","index$":1},"context":{"a":true,"h":"Context","n":"context","r":false,"sh":"Optional guidance (max 500 chars): what the texts are and how to decide borderline cases.","t":"`$STRING`","key$":"context","index$":2},"created":{"a":true,"h":"Created","n":"created","r":false,"t":"`$BOOLEAN`","key$":"created","index$":3},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"sh":"Naive ISO 8601 timestamp (UTC, no offset).","t":"`$STRING`","key$":"created_at","index$":4},"fields":{"a":true,"h":"Fields","n":"fields","r":true,"sh":"The fields to extract (1-20): field names (<=50 chars), or {name, type, description (<=200 chars), required} objects.","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"fields","index$":5},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"Sapling API key.","t":"`$STRING`","key$":"key","index$":6},"keywords":{"a":true,"h":"Keywords","n":"keywords","r":false,"sh":"Target keyword phrases, most important first (max 10).","t":"`$ARRAY`","key$":"keywords","index$":7},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"sh":"The candidate labels (2-20): label names (<=50 chars), or {name, description (<=200 chars)} objects.","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"labels","index$":8},"lang":{"a":true,"h":"Lang","n":"lang","r":false,"sh":"ISO 639-1 language code of the text (default \"en\").","t":"`$STRING`","key$":"lang","index$":9},"multi_label":{"a":true,"h":"Multi Label","n":"multi_label","r":false,"sh":"true = several labels may apply at once (labels = those scoring >= threshold).","t":"`$BOOLEAN`","key$":"multi_label","index$":10},"name":{"a":true,"h":"Name","n":"name","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":11},"neighbors":{"a":true,"h":"Neighbors","n":"neighbors","r":false,"sh":"[similarity, term] pairs.","t":"`$ARRAY`","key$":"neighbors","index$":12},"query":{"a":true,"h":"Query","n":"query","r":true,"t":"`$STRING`","key$":"query","index$":13},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"Present only for a batch (`texts`) request: one entry per input text, in input order, each shaped exactly like the single-text response.","t":"`$ARRAY`","key$":"results","index$":14},"return_usage":{"a":true,"h":"Return Usage","n":"return_usage","r":false,"sh":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…","t":"`$BOOLEAN`","key$":"return_usage","index$":15},"rubric":{"a":true,"h":"Rubric","n":"rubric","r":false,"sh":"Also return the LLM rubric: overall + clarity/coherence/correctness/concision scores, summary and quoted issues with suggested rewrites (default false).","t":"`$BOOLEAN`","key$":"rubric","index$":16},"rules":{"a":true,"h":"Rules","n":"rules","op":{"create":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"The style rules to enforce: 1-20 rules, each a rule name string (at most 80 characters) or a {name, description} object (description at most 400 characters adds nuance the model follows).","t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":1},"key$":"rules","index$":17},"ruleset":{"a":true,"h":"Ruleset","n":"ruleset","r":false,"sh":"The name of a saved ruleset (created via POST /api/v1/styleguide/rulesets) to check against in place of inline rules.","t":"`$STRING`","key$":"ruleset","index$":18},"sentence_scores":{"a":true,"h":"Sentence Scores","n":"sentence_scores","r":false,"sh":"Also return a 1-5 score per sentence (default false).","t":"`$BOOLEAN`","key$":"sentence_scores","index$":19},"suggestions":{"a":true,"h":"Suggestions","n":"suggestions","r":false,"sh":"Generate titles/meta descriptions/slug/keywords with the LLM (default true).","t":"`$BOOLEAN`","key$":"suggestions","index$":20},"synonyms":{"a":true,"h":"Synonyms","n":"synonyms","r":false,"t":"`$ARRAY`","key$":"synonyms","index$":21},"text":{"a":true,"h":"Text","n":"text","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The text to process.","t":"`$STRING`","key$":"text","index$":22},"texts":{"a":true,"h":"Texts","n":"texts","r":false,"sh":"Batch form: 1 to 10 texts, each processed with the same options as a single request.","t":"`$ARRAY`","key$":"texts","index$":23},"threshold":{"a":true,"h":"Threshold","n":"threshold","r":false,"sh":"Multi-label cut-off on the per-label score (default 0.5).","t":"`$NUMBER`","key$":"threshold","index$":24},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":false,"sh":"Naive ISO 8601 timestamp (UTC, no offset).","t":"`$STRING`","key$":"updated_at","index$":25},"usage":{"a":true,"h":"Usage","n":"usage","r":false,"sh":"Present only when the request sent return_usage: true.","t":"`$OBJECT`","key$":"usage","index$":26}},"name":"analysi","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["context","key","labels","multi_label","return_usage","text","texts","threshold"],"co":{"id":"POST /api/v1/classify","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/classify","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"classify"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["context","fields","key","return_usage","text","texts"],"co":{"id":"POST /api/v1/extract","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/extract","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"extract"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["categories","key","return_usage","text","texts"],"co":{"id":"POST /api/v1/inclusive","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/inclusive","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"inclusive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["key","return_usage","rubric","sentence_scores","text","texts"],"co":{"id":"POST /api/v1/quality","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/quality","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"quality"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"bf":["key","return_usage","text"],"co":{"id":"POST /api/v1/sentiment","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/sentiment","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sentiment"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"bf":["key","keywords","lang","return_usage","suggestions","text"],"co":{"id":"POST /api/v1/seo","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/seo","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"seo"}],"t":{"req":"`reqdata`","res":"`body.usage`"},"index$":5},{"a":true,"bf":["key","lang","return_usage","text"],"co":{"id":"POST /api/v1/statistics","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/statistics","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"statistics"}],"t":{"req":"`reqdata`","res":"`body.usage`"},"index$":6},{"a":true,"bf":["key","return_usage","rules","ruleset","text","texts"],"co":{"id":"POST /api/v1/styleguide","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/styleguide","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"styleguide"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7},{"a":true,"bf":["key","name","return_usage","rules"],"co":{"id":"POST /api/v1/styleguide/rulesets","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/styleguide/rulesets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"styleguide"},{"lit":"rulesets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":8},{"a":true,"bf":["key","query","return_usage"],"co":{"id":"POST /api/v1/thesaurus","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/thesaurus","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"thesaurus"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":9},{"a":true,"bf":["key","return_usage","text"],"co":{"id":"POST /api/v1/tone","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/tone","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"tone"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":10}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/styleguide/rulesets","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"return_usage","or":"return_usage","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/styleguide/rulesets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"styleguide"},{"lit":"rulesets"}],"t":{"req":"`reqdata`","res":"`body.rulesets`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"bf":["key","name","return_usage"],"co":{"id":"DELETE /api/v1/styleguide/rulesets","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"key","or":"key","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/styleguide/rulesets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"styleguide"},{"lit":"rulesets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"analysi","name__orig":"analysi","Name":"Analysi","name_":"analysi","name-":"analysi","NAME":"ANALYSI","index$":1}, {"active":true,"entity":"analysi","key$":"BasicAnalysiFlow","kind":"basic","name":"BasicAnalysiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"analysi_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"analysi_ref01"}}]},{"a":true,"d":{},"i":{"ref":"analysi_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"analysi_ref01"}}]}]}, 'Analysi', {"POST /api/v1/classify":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"required":["text"]},{"required":["texts"]}],"properties":{"context":{"description":"Optional guidance (max 500 chars): what the texts are and how to decide borderline cases.","maxLength":500,"type":"string","key$":"context"},"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"labels":{"description":"The candidate labels (2-20): label names (<=50 chars), or {name, description (<=200 chars)} objects. Names must be unique.","items":{"anyOf":[{"maxLength":50,"minLength":1,"type":"string"},{"additionalProperties":false,"properties":{},"required":[],"type":"object"}]},"maxItems":20,"minItems":2,"type":"array","key$":"labels"},"multi_label":{"description":"true = several labels may apply at once (labels = those scoring >= threshold). Default false = exactly one label.","type":"boolean","key$":"multi_label"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","maxLength":10000,"minLength":1,"type":"string","key$":"text"},"texts":{"description":"Batch form: 1 to 10 texts, each processed with the same options as a single request. Send exactly one of `text` or `texts`; the response is then {\"results\": [...]}, one single-text response per input text in input order. Size limits are on the endpoint's docs page -- most cap the combined length of all items at the single-text limit.","items":{"maxLength":10000,"minLength":1,"type":"string"},"maxItems":10,"minItems":1,"type":"array","key$":"texts"},"threshold":{"description":"Multi-label cut-off on the per-label score (default 0.5). Ignored in single-label mode.","maximum":1,"minimum":0,"type":"number","key$":"threshold"}},"required":["labels"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/extract":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"required":["text"]},{"required":["texts"]}],"properties":{"context":{"description":"Optional guidance (max 500 chars): what the document is and how to read ambiguous fields.","maxLength":500,"type":"string","key$":"context"},"fields":{"description":"The fields to extract (1-20): field names (<=50 chars), or {name, type, description (<=200 chars), required} objects. A short description per field sharpens ambiguous ones. Names must be unique.","items":{"anyOf":[{"maxLength":50,"minLength":1,"type":"string"},{"additionalProperties":false,"properties":{},"required":[],"type":"object"}]},"maxItems":20,"minItems":1,"type":"array","key$":"fields"},"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","maxLength":10000,"minLength":1,"type":"string","key$":"text"},"texts":{"description":"Batch form: 1 to 10 texts, each processed with the same options as a single request. Send exactly one of `text` or `texts`; the response is then {\"results\": [...]}, one single-text response per input text in input order. Size limits are on the endpoint's docs page -- most cap the combined length of all items at the single-text limit.","items":{"maxLength":10000,"minLength":1,"type":"string"},"maxItems":10,"minItems":1,"type":"array","key$":"texts"}},"required":["fields"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/inclusive":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"required":["text"]},{"required":["texts"]}],"properties":{"categories":{"description":"Categories to check. Default: all of them.","items":{"enum":["gender","race_ethnicity","disability","age","lgbtq","religion","socioeconomic","appearance"],"type":"string"},"minItems":1,"type":"array","key$":"categories"},"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"text":{"description":"The text to check. Checked as submitted — markup is not stripped.","maxLength":10000,"minLength":1,"pattern":"\\S","type":"string","key$":"text"},"texts":{"description":"Batch form: 1 to 10 texts, each processed with the same options as a single request. Send exactly one of `text` or `texts`; the response is then {\"results\": [...]}, one single-text response per input text in input order. Size limits are on the endpoint's docs page -- most cap the combined length of all items at the single-text limit.","items":{"maxLength":10000,"minLength":1,"pattern":"\\S","type":"string"},"maxItems":10,"minItems":1,"type":"array","key$":"texts"}},"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/quality":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"required":["text"]},{"required":["texts"]}],"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"rubric":{"description":"Also return the LLM rubric: overall + clarity/coherence/correctness/concision scores, summary and quoted issues with suggested rewrites (default false).","type":"boolean","key$":"rubric"},"sentence_scores":{"description":"Also return a 1-5 score per sentence (default false).","type":"boolean","key$":"sentence_scores"},"text":{"description":"The plain text to score. HTML is not stripped — pass markup-free text so tags are not scored as words.","type":"string","key$":"text"},"texts":{"description":"Batch form: 1 to 10 texts, each processed with the same options as a single request. Send exactly one of `text` or `texts`; the response is then {\"results\": [...]}, one single-text response per input text in input order. Size limits are on the endpoint's docs page -- most cap the combined length of all items at the single-text limit.","items":{"type":"string"},"maxItems":10,"minItems":1,"type":"array","key$":"texts"}},"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/sentiment":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","type":"string","key$":"text"}},"required":["text"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/seo":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"keywords":{"description":"Target keyword phrases, most important first (max 10). Each is measured in the text and steered into the suggestions.","items":{"type":"string"},"maxItems":10,"type":"array","key$":"keywords"},"lang":{"description":"ISO 639-1 language code of the text (default \"en\"). Selects the readability formulas; supported for en, de, es, fr, it, nl, pl, ru — other codes are accepted and get null readability.","type":"string","key$":"lang"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"suggestions":{"description":"Generate titles/meta descriptions/slug/keywords with the LLM (default true). false = deterministic stats only.","type":"boolean","key$":"suggestions"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","type":"string","key$":"text"}},"required":["text"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/statistics":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"lang":{"description":"ISO 639-1 language code of the text. Defaults to \"en\".","type":"string","key$":"lang"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","type":"string","key$":"text"}},"required":["text"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/styleguide":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"required":["text","rules"]},{"required":["text","ruleset"]},{"required":["texts","rules"]},{"required":["texts","ruleset"]}],"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"rules":{"description":"The style rules to enforce: 1-20 rules, each a rule name string (at most 80 characters) or a {name, description} object (description at most 400 characters adds nuance the model follows). Names must be unique case-insensitively.","items":{"anyOf":[{"maxLength":80,"minLength":1,"type":"string"},{"additionalProperties":false,"properties":{},"required":[],"type":"object"}]},"maxItems":20,"minItems":1,"type":"array","key$":"rules"},"ruleset":{"description":"The name of a saved ruleset (created via POST /api/v1/styleguide/rulesets) to check against in place of inline rules. Matched case-insensitively within the API key's account (its team, for team keys). Provide exactly one of rules or ruleset.","maxLength":100,"minLength":1,"type":"string","key$":"ruleset"},"text":{"description":"The text to check. Checked as submitted — markup is not stripped.","maxLength":10000,"minLength":1,"type":"string","key$":"text"},"texts":{"description":"Batch form: 1 to 10 texts, each processed with the same options as a single request. Send exactly one of `text` or `texts`; the response is then {\"results\": [...]}, one single-text response per input text in input order. Size limits are on the endpoint's docs page -- most cap the combined length of all items at the single-text limit.","items":{"maxLength":10000,"minLength":1,"type":"string"},"maxItems":10,"minItems":1,"type":"array","key$":"texts"}},"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/styleguide/rulesets":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"name":{"maxLength":100,"minLength":1,"type":"string","key$":"name"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"rules":{"description":"Rule names must be unique (case-insensitive).","items":{"oneOf":[{"maxLength":80,"type":"string"},{"properties":{},"required":[],"type":"object"}]},"maxItems":20,"minItems":1,"type":"array","key$":"rules"}},"required":["name","rules"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/thesaurus":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"query":{"type":"string","key$":"query"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"}},"required":["query"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/tone":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","type":"string","key$":"text"}},"required":["text"],"type":"object","index$":1}}},"required":true},"parameters":[]},"GET /api/v1/styleguide/rulesets":{"protocol":"http","parameters":[{"in":"query","name":"return_usage","required":false,"schema":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean"},"index$":0}]},"DELETE /api/v1/styleguide/rulesets":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string"},"name":{"type":"string"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean"}},"type":"object"}}},"required":false},"parameters":[{"description":"Rule set name (alternatively in the body).","in":"query","name":"name","required":false,"schema":{"type":"string"},"index$":0},{"description":"Sapling API key, as an alternative to the \"Authorization: Bearer <key>\" header.","in":"query","name":"key","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const analysi_ref01_ent = client.Analysi()
    let analysi_ref01_data = setup.data.new.analysi['analysi_ref01']

    analysi_ref01_data = (await analysi_ref01_ent.create(analysi_ref01_data)).data()
    assert(null != analysi_ref01_data)


    // LIST
    const analysi_ref01_match: any = {}

    const analysi_ref01_list = (await analysi_ref01_ent.list(analysi_ref01_match)).map((e: any) => e.data())



    // LIST
    const analysi_ref01_match_rt0: any = {}

    const analysi_ref01_list_rt0 = (await analysi_ref01_ent.list(analysi_ref01_match_rt0)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/analysi/AnalysiTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SaplingSdkSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['analysi01','analysi02','analysi03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SAPLING_SDK_TEST_ANALYSI_ENTID': idmap,
    'SAPLING_SDK_TEST_LIVE': 'FALSE',
    'SAPLING_SDK_TEST_EXPLAIN': 'FALSE',
    'SAPLING_SDK_APIKEY': '',
  })

  idmap = env['SAPLING_SDK_TEST_ANALYSI_ENTID']

  const live = 'TRUE' === env.SAPLING_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SAPLING_SDK_TEST_ANALYSI_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SaplingSdkSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.SAPLING_SDK_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SAPLING_SDK_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

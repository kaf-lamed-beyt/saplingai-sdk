

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


describe('ProofreadingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SAPLING_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('SAPLING_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaplingSdkSDK.test()
    const ent = testsdk.Proofreading()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SaplingSdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Proofreading().create({"auto_apply":"x","text":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SAPLING_SDK_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'proofreading.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auto_apply":{"a":true,"h":"Auto Apply","n":"auto_apply","r":false,"sh":"If true, the response includes applied_text with all edits applied to the input.","t":"`$BOOLEAN`","key$":"auto_apply","index$":0},"include_error_categories":{"a":true,"h":"Include Error Categories","n":"include_error_categories","r":false,"sh":"Defaults to true.","t":"`$BOOLEAN`","key$":"include_error_categories","index$":1},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"Sapling API key.","t":"`$STRING`","key$":"key","index$":2},"lang":{"a":true,"h":"Lang","n":"lang","r":false,"sh":"ISO 639-1 language code of the text (e.g.","t":"`$STRING`","key$":"lang","index$":3},"return_usage":{"a":true,"h":"Return Usage","n":"return_usage","r":false,"sh":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…","t":"`$BOOLEAN`","key$":"return_usage","index$":4},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":false,"sh":"Optional session identifier used to group feedback events.","t":"`$STRING`","key$":"session_id","index$":5},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"The text to process.","t":"`$STRING`","key$":"text","index$":6},"user_id":{"a":true,"h":"User Id","n":"user_id","r":false,"sh":"Your identifier for the end user.","t":"`$STRING`","key$":"user_id","index$":7},"variety":{"a":true,"h":"Variety","n":"variety","r":false,"sh":"English variety to enforce, e.g.","t":"`$STRING`","key$":"variety","index$":8}},"name":"proofreading","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["key","return_usage","session_id","user_id"],"co":{"id":"POST /api/v1/edits/{edit_hash}/accept","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"edit_hash","or":"edit_hash","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/edits/{edit_hash}/accept","q":{"exist":["edit_hash"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"edits"},{"var":"edit_hash"},{"lit":"accept"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["key","return_usage","session_id","user_id"],"co":{"id":"POST /api/v1/edits/{edit_hash}/reject","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"edit_hash","or":"edit_hash","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/edits/{edit_hash}/reject","q":{"exist":["edit_hash"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"edits"},{"var":"edit_hash"},{"lit":"reject"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["auto_apply","include_error_categories","key","lang","return_usage","session_id","text","variety"],"co":{"id":"POST /api/v1/edits","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/edits","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"edits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["key","lang","return_usage","session_id","text"],"co":{"id":"POST /api/v1/spellcheck","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/spellcheck","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spellcheck"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"proofreading","name__orig":"proofreading","Name":"Proofreading","name_":"proofreading","name-":"proofreading","NAME":"PROOFREADING","index$":8}, {"active":true,"entity":"proofreading","key$":"BasicProofreadingFlow","kind":"basic","name":"BasicProofreadingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"proofreading_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Proofreading', {"POST /api/v1/edits/{edit_hash}/accept":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"session_id":{"description":"Optional session identifier used to group feedback events.","type":"string","key$":"session_id"},"user_id":{"description":"Your identifier for the end user. The feedback is acknowledged but NOT recorded when omitted.","maxLength":100,"type":"string","key$":"user_id"}},"type":"object","index$":1}}},"required":true},"parameters":[{"description":"The edit's `id` from /edits.","in":"path","name":"edit_hash","required":true,"schema":{"format":"uuid","type":"string"},"index$":0}]},"POST /api/v1/edits/{edit_hash}/reject":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"session_id":{"description":"Optional session identifier used to group feedback events.","type":"string","key$":"session_id"},"user_id":{"description":"Your identifier for the end user. The feedback is acknowledged but NOT recorded when omitted.","maxLength":100,"type":"string","key$":"user_id"}},"type":"object","index$":1}}},"required":true},"parameters":[{"description":"The edit's `id` from /edits.","in":"path","name":"edit_hash","required":true,"schema":{"format":"uuid","type":"string"},"index$":0}]},"POST /api/v1/edits":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"auto_apply":{"description":"If true, the response includes applied_text with all edits applied to the input.","type":"boolean","key$":"auto_apply"},"include_error_categories":{"description":"Defaults to true. If false, edits omit error_type, general_error_type and classifier-generated descriptions; corrections, offsets, IDs and applied_text are unchanged.","type":"boolean","key$":"include_error_categories"},"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"lang":{"description":"ISO 639-1 language code of the text (e.g. \"en\", \"de\", \"fr\"). Defaults to \"en\".","type":"string","key$":"lang"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"session_id":{"description":"Optional stable identifier for the document or conversation being checked. Reuse the same value when re-checking the same document.","type":"string","key$":"session_id"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","type":"string","key$":"text"},"variety":{"description":"English variety to enforce, e.g. \"us-variety\" or \"gb-variety\". Optional.","enum":["us-variety","gb-variety","au-variety","ca-variety","s-variety","t-variety","null-variety"],"type":"string","key$":"variety"}},"required":["text"],"type":"object","index$":1}}},"required":true},"parameters":[]},"POST /api/v1/spellcheck":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"lang":{"description":"ISO 639-1 language code of the text. Defaults to \"en\".","type":"string","key$":"lang"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"},"session_id":{"description":"Optional stable identifier for the document being checked.","type":"string","key$":"session_id"},"text":{"description":"The text to process. Plain text or HTML (tags are handled server-side).","type":"string","key$":"text"}},"required":["text"],"type":"object","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const proofreading_ref01_ent = client.Proofreading()
    let proofreading_ref01_data = setup.data.new.proofreading['proofreading_ref01']

    proofreading_ref01_data = (await proofreading_ref01_ent.create(proofreading_ref01_data)).data()
    assert(null != proofreading_ref01_data)


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
      '../../../../.sdk/test/entity/proofreading/ProofreadingTestData.json')

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
    ['proofreading01','proofreading02','proofreading03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SAPLING_SDK_TEST_PROOFREADING_ENTID': idmap,
    'SAPLING_SDK_TEST_LIVE': 'FALSE',
    'SAPLING_SDK_TEST_EXPLAIN': 'FALSE',
    'SAPLING_SDK_APIKEY': '',
  })

  idmap = env['SAPLING_SDK_TEST_PROOFREADING_ENTID']

  const live = 'TRUE' === env.SAPLING_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SAPLING_SDK_TEST_PROOFREADING_ENTID']
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
  

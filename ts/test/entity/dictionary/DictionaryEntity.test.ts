

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


describe('DictionaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SAPLING_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('SAPLING_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaplingSdkSDK.test()
    const ent = testsdk.Dictionary()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('dictionary hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of SaplingSdkSDK.test(offline).Dictionary().stream('list')) { }
    }, /offline/)

    for await (const _item of SaplingSdkSDK.test(offline).Dictionary()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = SaplingSdkSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Dictionary().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of SaplingSdkSDK.test().Dictionary().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new SaplingSdkSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Dictionary().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Dictionary().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SaplingSdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Dictionary().list({"return_usage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SAPLING_SDK_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dictionary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"case_sensitive":{"a":true,"h":"Case Sensitive","n":"case_sensitive","r":false,"sh":"Whether matching is case sensitive.","t":"`$BOOLEAN`","key$":"case_sensitive","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"sh":"RFC 1123 timestamp, e.g.","t":"`$STRING`","key$":"created_at","index$":1},"entry":{"a":true,"h":"Entry","n":"entry","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"entry","index$":2},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"Sapling API key.","t":"`$STRING`","key$":"key","index$":4},"return_usage":{"a":true,"h":"Return Usage","n":"return_usage","r":false,"sh":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…","t":"`$BOOLEAN`","key$":"return_usage","index$":5},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":false,"sh":"RFC 1123 timestamp.","t":"`$STRING`","key$":"updated_at","index$":6},"usage":{"a":true,"h":"Usage","n":"usage","r":false,"sh":"Present only when the request sent return_usage: true.","t":"`$OBJECT`","key$":"usage","index$":7}},"id":{"field":"id","name":"id"},"name":"dictionary","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["case_sensitive","entry","key","return_usage"],"co":{"id":"POST /api/v1/dictionary","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/dictionary","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"dictionary"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/dictionary","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"return_usage","or":"return_usage","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/dictionary","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"dictionary"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/dictionary/{entry_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"entry_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"return_usage","or":"return_usage","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/dictionary/{entry_id}","q":{"exist":["id"]},"r":{"param":{"entry_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"dictionary"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"dictionary","name__orig":"dictionary","Name":"Dictionary","name_":"dictionary","name-":"dictionary","NAME":"DICTIONARY","index$":5}, {"active":true,"entity":"dictionary","key$":"BasicDictionaryFlow","kind":"basic","name":"BasicDictionaryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"dictionary_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dictionary_ref01"}}]},{"a":true,"d":{},"i":{"ref":"dictionary_ref01","suffix":"_rm0"},"m":{"id":"dictionary01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"dictionary_ref01"}}]}]}, 'Dictionary', {"POST /api/v1/dictionary":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"case_sensitive":{"default":true,"description":"Whether matching is case sensitive. Defaults to true.","type":"boolean","key$":"case_sensitive"},"entry":{"type":"string","key$":"entry"},"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"}},"required":["entry"],"type":"object","index$":1}}},"required":true},"parameters":[]},"GET /api/v1/dictionary":{"protocol":"http","parameters":[{"in":"query","name":"return_usage","required":false,"schema":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean"},"index$":0}]},"DELETE /api/v1/dictionary/{entry_id}":{"protocol":"http","parameters":[{"description":"Dictionary entry id.","in":"path","name":"entry_id","required":true,"schema":{"format":"uuid","type":"string"},"index$":0},{"in":"query","name":"return_usage","required":false,"schema":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const dictionary_ref01_ent = client.Dictionary()
    let dictionary_ref01_data = setup.data.new.dictionary['dictionary_ref01']

    dictionary_ref01_data = (await dictionary_ref01_ent.create(dictionary_ref01_data)).data()
    assert(null != dictionary_ref01_data.id)


    // LIST
    const dictionary_ref01_match: any = {}

    const dictionary_ref01_list = (await dictionary_ref01_ent.list(dictionary_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(dictionary_ref01_list, { id: dictionary_ref01_data.id })))


    // REMOVE
    const dictionary_ref01_match_rm0: any = { id: dictionary_ref01_data.id }
    await dictionary_ref01_ent.remove(dictionary_ref01_match_rm0)
  

    // LIST
    const dictionary_ref01_match_rt0: any = {}

    const dictionary_ref01_list_rt0 = (await dictionary_ref01_ent.list(dictionary_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(dictionary_ref01_list_rt0, { id: dictionary_ref01_data.id })))


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
      '../../../../.sdk/test/entity/dictionary/DictionaryTestData.json')

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
    ['dictionary01','dictionary02','dictionary03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SAPLING_SDK_TEST_DICTIONARY_ENTID': idmap,
    'SAPLING_SDK_TEST_LIVE': 'FALSE',
    'SAPLING_SDK_TEST_EXPLAIN': 'FALSE',
    'SAPLING_SDK_APIKEY': '',
  })

  idmap = env['SAPLING_SDK_TEST_DICTIONARY_ENTID']

  const live = 'TRUE' === env.SAPLING_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SAPLING_SDK_TEST_DICTIONARY_ENTID']
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
  

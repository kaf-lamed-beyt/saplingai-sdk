

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


describe('CustomFilterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SAPLING_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('SAPLING_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SaplingSdkSDK.test()
    const ent = testsdk.CustomFilter()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('custom_filter hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of SaplingSdkSDK.test(offline).CustomFilter().stream('list')) { }
    }, /offline/)

    for await (const _item of SaplingSdkSDK.test(offline).CustomFilter()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = SaplingSdkSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.CustomFilter().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of SaplingSdkSDK.test().CustomFilter().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new SaplingSdkSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.CustomFilter().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.CustomFilter().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SaplingSdkSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CustomFilter().list({"return_usage":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SAPLING_SDK_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'custom_filter.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"case_sensitive":{"a":true,"h":"Case Sensitive","n":"case_sensitive","r":false,"sh":"Whether matching is case sensitive.","t":"`$BOOLEAN`","key$":"case_sensitive","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"sh":"RFC 1123 timestamp, e.g.","t":"`$STRING`","key$":"created_at","index$":1},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"inp":{"a":true,"h":"Inp","n":"inp","r":false,"sh":"Original text of the suggestion.","t":"`$STRING`","key$":"inp","index$":3},"input":{"a":true,"h":"Input","n":"input","r":false,"t":"`$STRING`","key$":"input","index$":4},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"Sapling API key.","t":"`$STRING`","key$":"key","index$":5},"out":{"a":true,"h":"Out","n":"out","r":false,"sh":"Replacement to suppress.","t":"`$STRING`","key$":"out","index$":6},"output":{"a":true,"h":"Output","n":"output","r":false,"t":"`$STRING`","key$":"output","index$":7},"return_usage":{"a":true,"h":"Return Usage","n":"return_usage","r":false,"sh":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…","t":"`$BOOLEAN`","key$":"return_usage","index$":8},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":false,"sh":"RFC 1123 timestamp.","t":"`$STRING`","key$":"updated_at","index$":9},"usage":{"a":true,"h":"Usage","n":"usage","r":false,"sh":"Present only when the request sent return_usage: true.","t":"`$OBJECT`","key$":"usage","index$":10}},"id":{"field":"id","name":"id"},"name":"custom_filter","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["case_sensitive","inp","key","out","return_usage"],"co":{"id":"POST /api/v1/custom_filter","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/custom_filter","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"custom_filter"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/custom_filter","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"return_usage","or":"return_usage","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/custom_filter","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"custom_filter"}],"t":{"req":"`reqdata`","res":"`body.custom_filters`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/custom_filter/{filter_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"filter_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"k":"query","n":"return_usage","or":"return_usage","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/custom_filter/{filter_id}","q":{"exist":["id"]},"r":{"param":{"filter_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"custom_filter"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"custom_filter","name__orig":"custom_filter","Name":"CustomFilter","name_":"custom_filter","name-":"custom-filter","NAME":"CUSTOM_FILTER","index$":2}, {"active":true,"entity":"custom_filter","key$":"BasicCustomFilterFlow","kind":"basic","name":"BasicCustomFilterFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"custom_filter_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"custom_filter_ref01"}}]},{"a":true,"d":{},"i":{"ref":"custom_filter_ref01","suffix":"_rm0"},"m":{"id":"custom_filter01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"custom_filter_ref01"}}]}]}, 'CustomFilter', {"POST /api/v1/custom_filter":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"case_sensitive":{"default":true,"description":"Whether matching is case sensitive. Defaults to true.","type":"boolean","key$":"case_sensitive"},"inp":{"description":"Original text of the suggestion.","type":"string","key$":"inp"},"key":{"description":"Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.","type":"string","key$":"key"},"out":{"description":"Replacement to suppress.","type":"string","key$":"out"},"return_usage":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean","key$":"return_usage"}},"type":"object","index$":1}}},"required":true},"parameters":[]},"GET /api/v1/custom_filter":{"protocol":"http","parameters":[{"in":"query","name":"return_usage","required":false,"schema":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean"},"index$":0}]},"DELETE /api/v1/custom_filter/{filter_id}":{"protocol":"http","parameters":[{"description":"Custom filter id.","in":"path","name":"filter_id","required":true,"schema":{"format":"uuid","type":"string"},"index$":0},{"in":"query","name":"return_usage","required":false,"schema":{"default":false,"description":"When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.","type":"boolean"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const custom_filter_ref01_ent = client.CustomFilter()
    let custom_filter_ref01_data = setup.data.new.custom_filter['custom_filter_ref01']

    custom_filter_ref01_data = (await custom_filter_ref01_ent.create(custom_filter_ref01_data)).data()
    assert(null != custom_filter_ref01_data.id)


    // LIST
    const custom_filter_ref01_match: any = {}

    const custom_filter_ref01_list = (await custom_filter_ref01_ent.list(custom_filter_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(custom_filter_ref01_list, { id: custom_filter_ref01_data.id })))


    // REMOVE
    const custom_filter_ref01_match_rm0: any = { id: custom_filter_ref01_data.id }
    await custom_filter_ref01_ent.remove(custom_filter_ref01_match_rm0)
  

    // LIST
    const custom_filter_ref01_match_rt0: any = {}

    const custom_filter_ref01_list_rt0 = (await custom_filter_ref01_ent.list(custom_filter_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(custom_filter_ref01_list_rt0, { id: custom_filter_ref01_data.id })))


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
      '../../../../.sdk/test/entity/custom_filter/CustomFilterTestData.json')

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
    ['custom_filter01','custom_filter02','custom_filter03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SAPLING_SDK_TEST_CUSTOM_FILTER_ENTID': idmap,
    'SAPLING_SDK_TEST_LIVE': 'FALSE',
    'SAPLING_SDK_TEST_EXPLAIN': 'FALSE',
    'SAPLING_SDK_APIKEY': '',
  })

  idmap = env['SAPLING_SDK_TEST_CUSTOM_FILTER_ENTID']

  const live = 'TRUE' === env.SAPLING_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SAPLING_SDK_TEST_CUSTOM_FILTER_ENTID']
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
  

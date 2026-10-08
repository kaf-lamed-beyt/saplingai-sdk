"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CustomMappingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SAPLING_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SAPLING_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaplingSdkSDK.test();
        const ent = testsdk.CustomMapping();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('custom_mapping hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.SaplingSdkSDK.test(offline).CustomMapping().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.SaplingSdkSDK.test(offline).CustomMapping()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.SaplingSdkSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.CustomMapping().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.SaplingSdkSDK.test().CustomMapping().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.SaplingSdkSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.CustomMapping().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.CustomMapping().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.SaplingSdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CustomMapping().list({ "return_usage": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SAPLING_SDK_TEST_LIVE;
        for (const op of ['create', 'list', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'custom_mapping.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "case_sensitive": { "a": true, "h": "Case Sensitive", "n": "case_sensitive", "r": false, "sh": "Whether matching is case sensitive.", "t": "`$BOOLEAN`", "key$": "case_sensitive", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "RFC 1123 timestamp, e.g.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Shown to the user with the suggestion; null when none was set.", "t": "`$STRING`", "key$": "description", "index$": 2 }, "entry": { "a": true, "h": "Entry", "n": "entry", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "entry", "index$": 3 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "sh": "Sapling API key.", "t": "`$STRING`", "key$": "key", "index$": 5 }, "mapping": { "a": true, "h": "Mapping", "n": "mapping", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "mapping", "index$": 6 }, "return_usage": { "a": true, "h": "Return Usage", "n": "return_usage", "r": false, "sh": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…", "t": "`$BOOLEAN`", "key$": "return_usage", "index$": 7 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "sh": "RFC 1123 timestamp.", "t": "`$STRING`", "key$": "updated_at", "index$": 8 }, "usage": { "a": true, "h": "Usage", "n": "usage", "r": false, "sh": "Present only when the request sent return_usage: true.", "t": "`$OBJECT`", "key$": "usage", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "custom_mapping", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["case_sensitive", "description", "entry", "key", "mapping", "return_usage"], "co": { "id": "POST /api/v1/custom_mapping", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/custom_mapping", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "custom_mapping" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/custom_mapping", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "return_usage", "or": "return_usage", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/custom_mapping", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "custom_mapping" }], "t": { "req": "`reqdata`", "res": "`body.custom_mappings`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/custom_mapping/{mapping_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "mapping_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "return_usage", "or": "return_usage", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/custom_mapping/{mapping_id}", "q": { "exist": ["id"] }, "r": { "param": { "mapping_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "custom_mapping" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "custom_mapping", "name__orig": "custom_mapping", "Name": "CustomMapping", "name_": "custom_mapping", "name-": "custom-mapping", "NAME": "CUSTOM_MAPPING", "index$": 3 }, { "active": true, "entity": "custom_mapping", "key$": "BasicCustomMappingFlow", "kind": "basic", "name": "BasicCustomMappingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "custom_mapping_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "custom_mapping_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "custom_mapping_ref01", "suffix": "_rm0" }, "m": { "id": "custom_mapping01" }, "o": "remove", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "custom_mapping_ref01" } }] }] }, 'CustomMapping', { "POST /api/v1/custom_mapping": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "case_sensitive": { "default": true, "description": "Whether matching is case sensitive. Defaults to true.", "type": "boolean", "key$": "case_sensitive" }, "description": { "default": "", "description": "Shown to the user with the suggestion.", "type": "string", "key$": "description" }, "entry": { "type": "string", "key$": "entry" }, "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string", "key$": "key" }, "mapping": { "type": "string", "key$": "mapping" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean", "key$": "return_usage" } }, "required": ["entry", "mapping"], "type": "object", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /api/v1/custom_mapping": { "protocol": "http", "parameters": [{ "in": "query", "name": "return_usage", "required": false, "schema": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" }, "index$": 0 }] }, "DELETE /api/v1/custom_mapping/{mapping_id}": { "protocol": "http", "parameters": [{ "description": "Custom mapping id.", "in": "path", "name": "mapping_id", "required": true, "schema": { "format": "uuid", "type": "string" }, "index$": 0 }, { "in": "query", "name": "return_usage", "required": false, "schema": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const custom_mapping_ref01_ent = client.CustomMapping();
        let custom_mapping_ref01_data = setup.data.new.custom_mapping['custom_mapping_ref01'];
        custom_mapping_ref01_data = (await custom_mapping_ref01_ent.create(custom_mapping_ref01_data)).data();
        (0, node_assert_1.default)(null != custom_mapping_ref01_data.id);
        // LIST
        const custom_mapping_ref01_match = {};
        const custom_mapping_ref01_list = (await custom_mapping_ref01_ent.list(custom_mapping_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(custom_mapping_ref01_list, { id: custom_mapping_ref01_data.id })));
        // REMOVE
        const custom_mapping_ref01_match_rm0 = { id: custom_mapping_ref01_data.id };
        await custom_mapping_ref01_ent.remove(custom_mapping_ref01_match_rm0);
        // LIST
        const custom_mapping_ref01_match_rt0 = {};
        const custom_mapping_ref01_list_rt0 = (await custom_mapping_ref01_ent.list(custom_mapping_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(custom_mapping_ref01_list_rt0, { id: custom_mapping_ref01_data.id })));
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/custom_mapping/CustomMappingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaplingSdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['custom_mapping01', 'custom_mapping02', 'custom_mapping03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SAPLING_SDK_TEST_CUSTOM_MAPPING_ENTID': idmap,
        'SAPLING_SDK_TEST_LIVE': 'FALSE',
        'SAPLING_SDK_TEST_EXPLAIN': 'FALSE',
        'SAPLING_SDK_APIKEY': '',
    });
    idmap = env['SAPLING_SDK_TEST_CUSTOM_MAPPING_ENTID'];
    const live = 'TRUE' === env.SAPLING_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SAPLING_SDK_TEST_CUSTOM_MAPPING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SaplingSdkSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=CustomMappingEntity.test.js.map
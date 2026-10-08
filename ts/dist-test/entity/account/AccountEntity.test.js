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
(0, node_test_1.describe)('AccountEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SAPLING_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SAPLING_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaplingSdkSDK.test();
        const ent = testsdk.Account();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.SaplingSdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Account().load({ "return_usage": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SAPLING_SDK_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'account.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accepts": { "a": true, "h": "Accepts", "n": "accepts", "r": false, "t": "`$INTEGER`", "key$": "accepts", "index$": 0 }, "active_users": { "a": true, "h": "Active Users", "n": "active_users", "r": false, "t": "`$OBJECT`", "key$": "active_users", "index$": 1 }, "by_api_key": { "a": true, "h": "By Api Key", "n": "by_api_key", "r": false, "t": "`$OBJECT`", "key$": "by_api_key", "index$": 2 }, "by_endpoint": { "a": true, "h": "By Endpoint", "n": "by_endpoint", "r": false, "t": "`$OBJECT`", "key$": "by_endpoint", "index$": 3 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "t": "`$STRING`", "key$": "currency", "index$": 4 }, "daily_usage": { "a": true, "h": "Daily Usage", "n": "daily_usage", "r": false, "sh": "Characters per day.", "t": "`$ANY`", "key$": "daily_usage", "index$": 5 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "t": "`$OBJECT`", "key$": "data", "index$": 6 }, "edits_accepted": { "a": true, "h": "Edits Accepted", "n": "edits_accepted", "r": false, "t": "`$INTEGER`", "key$": "edits_accepted", "index$": 7 }, "edits_ignored": { "a": true, "h": "Edits Ignored", "n": "edits_ignored", "r": false, "t": "`$INTEGER`", "key$": "edits_ignored", "index$": 8 }, "edits_shown": { "a": true, "h": "Edits Shown", "n": "edits_shown", "r": false, "t": "`$INTEGER`", "key$": "edits_shown", "index$": 9 }, "end_date": { "a": true, "h": "End Date", "n": "end_date", "r": false, "t": "`$STRING`", "key$": "end_date", "index$": 10 }, "end_days_back": { "a": true, "h": "End Days Back", "n": "end_days_back", "r": false, "sh": "Window end, in days before today.", "t": "`$INTEGER`", "key$": "end_days_back", "index$": 11 }, "ignores": { "a": true, "h": "Ignores", "n": "ignores", "r": false, "t": "`$INTEGER`", "key$": "ignores", "index$": 12 }, "interval": { "a": true, "h": "Interval", "n": "interval", "r": false, "t": "`$STRING`", "key$": "interval", "index$": 13 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "sh": "Sapling API key.", "t": "`$STRING`", "key$": "key", "index$": 14 }, "last_updated": { "a": true, "h": "Last Updated", "n": "last_updated", "r": false, "sh": "ISO timestamp, or null.", "t": "`$ANY`", "key$": "last_updated", "index$": 15 }, "monthly_usage": { "a": true, "h": "Monthly Usage", "n": "monthly_usage", "r": false, "sh": "Characters per month.", "t": "`$ANY`", "key$": "monthly_usage", "index$": 16 }, "quota": { "a": true, "h": "Quota", "n": "quota", "r": false, "t": "`$INTEGER`", "key$": "quota", "index$": 17 }, "return_usage": { "a": true, "h": "Return Usage", "n": "return_usage", "r": false, "sh": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…", "t": "`$BOOLEAN`", "key$": "return_usage", "index$": 18 }, "start_date": { "a": true, "h": "Start Date", "n": "start_date", "r": false, "t": "`$STRING`", "key$": "start_date", "index$": 19 }, "start_days_back": { "a": true, "h": "Start Days Back", "n": "start_days_back", "r": false, "sh": "Window start, in days before today.", "t": "`$INTEGER`", "key$": "start_days_back", "index$": 20 }, "total_characters": { "a": true, "h": "Total Characters", "n": "total_characters", "r": false, "t": "`$INTEGER`", "key$": "total_characters", "index$": 21 }, "total_cost_usd": { "a": true, "h": "Total Cost Usd", "n": "total_cost_usd", "r": false, "t": "`$NUMBER`", "key$": "total_cost_usd", "index$": 22 }, "usage": { "a": true, "h": "Usage", "n": "usage", "r": false, "sh": "Present only when the request sent return_usage: true.", "t": "`$OBJECT`", "key$": "usage", "index$": 23 } }, "name": "account", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["key", "return_usage"], "co": { "id": "POST /api/v1/account/status", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/account/status", "q": { "$action": "status" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "account" }, { "lit": "status" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["end_days_back", "interval", "key", "return_usage", "start_days_back"], "co": { "id": "POST /api/v1/reporting/api_endpoint_usage", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/reporting/api_endpoint_usage", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reporting" }, { "lit": "api_endpoint_usage" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["end_days_back", "key", "return_usage", "start_days_back"], "co": { "id": "POST /api/v1/reporting/api_quota_usage", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/reporting/api_quota_usage", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reporting" }, { "lit": "api_quota_usage" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["end_days_back", "key", "return_usage", "start_days_back"], "co": { "id": "POST /api/v1/reporting/api_usage", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/reporting/api_usage", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reporting" }, { "lit": "api_usage" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": ["end_days_back", "key", "return_usage", "start_days_back"], "co": { "id": "POST /api/v1/reporting/api_user_activity", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/reporting/api_user_activity", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "reporting" }, { "lit": "api_user_activity" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/account/status", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "return_usage", "or": "return_usage", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/account/status", "q": { "$action": "status" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "account" }, { "lit": "status" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "account", "name__orig": "account", "Name": "Account", "name_": "account", "name-": "account", "NAME": "ACCOUNT", "index$": 0 }, { "active": true, "entity": "account", "key$": "BasicAccountFlow", "kind": "basic", "name": "BasicAccountFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "account_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "ref": "account_ref01", "srcdatavar": "account_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-account_ref01" } }] }] }, 'Account', { "POST /api/v1/account/status": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" } }, "type": "object" } } }, "required": false }, "parameters": [] }, "POST /api/v1/reporting/api_endpoint_usage": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "minProperties": 1, "properties": { "end_days_back": { "default": 0, "description": "Window end, in days before today.", "minimum": 0, "type": "integer", "key$": "end_days_back" }, "interval": { "default": "Daily", "enum": ["Daily", "Weekly", "Monthly"], "type": "string", "key$": "interval" }, "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string", "key$": "key" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean", "key$": "return_usage" }, "start_days_back": { "default": 6, "description": "Window start, in days before today.", "minimum": 0, "type": "integer", "key$": "start_days_back" } }, "type": "object", "index$": 1 } } }, "required": true }, "parameters": [] }, "POST /api/v1/reporting/api_quota_usage": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "end_days_back": { "default": 0, "description": "Window end, in days before today.", "minimum": 0, "type": "integer", "key$": "end_days_back" }, "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string", "key$": "key" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean", "key$": "return_usage" }, "start_days_back": { "default": 1, "description": "Window start, in days before today.", "minimum": 0, "type": "integer", "key$": "start_days_back" } }, "type": "object", "index$": 1 } } }, "required": true }, "parameters": [] }, "POST /api/v1/reporting/api_usage": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "end_days_back": { "default": 0, "description": "Window end, in days before today.", "minimum": 0, "type": "integer", "key$": "end_days_back" }, "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string", "key$": "key" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean", "key$": "return_usage" }, "start_days_back": { "description": "Window start, in days before today. Defaults to the first of this month.", "minimum": 0, "type": "integer", "key$": "start_days_back" } }, "type": "object", "index$": 1 } } }, "required": false }, "parameters": [] }, "POST /api/v1/reporting/api_user_activity": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "minProperties": 1, "properties": { "end_days_back": { "default": 0, "description": "Window end, in days before today.", "minimum": 0, "type": "integer", "key$": "end_days_back" }, "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string", "key$": "key" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean", "key$": "return_usage" }, "start_days_back": { "default": 6, "description": "Window start, in days before today.", "minimum": 0, "type": "integer", "key$": "start_days_back" } }, "type": "object", "index$": 1 } } }, "required": true }, "parameters": [] }, "GET /api/v1/account/status": { "protocol": "http", "parameters": [{ "in": "query", "name": "return_usage", "required": false, "schema": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const account_ref01_ent = client.Account();
        let account_ref01_data = setup.data.new.account['account_ref01'];
        account_ref01_data = (await account_ref01_ent.create(account_ref01_data)).data();
        (0, node_assert_1.default)(null != account_ref01_data);
        // LOAD
        const account_ref01_match_dt0 = {};
        const account_ref01_data_dt0 = (await account_ref01_ent.load(account_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != account_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/account/AccountTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaplingSdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['account01', 'account02', 'account03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SAPLING_SDK_TEST_ACCOUNT_ENTID': idmap,
        'SAPLING_SDK_TEST_LIVE': 'FALSE',
        'SAPLING_SDK_TEST_EXPLAIN': 'FALSE',
        'SAPLING_SDK_APIKEY': '',
    });
    idmap = env['SAPLING_SDK_TEST_ACCOUNT_ENTID'];
    const live = 'TRUE' === env.SAPLING_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SAPLING_SDK_TEST_ACCOUNT_ENTID'];
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
//# sourceMappingURL=AccountEntity.test.js.map
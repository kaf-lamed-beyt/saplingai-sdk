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
(0, node_test_1.describe)('FileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SAPLING_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SAPLING_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SaplingSdkSDK.test();
        const ent = testsdk.File();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.SaplingSdkSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.File().create({ "html": 1, "max_length": 1, "text": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SAPLING_SDK_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'file.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "chunks": { "a": true, "h": "Chunks", "n": "chunks", "r": false, "t": "`$ARRAY`", "key$": "chunks", "index$": 0 }, "html": { "a": true, "h": "Html", "n": "html", "r": true, "t": "`$STRING`", "key$": "html", "index$": 1 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "sh": "Sapling API key.", "t": "`$STRING`", "key$": "key", "index$": 2 }, "max_length": { "a": true, "h": "Max Length", "n": "max_length", "r": true, "sh": "Maximum chunk length in characters.", "t": "`$INTEGER`", "key$": "max_length", "index$": 3 }, "return_usage": { "a": true, "h": "Return Usage", "n": "return_usage", "r": false, "sh": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJ…", "t": "`$BOOLEAN`", "key$": "return_usage", "index$": 4 }, "step_size": { "a": true, "h": "Step Size", "n": "step_size", "r": false, "sh": "Characters to advance between chunk starts; 0 means 10% of max_length.", "t": "`$INTEGER`", "key$": "step_size", "index$": 5 }, "text": { "a": true, "h": "Text", "n": "text", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "text", "index$": 6 }, "usage": { "a": true, "h": "Usage", "n": "usage", "r": false, "sh": "Present only when the request sent return_usage: true.", "t": "`$OBJECT`", "key$": "usage", "index$": 7 } }, "name": "file", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["html", "key", "max_length", "return_usage", "step_size"], "co": { "id": "POST /api/v1/ingest/chunk_html", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/ingest/chunk_html", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ingest" }, { "lit": "chunk_html" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["key", "max_length", "return_usage", "step_size", "text"], "co": { "id": "POST /api/v1/ingest/chunk_text", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/ingest/chunk_text", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ingest" }, { "lit": "chunk_text" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /api/v1/ingest/docx_to_text", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "key", "or": "key", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": false, "k": "query", "n": "return_usage", "or": "return_usage", "r": false, "t": "`$BOOLEAN`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/ingest/docx_to_text", "q": {}, "r": {}, "rb": { "fields": [{ "binary": true, "name": "file" }, { "binary": true, "name": "jsonParams" }, { "name": "return_usage" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ingest" }, { "lit": "docx_to_text" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "POST /api/v1/ingest/pdf_to_text", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "key", "or": "key", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": false, "k": "query", "n": "return_usage", "or": "return_usage", "r": false, "t": "`$BOOLEAN`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/ingest/pdf_to_text", "q": {}, "r": {}, "rb": { "fields": [{ "binary": true, "name": "file" }, { "binary": true, "name": "jsonParams" }, { "name": "return_usage" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ingest" }, { "lit": "pdf_to_text" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "file", "name__orig": "file", "Name": "File", "name_": "file", "name-": "file", "NAME": "FILE", "index$": 6 }, { "active": true, "entity": "file", "key$": "BasicFileFlow", "kind": "basic", "name": "BasicFileFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "file_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }] }, 'File', { "POST /api/v1/ingest/chunk_html": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "html": { "type": "string", "key$": "html" }, "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string", "key$": "key" }, "max_length": { "description": "Maximum chunk length in characters. Required in practice: omitting it answers 400.", "minimum": 1, "type": "integer", "key$": "max_length" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean", "key$": "return_usage" }, "step_size": { "default": 0, "description": "Characters to advance between chunk starts; 0 means 10% of max_length.", "minimum": 0, "type": "integer", "key$": "step_size" } }, "required": ["html", "max_length"], "type": "object", "index$": 1 } } }, "required": true }, "parameters": [] }, "POST /api/v1/ingest/chunk_text": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "properties": { "key": { "description": "Sapling API key. Required when no \"Authorization: Bearer <key>\" header is sent; when both are sent, the body key takes precedence over the header.", "type": "string", "key$": "key" }, "max_length": { "description": "Maximum chunk length in characters. Required in practice: omitting it answers 400.", "minimum": 1, "type": "integer", "key$": "max_length" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean", "key$": "return_usage" }, "step_size": { "default": 0, "description": "Characters to advance between chunk starts; 0 means 10% of max_length.", "minimum": 0, "type": "integer", "key$": "step_size" }, "text": { "type": "string", "key$": "text" } }, "required": ["text", "max_length"], "type": "object", "index$": 1 } } }, "required": true }, "parameters": [] }, "POST /api/v1/ingest/docx_to_text": { "protocol": "http", "requestBody": { "content": { "multipart/form-data": { "schema": { "properties": { "file": { "description": "The document to upload.", "format": "binary", "type": "string" }, "jsonParams": { "description": "Optional part carrying a JSON object, e.g. {\"key\": \"<API key>\", \"return_usage\": true}, as an alternative to the query or header credential. Send it as a file part.", "format": "binary", "type": "string" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" } }, "required": ["file"], "type": "object" } } }, "required": true }, "parameters": [{ "in": "query", "name": "return_usage", "required": false, "schema": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" }, "index$": 0 }, { "description": "Sapling API key, as an alternative to the \"Authorization: Bearer <key>\" header.", "in": "query", "name": "key", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/ingest/pdf_to_text": { "protocol": "http", "requestBody": { "content": { "multipart/form-data": { "schema": { "properties": { "file": { "description": "The document to upload.", "format": "binary", "type": "string" }, "jsonParams": { "description": "Optional part carrying a JSON object, e.g. {\"key\": \"<API key>\", \"return_usage\": true}, as an alternative to the query or header credential. Send it as a file part.", "format": "binary", "type": "string" }, "return_usage": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" } }, "required": ["file"], "type": "object" } } }, "required": true }, "parameters": [{ "in": "query", "name": "return_usage", "required": false, "schema": { "default": false, "description": "When true, a successful JSON-object response additionally carries \"usage\": {\"characters\": <n>} — the billable character count this request submitted (0 for unbilled requests; the 2.5x adjustment for logographic languages is included, so CJK requests report more than their raw length). Repeat texts inside the billing deduplication window are still counted here even though they are not re-charged, so the number is an upper bound on the final charge. Responses whose body is not a JSON object (e.g. bare-array response formats) cannot carry the field. An existing usage field (such as account/status or completion token usage) is preserved unchanged.", "type": "boolean" }, "index$": 0 }, { "description": "Sapling API key, as an alternative to the \"Authorization: Bearer <key>\" header.", "in": "query", "name": "key", "required": false, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const file_ref01_ent = client.File();
        let file_ref01_data = setup.data.new.file['file_ref01'];
        file_ref01_data = (await file_ref01_ent.create(file_ref01_data)).data();
        (0, node_assert_1.default)(null != file_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/file/FileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SaplingSdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['file01', 'file02', 'file03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SAPLING_SDK_TEST_FILE_ENTID': idmap,
        'SAPLING_SDK_TEST_LIVE': 'FALSE',
        'SAPLING_SDK_TEST_EXPLAIN': 'FALSE',
        'SAPLING_SDK_APIKEY': '',
    });
    idmap = env['SAPLING_SDK_TEST_FILE_ENTID'];
    const live = 'TRUE' === env.SAPLING_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SAPLING_SDK_TEST_FILE_ENTID'];
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
//# sourceMappingURL=FileEntity.test.js.map
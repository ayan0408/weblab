"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var db_1 = require("./database/db");
var koa_1 = __importDefault(require("koa"));
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var koa_session_1 = __importDefault(require("koa-session"));
var koa_static_1 = __importDefault(require("koa-static"));
var app = new koa_1.default();
app.keys = [process.env.SECRET_KEY || 'default-secret-key'];
var PORT = process.env.PORT || 5000;
app.use((0, koa_session_1.default)(app));
app.use((0, koa_static_1.default)(path_1.default.join(__dirname, 'public')));
var createSessionTableSQL = "\nCREATE TABLE IF NOT EXISTS \"session\" (\n  \"sid\" varchar NOT NULL COLLATE \"default\",\n  \"sess\" json NOT NULL,\n  \"expire\" timestamp(6) NOT NULL\n)\nWITH (OIDS=FALSE);\n\nALTER TABLE \"session\" ADD CONSTRAINT \"session_pkey\" PRIMARY KEY (\"sid\") NOT DEFERRABLE INITIALLY IMMEDIATE;\n\nCREATE INDEX IF NOT EXISTS \"IDX_session_expire\" ON \"session\" (\"expire\");\n";
var createUserTableSQL = "\nCREATE TABLE IF NOT EXISTS users (\n  id SERIAL PRIMARY KEY,\n  fio VARCHAR(255) NOT NULL,\n  username VARCHAR(255) NOT NULL,\n  password VARCHAR(255) NOT NULL\n);\n";
(0, db_1.executeSQL)(createSessionTableSQL);
(0, db_1.executeSQL)(createUserTableSQL);
app.use((0, koa_bodyparser_1.default)());
app.use(routes_1.default.routes());
app.use(routes_1.default.allowedMethods());
app.listen(PORT, function () {
    console.log("Listening on http://localhost:".concat(PORT));
});

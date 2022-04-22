"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
const middlewares_1 = require("./middlewares");
require('env2')('.env');
const app = (0, express_1.default)();
const { NODE_ENV } = process.env;
app.set('port', process.env.PORT || 5001);
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use('/api', index_1.default);
if (NODE_ENV === 'production') {
    app.use(express_1.default.static((0, path_1.join)(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile((0, path_1.join)(__dirname, '..', 'client', 'build', 'index.html'));
    });
}
app.use(middlewares_1.pageNotFoundError);
app.use(middlewares_1.serverError);
exports.default = app;

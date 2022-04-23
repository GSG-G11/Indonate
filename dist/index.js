"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = app_1.default.get('port');
app_1.default.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});

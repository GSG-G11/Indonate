"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = exports.authUser = exports.notFoundError = exports.serverError = void 0;
const notFoundError_1 = __importDefault(require("./error/notFoundError"));
exports.notFoundError = notFoundError_1.default;
const serverError_1 = __importDefault(require("./error/serverError"));
exports.serverError = serverError_1.default;
const user_1 = __importDefault(require("./auth/user"));
exports.authUser = user_1.default;
const admin_1 = __importDefault(require("./auth/admin"));
exports.authAdmin = admin_1.default;

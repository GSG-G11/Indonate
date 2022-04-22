"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFoundError = exports.serverError = void 0;
const pageNotFoundError_1 = __importDefault(require("./error/pageNotFoundError"));
exports.pageNotFoundError = pageNotFoundError_1.default;
const serverError_1 = __importDefault(require("../middlewares/error/serverError"));
exports.serverError = serverError_1.default;

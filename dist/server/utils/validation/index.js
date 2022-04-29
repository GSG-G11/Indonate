"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationSchema = exports.reportsSchema = exports.paramsSchema = exports.signUpSchema = exports.loginSchema = void 0;
const signUpSchema_1 = __importDefault(require("./signUpSchema"));
exports.signUpSchema = signUpSchema_1.default;
const loginSchema_1 = __importDefault(require("./loginSchema"));
exports.loginSchema = loginSchema_1.default;
const paramsSchema_1 = __importDefault(require("./paramsSchema"));
exports.paramsSchema = paramsSchema_1.default;
const reportsSchema_1 = __importDefault(require("./reportsSchema"));
exports.reportsSchema = reportsSchema_1.default;
const donationSchema_1 = __importDefault(require("./donationSchema"));
exports.donationSchema = donationSchema_1.default;

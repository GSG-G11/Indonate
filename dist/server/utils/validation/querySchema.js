"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const querySchema = joi_1.default.object({
    page: joi_1.default.number(),
    limit: joi_1.default.number(),
    available: joi_1.default.boolean(),
    category: joi_1.default.string().allow(''),
    search: joi_1.default.string().allow(''),
});
exports.default = querySchema;

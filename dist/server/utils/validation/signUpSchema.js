"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const signUpSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().max(250).min(4).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: joi_1.default.string().max(50).min(3).required(),
    address: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
});
exports.default = signUpSchema;

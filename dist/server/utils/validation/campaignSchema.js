"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const campaignSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    food_target: joi_1.default.number().min(1),
    clothes_target: joi_1.default.number().min(1),
    money_target: joi_1.default.number().min(1),
    image_link: joi_1.default.string().required(),
    categoryId: joi_1.default.number().required(),
});
exports.default = campaignSchema;

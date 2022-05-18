"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const models_1 = require("../../../database/models");
const validation_1 = require("../../../utils/validation");
const createCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaign = yield validation_1.campaignSchema.validateAsync(req.body);
        yield models_1.Campaign.create(campaign);
        res.status(201).json({ message: 'Campaign added successfully' });
    }
    catch (e) {
        if (e.name === 'ValidationError') {
            next(new utils_1.CustomError(e.message, 400));
        }
        next(e);
    }
});
exports.default = createCampaign;

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
const models_1 = require("../../../database/models");
const utils_1 = require("../../../utils");
const getFamiliesForCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const campaign = yield models_1.Campaign.findByPk(id);
        if (!campaign) {
            throw new utils_1.CustomError('This campaign dose not exists', 400);
        }
        else {
            const families = yield models_1.Family.findAll({
                attributes: { exclude: ['updatedAt', 'createdAt'] },
                include: {
                    model: models_1.Campaign,
                    where: { id },
                    required: true,
                    attributes: [],
                },
            });
            res.json({ message: 'Success', data: { families, campaign_id: id } });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = getFamiliesForCampaign;

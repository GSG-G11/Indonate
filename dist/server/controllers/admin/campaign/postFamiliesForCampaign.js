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
const postFamiliesForCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id: campaignId }, } = req;
        const { body: { ids }, } = req;
        yield utils_1.paramsSchema.validateAsync(req.params);
        const isCampaignExist = yield models_1.Campaign.findByPk(campaignId, {
            raw: true,
        });
        if (!isCampaignExist)
            throw new utils_1.CustomError('Campaign does not exits', 400);
        else if (!isCampaignExist.is_available) {
            throw new utils_1.CustomError('Campaign was closed', 400);
        }
        const [currentDonations] = yield models_1.Donation.findAll({
            where: {
                campaignId,
            },
            raw: true,
            attributes: [
                [
                    models_1.sequelize.fn('SUM', models_1.sequelize.literal('COALESCE(food, 0)')),
                    'current_food',
                ],
                [
                    models_1.sequelize.fn('SUM', models_1.sequelize.literal('COALESCE(clothes, 0)')),
                    'current_clothes',
                ],
                [
                    models_1.sequelize.fn('SUM', models_1.sequelize.literal('COALESCE(money, 0)')),
                    'current_money',
                ],
            ],
        });
        const { current_food: food, current_money: money, current_clothes: clothes, } = currentDonations;
        if (!(food || money || clothes)) {
            throw new utils_1.CustomError('This campaign does not have donations', 400);
        }
        try {
            JSON.parse(ids);
            if (JSON.parse(ids).length === 0) {
                throw new utils_1.CustomError('You must add at least one family', 400);
            }
        }
        catch (error) {
            if (error.name === 'SyntaxError') {
                throw new utils_1.CustomError('ids must be array of numbers', 400);
            }
            throw new utils_1.CustomError(error.message, 400);
        }
        const { ids: familiesId } = yield utils_1.familiesForCampaignSchema.validateAsync({
            ids: JSON.parse(ids),
        }, { convert: true });
        yield Promise.all(familiesId.map((familyId) => __awaiter(void 0, void 0, void 0, function* () {
            const family = yield models_1.Family.findByPk(familyId, {
                raw: true,
            });
            if (!family)
                throw new utils_1.CustomError('Cannot add families', 400);
        })));
        yield Promise.all(familiesId.map((familyId) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Capon.create({
                campaignId,
                familyId,
                food: (food / ids.length).toFixed(),
                clothes: (clothes / ids.length).toFixed(),
                money: (money / ids.length).toFixed(),
            });
        })));
        yield models_1.Campaign.update({ is_available: false }, { where: { id: campaignId } });
        res.json({ message: 'Families added successfully' });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new utils_1.CustomError(error.message, 400));
        }
        next(error);
    }
});
exports.default = postFamiliesForCampaign;

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
const utils_1 = require("../../utils");
const models_1 = require("../../database/models");
const validation_1 = require("../../utils/validation");
const getCampaignById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield validation_1.paramsSchema.validateAsync(req.params);
        const [campaignInfo, current, numOfFamilies] = yield Promise.all([
            models_1.Campaign.findByPk(id, {
                attributes: [
                    'id',
                    'description',
                    'image_link',
                    'is_available',
                    'food_target',
                    'clothes_target',
                    'money_target',
                    'title',
                ],
                include: {
                    model: models_1.Category,
                    attributes: ['name', 'icon_url'],
                },
            }),
            models_1.Donation.findAll({
                where: {
                    campaignId: id,
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
                    [
                        models_1.sequelize.fn('SUM', models_1.sequelize.literal('COALESCE(food, 0) + COALESCE(clothes, 0) + COALESCE(money, 0)')),
                        'current',
                    ],
                ],
            }),
            models_1.Capon.findAll({
                where: {
                    campaignId: id,
                },
                raw: true,
            }),
        ]);
        if (!campaignInfo)
            throw new utils_1.CustomError('This campaign dose not exists', 400);
        res.json({
            message: 'Success',
            data: {
                campaignInfo,
                current: {
                    current: +current[0].current,
                    current_food: +current[0].current_food,
                    current_clothes: +current[0].current_clothes,
                    current_money: +current[0].current_money,
                },
                families: numOfFamilies.length,
            },
        });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new utils_1.CustomError(error.details[0].message, 400));
        }
        next(error);
    }
});
exports.default = getCampaignById;

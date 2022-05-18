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
const models_1 = require("../../database/models");
const utils_1 = require("../../utils");
const getCampaigns = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10 } = req.query;
        yield utils_1.querySchema.validateAsync(req.query);
        const { count, rows: campaigns } = yield models_1.Campaign.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            group: ['campaigns.id', 'category.id'],
            attributes: [
                'id',
                'title',
                'description',
                'food_target',
                'clothes_target',
                'money_target',
                'image_link',
                'is_available',
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
            include: [
                {
                    model: models_1.Donation,
                    required: false,
                    duplicating: false,
                    attributes: [],
                    as: 'donations',
                },
                {
                    model: models_1.Category,
                    required: false,
                    duplicating: false,
                    attributes: ['name'],
                },
            ],
            order: [
                ['is_available', 'DESC'],
                ['updatedAt', 'DESC'],
            ],
        });
        res.json({ message: 'Success', data: { campaigns, count: count.length } });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new utils_1.CustomError(error.message, 401));
        }
        next(error);
    }
});
exports.default = getCampaigns;

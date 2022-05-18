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
const getDonors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 6 } = yield utils_1.querySchema.validateAsync(req.query);
        const { rows: donors, count } = yield models_1.Donor.findAndCountAll({
            offset: (+page - 1) * +limit,
            limit: +limit,
            include: [{
                    model: models_1.Donation,
                    required: false,
                    duplicating: false,
                    attributes: [],
                }],
            attributes: [
                'id',
                'name',
                'email',
                'address',
                'phone',
                [models_1.sequelize.fn('SUM', models_1.sequelize.col('donations.food')), 'totalFood'],
                [models_1.sequelize.fn('SUM', models_1.sequelize.col('donations.money')), 'totalMoney'],
                [models_1.sequelize.fn('SUM', models_1.sequelize.col('donations.clothes')), 'totalClothes']
            ],
            group: ['donors.id'],
            order: [['id', 'DESC']],
        });
        res.json({ message: 'Success', data: { donors, count: count.length } });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new utils_1.CustomError(error.message, 400));
        }
        next(error);
    }
});
exports.default = getDonors;

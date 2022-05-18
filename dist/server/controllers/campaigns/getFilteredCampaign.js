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
const sequelize_1 = require("sequelize");
const models_1 = require("../../database/models");
const utils_1 = require("../../utils");
const getFilteredCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, available, category, page = 1, limit = 6, } = req.query;
        yield utils_1.querySchema.validateAsync(req.query);
        const { count, rows: campaignesData } = yield models_1.Campaign.findAndCountAll({
            offset: (page - 1) * limit,
            limit,
            attributes: ['id', 'title', 'description', 'image_link', 'is_available', 'categoryId'],
            where: {
                [sequelize_1.Op.and]: [available && { is_available: available }, search && {
                        title: models_1.sequelize.where(models_1.sequelize.fn('LOWER', models_1.sequelize.col('title')), { [sequelize_1.Op.like]: `%${search.toLowerCase()}%` }),
                    }],
            },
            order: [
                ['id', 'DESC'],
            ],
            include: {
                model: models_1.Category,
                attributes: ['name', 'icon_url'],
                where: category && { name: models_1.sequelize.where(models_1.sequelize.fn('LOWER', models_1.sequelize.col('name')), { [sequelize_1.Op.like]: `%${category.toLowerCase()}%` }) },
            },
        });
        res.json({ message: 'Success', data: { campaigns: campaignesData, count } });
    }
    catch (e) {
        if (e.name === 'ValidationError') {
            next(new utils_1.CustomError(e.message, 400));
        }
        next(e);
    }
});
exports.default = getFilteredCampaign;

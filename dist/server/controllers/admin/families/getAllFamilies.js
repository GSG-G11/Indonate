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
const getAllFamilies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1 } = yield utils_1.querySchema.validateAsync(req.query);
        const { rows, count } = yield models_1.Family.findAndCountAll({
            limit: 5,
            offset: (+page - 1) * 5,
            include: [{
                    duplicating: false,
                    model: models_1.Capon,
                    attributes: [],
                },
            ],
            attributes: ['id', 'name', 'phone', 'address',
                [models_1.sequelize.fn('sum', models_1.sequelize.col('capons.clothes')), 'clothes'],
                [models_1.sequelize.fn('sum', models_1.sequelize.col('capons.money')), 'money'],
                [models_1.sequelize.fn('sum', models_1.sequelize.col('capons.food')), 'food'],
            ],
            group: ['families.id'],
            order: [
                ['id', 'DESC'],
                ['name', 'ASC'],
            ],
        });
        res.json({ message: 'Success', data: { families: rows, count: count.length } });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new utils_1.CustomError(error.message, 401));
        }
        next(error);
    }
});
exports.default = getAllFamilies;

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
const statistics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [families, doners, donations] = yield Promise.all([
            models_1.Family.count(), models_1.Donor.count(),
            models_1.Donation.findAll({
                attributes: [[models_1.sequelize.fn('SUM', models_1.sequelize.col('money')), 'money'],
                    [models_1.sequelize.fn('SUM', models_1.sequelize.col('food')), 'food'],
                    [models_1.sequelize.fn('SUM', models_1.sequelize.col('clothes')), 'clothes']],
            }),
        ]);
        res.json({ message: 'Success', data: { families, doners, donations } });
    }
    catch (error) {
        next(error);
    }
});
exports.default = statistics;

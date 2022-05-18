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
const getCampaignsForDonor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield utils_1.paramsSchema.validateAsync(req.params);
        const campaigns = yield models_1.Donor.findByPk(id, {
            include: {
                model: models_1.Campaign,
                attributes: ['title', 'id'],
                through: {
                    attributes: [],
                },
            },
            attributes: [],
        });
        if (!campaigns)
            throw new utils_1.CustomError('There is no donor', 400);
        res.json({ message: 'Success', data: campaigns });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new utils_1.CustomError(error.message, 400));
        }
        next(error);
    }
});
exports.default = getCampaignsForDonor;

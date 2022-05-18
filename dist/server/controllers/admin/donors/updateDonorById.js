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
const updateDonorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield utils_1.paramsSchema.validateAsync(req.params);
        const updateData = yield utils_1.donorSchema.validateAsync(req.body);
        const response = yield models_1.Donor.update(updateData, {
            where: { id },
        });
        if (!response[0]) {
            throw new utils_1.CustomError('Update donor failed', 400);
        }
        res.json({ message: 'Donor updated successfully' });
    }
    catch (error) {
        if (error.name === 'ValidationError')
            next(new utils_1.CustomError(error.details[0].message, 400));
        next(error);
    }
});
exports.default = updateDonorById;

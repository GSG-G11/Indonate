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
const editFamily = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield utils_1.paramsSchema.validateAsync(req.params);
        const checkPhone = yield models_1.Family.findOne({
            where: { phone: req.body.phone },
        });
        if (checkPhone && checkPhone.id !== id)
            throw new utils_1.CustomError('Phone is used', 400);
        const data = yield utils_1.familySchema.validateAsync(req.body);
        const updatedData = yield models_1.Family.update(data, { where: { id } });
        if (updatedData[0] === 0)
            throw new utils_1.CustomError('updated Failed', 400);
        res.json({ message: 'updated successfully', data });
    }
    catch (error) {
        if (error.name === 'ValidationError')
            next(new utils_1.CustomError(error.details[0].message, 400));
        next(error);
    }
});
exports.default = editFamily;

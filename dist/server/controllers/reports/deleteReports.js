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
const deleteReports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield utils_1.paramsSchema.validateAsync(req.params);
        const result = yield models_1.Report.destroy({
            where: {
                id,
            },
        });
        if (!result)
            throw new utils_1.CustomError('The report does not exist', 400);
        res.json({ message: 'Report deleted successfuly' });
    }
    catch (error) {
        if (error.name)
            next(new utils_1.CustomError(error.message, 400));
        next(error);
    }
});
exports.default = deleteReports;

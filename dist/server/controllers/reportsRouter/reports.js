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
const reports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield utils_1.reportsSchema.validateAsync(req.body);
        yield models_1.Contact.create(result);
        res.status(201).json({ message: 'Report sent successfully' });
    }
    catch (error) {
        if (error.name === 'ValidationError')
            next(new utils_1.CustomedError(error.details[0].message, 400));
        next(error);
    }
});
exports.default = reports;

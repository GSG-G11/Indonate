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
const bcryptjs_1 = require("bcryptjs");
const utils_1 = require("../../utils");
const models_1 = require("../../database/models");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        yield utils_1.loginSchema.validateAsync({ email, password });
        const user = yield models_1.Donor.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            throw new utils_1.CustomError("Email doesn't exists, Try another one or sign up", 400);
        }
        const isPasswordValidate = yield (0, bcryptjs_1.compare)(password, user === null || user === void 0 ? void 0 : user.getDataValue('password'));
        if (!isPasswordValidate) {
            throw new utils_1.CustomError('Incorrect password, please try again', 400);
        }
        const payload = {
            id: user === null || user === void 0 ? void 0 : user.getDataValue('id'),
            name: user === null || user === void 0 ? void 0 : user.getDataValue('name'),
            isAdmin: user === null || user === void 0 ? void 0 : user.getDataValue('is_admin'),
        };
        const token = yield (0, utils_1.signToken)(payload);
        res
            .cookie('ACCESS_TOKEN', token, {
            maxAge: 604800000,
            httpOnly: true,
        })
            .json({ message: 'Successfully logged in', data: payload });
    }
    catch (error) {
        if (error.name === 'ValidationError')
            next(new utils_1.CustomError(error.details[0].message, 400));
        else
            next(error);
    }
});
exports.default = login;

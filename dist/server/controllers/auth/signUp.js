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
const sequelize_1 = require("sequelize");
const utils_1 = require("../../utils");
const models_1 = require("../../database/models");
require('env2')('.env');
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = yield utils_1.signUpSchema.validateAsync(req.body);
        const { name, email, password, phone, address, } = validationResult;
        const check = yield models_1.Donor.findOne({
            where: {
                [sequelize_1.Op.or]: [
                    { email },
                    { phone },
                ],
            },
        });
        if ((check === null || check === void 0 ? void 0 : check.email) === email) {
            throw new utils_1.CustomedError('Email is used try another one', 400);
        }
        else if ((check === null || check === void 0 ? void 0 : check.phone) === phone) {
            throw new utils_1.CustomedError('phone is used try another one', 400);
        }
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
        const donor = yield models_1.Donor.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        });
        const payload = {
            id: donor === null || donor === void 0 ? void 0 : donor.getDataValue('id'),
            name: donor === null || donor === void 0 ? void 0 : donor.getDataValue('name'),
            isAdmin: donor === null || donor === void 0 ? void 0 : donor.getDataValue('is_admin'),
        };
        const token = yield (0, utils_1.signToken)(payload);
        res.status(201).cookie('ACCESS_TOKEN', token, {
            maxAge: 900000,
            httpOnly: true,
        }).json({
            message: 'Sign up successfully',
            data: payload,
        });
    }
    catch (error) {
        if (error.name === 'ValidationError')
            next(new utils_1.CustomedError(error.details[0].message, 400));
        next(error);
    }
});
exports.default = signUp;

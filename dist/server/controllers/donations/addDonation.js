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
const validation_1 = require("../../utils/validation");
const addDonation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: { id: donorId }, } = req;
        const { params: { campaignId }, } = req;
        const { body: { food, clothes, money, description, location, deliver_time: deliverTime, }, } = req;
        yield validation_1.paramsSchema.validateAsync({ id: campaignId });
        const campaign = yield models_1.Campaign.findByPk(campaignId, {
            raw: true,
        });
        if (!campaign) {
            throw new utils_1.CustomError('Cannot add donation, campaign not exists', 400);
        }
        yield validation_1.donationSchema.validateAsync(req.body);
        if (!food && !clothes && !money) {
            next(new utils_1.CustomError('You should enter money, piece of clothes, number of meals', 400));
        }
        yield models_1.Donation.create({
            campaignId,
            donorId,
            food,
            clothes,
            money,
            description,
            location,
            deliver_time: deliverTime,
        });
        res.status(201).json({ message: 'Donation added successfully' });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new utils_1.CustomError(error.details[0].message, 400));
        }
        else {
            next(error);
        }
    }
});
exports.default = addDonation;

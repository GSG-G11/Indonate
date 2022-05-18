"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const user_1 = __importDefault(require("../middlewares/auth/user"));
const donationRouter = (0, express_1.Router)();
donationRouter.post('/donation/:campaignId', user_1.default, controllers_1.addDonation);
exports.default = donationRouter;

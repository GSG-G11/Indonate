"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const adminDonors = (0, express_1.Router)();
adminDonors.get('/campaign/:id/donors', middlewares_1.authUser, middlewares_1.authAdmin, controllers_1.getDonorsByCampaignId);
exports.default = adminDonors;

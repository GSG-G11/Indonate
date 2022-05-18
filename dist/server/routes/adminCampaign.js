"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const adminCampaignRouter = (0, express_1.Router)();
adminCampaignRouter.post('/campaign/:id/families', middlewares_1.authUser, middlewares_1.authAdmin, controllers_1.postFamiliesForCampaign);
adminCampaignRouter.patch('/campaign/:id', middlewares_1.authUser, middlewares_1.authAdmin, controllers_1.updateCampaign);
exports.default = adminCampaignRouter;

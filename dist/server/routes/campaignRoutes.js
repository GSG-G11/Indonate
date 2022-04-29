"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const campaignRouter = (0, express_1.Router)();
campaignRouter.route('/campaign/:id').get(controllers_1.getCampaignById);
campaignRouter.get('/statistics', controllers_1.statistics);
exports.default = campaignRouter;

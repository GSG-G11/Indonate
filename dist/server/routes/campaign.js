"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const admin_1 = require("../controllers/admin");
const getCampaigns_1 = __importDefault(require("../controllers/campaigns/getCampaigns"));
const middlewares_1 = require("../middlewares");
const campaignRouter = (0, express_1.Router)();
campaignRouter.post('/admin/campaigns', middlewares_1.authUser, middlewares_1.authAdmin, admin_1.createCampaign);
campaignRouter.get('/admin/campaigns', middlewares_1.authUser, middlewares_1.authAdmin, getCampaigns_1.default);
campaignRouter.get('/campaigns', controllers_1.getFilteredCampaign);
campaignRouter.route('/campaign/:id').get(controllers_1.getCampaignById);
campaignRouter.delete('/admin/campaigns/:id', middlewares_1.authUser, middlewares_1.authAdmin, admin_1.deleteCampaign);
campaignRouter.get('/statistics', controllers_1.getStatistics);
exports.default = campaignRouter;

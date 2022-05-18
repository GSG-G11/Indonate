"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCampaginsforFamily_1 = __importDefault(require("../controllers/admin/families/getCampaginsforFamily"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const admin_1 = require("../controllers/admin");
const familyRouter = (0, express_1.Router)();
familyRouter.get('/families', middlewares_1.authUser, middlewares_1.authAdmin, controllers_1.getAllFamilies);
familyRouter.post('/family', middlewares_1.authUser, middlewares_1.authAdmin, controllers_1.addFamily);
familyRouter.delete('/family/:id', middlewares_1.authUser, middlewares_1.authAdmin, controllers_1.deleteFamilyById);
familyRouter.get('/family/:id/campaigns', middlewares_1.authUser, middlewares_1.authAdmin, getCampaginsforFamily_1.default);
familyRouter.get('/campaign/:id/families', middlewares_1.authUser, middlewares_1.authAdmin, admin_1.getFamiliesForCampaign);
exports.default = familyRouter;

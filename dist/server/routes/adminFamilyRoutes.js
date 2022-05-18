"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const adminFamilyRouter = (0, express_1.Router)();
adminFamilyRouter.patch('/family/:id', middlewares_1.authUser, middlewares_1.authAdmin, controllers_1.editFamily);
exports.default = adminFamilyRouter;

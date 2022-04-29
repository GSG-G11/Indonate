"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const reportsRouter = (0, express_1.Router)();
reportsRouter.route('/reports').post(controllers_1.reports);
exports.default = reportsRouter;

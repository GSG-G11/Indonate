"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/categories', controllers_1.getAllCategories);
exports.default = categoryRouter;

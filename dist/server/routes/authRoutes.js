"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', controllers_1.login);
authRouter.post('/logout', controllers_1.logout);
authRouter.post('/signUp', controllers_1.signUp);
exports.default = authRouter;

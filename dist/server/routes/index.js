"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const router = express_1.default.Router();
router.use(authRoutes_1.default);
router.get('/login', middlewares_1.authUser, (req, res) => {
    res.send('Login');
});
exports.default = router;

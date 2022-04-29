"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const campaignRoutes_1 = __importDefault(require("./campaignRoutes"));
const reportsRoutes_1 = __importDefault(require("./reportsRoutes"));
const donationRoutes_1 = __importDefault(require("./donationRoutes"));
const router = express_1.default.Router();
router.use(donationRoutes_1.default);
router.use(authRoutes_1.default);
router.use(categoryRoutes_1.default);
router.use(campaignRoutes_1.default);
router.use(reportsRoutes_1.default);
exports.default = router;

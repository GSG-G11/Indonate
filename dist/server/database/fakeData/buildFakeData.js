"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const campaignModule = __importStar(require("./campaigns.json"));
const connection_1 = __importDefault(require("../config/connection"));
const caponModule = __importStar(require("./capons.json"));
const familyModule = __importStar(require("./families.json"));
const reportModule = __importStar(require("./reports.json"));
const donorModule = __importStar(require("./donors.json"));
const donationModule = __importStar(require("./donations.json"));
const categoryModule = __importStar(require("./categories.json"));
const models_1 = require("../models");
const { campaigns } = campaignModule;
const { capons } = caponModule;
const { families } = familyModule;
const { categories } = categoryModule;
const { messages } = reportModule;
const { donors } = donorModule;
const { donations } = donationModule;
const buildFakeData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.sync({ force: true });
    yield Promise.all([
        categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Category.create(category);
        })),
        messages.map((message) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Report.create(message);
        })),
        families.map((family) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Family.create(family);
        })),
        donors.map((donor) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Donor.create(donor);
        })),
    ]);
    yield Promise.all(campaigns.map((campaign) => models_1.Campaign.create(campaign)));
    yield Promise.all([
        capons.map((capon) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Capon.create(capon);
        })),
        donations.map((donation) => __awaiter(void 0, void 0, void 0, function* () {
            yield models_1.Donation.create(donation);
        })),
    ]);
});
if (process.env.NODE_ENV !== 'test') {
    buildFakeData();
}
exports.default = buildFakeData;

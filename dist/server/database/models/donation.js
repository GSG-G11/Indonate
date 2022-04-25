"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
const Donation = connection_1.default.define('donations', {
    food: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    clothes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    money: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
});
exports.default = Donation;

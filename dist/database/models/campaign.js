"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
const Campaign = connection_1.default.define('campaigns', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    target: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    image_link: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
});
exports.default = Campaign;

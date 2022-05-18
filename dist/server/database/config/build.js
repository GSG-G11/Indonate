"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const build = () => {
    index_1.sequelize.sync({ force: true });
};
if (process.env.NODE_ENV === 'dev') {
    build();
}
exports.default = build;

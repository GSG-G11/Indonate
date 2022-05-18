"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkUser = (req, res) => {
    const { user } = req;
    res.json({ data: user });
};
exports.default = checkUser;

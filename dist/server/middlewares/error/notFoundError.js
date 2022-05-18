"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundError = (req, res) => {
    res.status(404).json({ message: 'Page Not Found ' });
};
exports.default = notFoundError;

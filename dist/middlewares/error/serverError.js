"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-unused-vars
const serverError = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.default = serverError;

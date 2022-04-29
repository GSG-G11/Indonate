"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { verify } = require('jsonwebtoken');
const verifyToken = (token) => new Promise((resolve, reject) => {
    verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            reject(err);
        }
        else {
            resolve(decoded);
        }
    });
});
exports.default = verifyToken;

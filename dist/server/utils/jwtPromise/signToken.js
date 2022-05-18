"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const signToken = (payload) => new Promise((resolve, reject) => {
    (0, jsonwebtoken_1.sign)(payload, process.env.SECRET, {
        expiresIn: '30d',
        algorithm: 'HS256',
    }, (err, encoded) => {
        if (err)
            reject(err);
        else
            resolve(encoded);
    });
});
exports.default = signToken;

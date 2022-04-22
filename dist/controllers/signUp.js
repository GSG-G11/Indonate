"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signUp = (req, res) => {
    console.log(req.body);
    res.status(200).json({
        data: [{
                id: 0,
                name: 'farah',
                isAdmin: false,
            }],
        message: 'successful sign',
    });
};
exports.default = signUp;

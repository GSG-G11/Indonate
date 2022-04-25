"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Explanation: This file just for configure Typescript tests and transform it to Commonjs code
const config = {
    verbose: true,
    transform: {
        '^.+\\.(ts)?$': 'ts-jest',
    },
};
exports.default = config;

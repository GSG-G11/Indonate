"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomedError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
exports.default = CustomedError;

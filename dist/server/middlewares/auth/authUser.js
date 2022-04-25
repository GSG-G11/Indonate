"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
// export interface IGetUserAuthInfoRequest extends Request {
//   user:unknown
// }
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ACCESS_TOKEN } = req.cookies;
        if (!ACCESS_TOKEN) {
            throw (new utils_1.CustomedError('Unauthorized', 401));
        }
        else {
            const userToken = yield (0, utils_1.verifyToken)(ACCESS_TOKEN);
            const user = userToken;
            req.user = user;
            next();
        }
    }
    catch (e) {
        console.log(e);
        /// throw new CustomedError('Unauthorized', 401);
        next(e);
    }
});
exports.default = authUser;

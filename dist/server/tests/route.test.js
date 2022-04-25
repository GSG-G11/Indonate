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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
const supertest_1 = __importDefault(require("supertest"));
const connection_1 = __importDefault(require("../database/config/connection"));
const app_1 = __importDefault(require("../app"));
const buildFakeData_1 = __importDefault(require("../database/fakeData/buildFakeData"));
beforeAll(() => (0, buildFakeData_1.default)());
describe('POST/login', () => {
    test('User with admin role', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            email: 'admin@gmail.com',
            password: '123456789',
        })
            .expect(200);
        expect(response.body.data.isAdmin).toEqual(true);
        expect(response.body.data.name).toEqual('admin');
        expect(response.body.data.hasOwnProperty('id')).toEqual(true);
        expect(response.body.message).toBe('Successfully logged in');
        expect(response.headers['set-cookie'][0].startsWith('ACCESS_TOKEN')).toEqual(true);
    }));
    test('User without admin role (Normal User)', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            email: 'hosam@gmail.com',
            password: '123456789',
        })
            .expect(200);
        expect(response.body.data.hasOwnProperty('id')).toEqual(true);
        expect(response.body.data.isAdmin).toEqual(false);
        expect(response.body.message).toBe('Successfully logged in');
        expect(response.headers['set-cookie'][0].startsWith('ACCESS_TOKEN')).toEqual(true);
    }));
    test('User with not valid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            email: 'hosam@gmail.co',
            password: '12345678',
        })
            .expect(400);
        expect(response.body.message).toBe('"email" must be a valid email');
        expect(response.headers['set-cookie']).toEqual(undefined);
    }));
    test('User with not valid password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            email: 'hosam@gmail.com',
            password: '12',
        })
            .expect(400);
        expect(response.body.message).toBe('"password" length must be at least 3 characters long');
    }));
    test('Required email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            password: '123456789',
        })
            .expect(400);
        expect(response.body.message).toBe('"email" is required');
    }));
    test('Required password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            email: 'hosam@gmail.com',
        })
            .expect(400);
        expect(response.body.message).toBe('"password" is required');
    }));
    test('User with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            email: 'hosam@gmail.com',
            password: '123456',
        })
            .expect(400);
        expect(response.body.message).toBe('Incorrect password, please try again');
    }));
    test('User with incorrect email', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/login')
            .send({
            email: 'hosa@gmail.com',
            password: '123456789',
        })
            .expect(400);
        expect(response.body.message).toBe("Email doesn't exists, Try another one or sign up");
    }));
});
afterAll(() => {
    connection_1.default.close();
});

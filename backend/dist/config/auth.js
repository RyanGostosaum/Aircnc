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
const jwt = require("jsonwebtoken");
const configs_1 = require("../config/configs");
class Auth {
    constructor() { }
    validate(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, configs_1.appConfig.secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Auth error' });
                }
                else {
                    console.log('OK');
                    next();
                }
            });
        }
        else {
            console.log('403');
            return res.status(403).send({
                success: false,
                message: '403 - Forbidden'
            });
        }
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = yield jwt.sign({ data }, configs_1.appConfig.secret, { expiresIn: '100h' });
            return token;
        });
    }
}
exports.default = new Auth;

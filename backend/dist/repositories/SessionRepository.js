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
const mongoose = require("mongoose");
const SessionSchema_1 = require("../schemas/SessionSchema");
const bcrypt = require("bcryptjs");
const auth_1 = require("../config/auth");
class SessionRepository {
    constructor() {
        this.model = mongoose.model('Session', SessionSchema_1.default);
    }
    getAll() {
        return this.model.find({});
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[SESSION CONTROLLER]: creating session');
            let { email, password } = user;
            const userExist = yield this.model.findOne({ 'email': email });
            if (userExist === null) {
                let hash = yield bcrypt.hash(password, 8);
                user.password = hash;
                return this.model.create(user);
            }
            else {
                return { message: 'Email is already in use', success: false };
            }
        });
    }
    delete(_id) {
        return this.model.findByIdAndRemove(_id);
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = user;
            let userResponse = yield this.model.findOne({ 'email': email });
            if (userResponse !== null) {
                let passwordCheck = yield bcrypt.compare(password, userResponse.password);
                if (passwordCheck === true) {
                    let token = yield auth_1.default.create(userResponse);
                    return { user: userResponse, token };
                }
                else {
                    return { message: "Incorrect password", success: false };
                }
            }
            else {
                return { message: "User not found", success: false };
            }
        });
    }
}
exports.default = new SessionRepository;

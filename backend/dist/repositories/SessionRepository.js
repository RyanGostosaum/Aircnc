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
            const { email } = user;
            let userExists = yield this.model.findOne({ 'email': email });
            if (!userExists) {
                return this.model.create(user);
            }
        });
    }
    delete(_id) {
        return this.model.findByIdAndRemove(_id);
    }
}
exports.default = new SessionRepository;

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
const SpotSchema_1 = require("../schemas/SpotSchema");
class DashboardRepository {
    constructor() {
        this.model = mongoose.model('Spot', SpotSchema_1.default);
    }
    show(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = user;
            const response = yield this.model.find({ user: user_id });
            return response;
        });
    }
}
exports.default = new DashboardRepository;

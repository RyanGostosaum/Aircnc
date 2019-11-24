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
const SessionSchema_1 = require("../schemas/SessionSchema");
class SpotRepository {
    constructor() {
        this.model = mongoose.model('Spot', SpotSchema_1.default);
        this.session = mongoose.model('Session', SessionSchema_1.default);
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('[SPOT CONTROLLER]: creating spot');
            const { price, techs, company } = req.body;
            const { filename } = req.file;
            const { user_id } = req.headers;
            const user = yield this.session.findById(user_id);
            if (!user) {
                return 'user not found';
            }
            const spot = yield this.model.create({
                user: user_id,
                thumbnail: filename,
                company,
                price,
                techs: techs.split(',').map(tech => tech.trim())
            });
            return spot;
        });
    }
    update(_id, spot) {
        const updateUser = Object.assign({}, spot);
        return this.model.findByIdAndUpdate(_id, updateUser, { new: true });
    }
    delete(_id) {
        return this.model.findByIdAndRemove(_id);
    }
    all(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tech } = query;
            const spots = yield this.model.find({});
            return spots;
        });
    }
}
exports.default = new SpotRepository;

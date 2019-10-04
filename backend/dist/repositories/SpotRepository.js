"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SpotSchema_1 = require("../schemas/SpotSchema");
class SpotRepository {
    constructor() {
        this.model = mongoose.model('', SpotSchema_1.default);
    }
    getAll() {
        return this.model.find({});
    }
    getById(_id) {
        return this.model.findById(_id);
    }
    create(spot) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create(spot);
        });
    }
    update(_id, spot) {
        const updateUser = Object.assign({}, spot);
        return this.model.findByIdAndUpdate(_id, updateUser, { new: true });
    }
    delete(_id) {
        return this.model.findByIdAndRemove(_id);
    }
}
exports.default = new SpotRepository;

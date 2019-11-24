"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
});
SpotSchema.virtual('thumbnail_url').get(function () {
    return `http://192.168.0.106:8080/files/${this.thumbnail}`;
});
exports.default = SpotSchema;

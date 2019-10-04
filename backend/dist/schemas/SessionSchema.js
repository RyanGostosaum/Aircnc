"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SessionSchema = new mongoose.Schema({
    email: String
});
exports.default = SessionSchema;

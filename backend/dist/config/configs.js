"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: path_1.resolve(__dirname, "../../.env") });
exports.appConfig = {
    secret: process.env.JWT_SECRET,
    port: process.env.PORT,
    db: process.env.DB
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SpotRepository_1 = require("../repositories/SpotRepository");
const httpStatus = require("http-status");
const sendReponse = function (res, statusCode, data) {
    res.status(statusCode).json({ 'result': data });
};
class SpotController {
    constructor() { }
    create(req, res) {
        SpotRepository_1.default
            .create(req)
            .then(menus => sendReponse(res, httpStatus.OK, menus))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
    index(req, res) {
        SpotRepository_1.default.all(req.query)
            .then(menus => sendReponse(res, httpStatus.OK, menus))
            .catch(err => console.error.bind(console, `Error: ${err}`));
    }
}
exports.default = new SpotController();

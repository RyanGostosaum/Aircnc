"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardRepository_1 = require("../repositories/DashboardRepository");
const httpStatus = require("http-status");
const sendReponse = function (res, statusCode, data) {
    res.status(statusCode).json(data);
};
class DashboardController {
    constructor() { }
    get(req, res) {
        DashboardRepository_1.default
            .show(req.headers)
            .then(response => sendReponse(res, httpStatus.OK, response))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
}
exports.default = new DashboardController();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SessionRepository_1 = require("../repositories/SessionRepository");
const httpStatus = require("http-status");
const sendReponse = function (res, statusCode, data) {
    res.status(statusCode).json(data);
};
class SessionController {
    constructor() { }
    get(req, res) {
        SessionRepository_1.default
            .getAll()
            .then(user => sendReponse(res, httpStatus.OK, user))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
    create(req, res) {
        SessionRepository_1.default
            .create(req.body)
            .then(menus => sendReponse(res, httpStatus.OK, menus))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
    delete(req, res) {
        if (!req.params.id) {
            return sendReponse(res, httpStatus.NOT_FOUND, 'User not found!');
        }
        SessionRepository_1.default
            .delete(req.params.id)
            .then(user => sendReponse(res, httpStatus.OK, `User  ${user.name} deleted with success!`))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
    login(req, res) {
        SessionRepository_1.default
            .login(req.body)
            .then(menus => sendReponse(res, httpStatus.OK, menus))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }
}
exports.default = new SessionController();

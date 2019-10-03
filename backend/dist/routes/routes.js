"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../config/auth");
const userController_1 = require("../controllers/userController");
class Routes {
    routes(app) {
        app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' });
        });
        app.route("/api/v1/users")
            .get(auth_1.default.validate, userController_1.default.get)
            .post(auth_1.default.validate, userController_1.default.create);
        app.route("/api/v1/users/:id").get(auth_1.default.validate, userController_1.default.getById);
        app.route("/api/v1/users/:id").put(auth_1.default.validate, userController_1.default.update);
        app.route("/api/v1/users/:id").delete(auth_1.default.validate, userController_1.default.delete);
    }
}
exports.Routes = Routes;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../config/auth");
const SessionController_1 = require("../controllers/SessionController");
const SpotController_1 = require("../controllers/SpotController");
const uploads_1 = require("../config/uploads");
class Routes {
    routes(app) {
        app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' });
        });
        app.route("/sessions")
            .get(auth_1.default.validate, SessionController_1.default.get)
            .post(SessionController_1.default.create);
        app.route("/api/v1/session/:id").get(auth_1.default.validate, SessionController_1.default.getById);
        app.route("/api/v1/session/:id").put(auth_1.default.validate, SessionController_1.default.update);
        app.route("/api/v1/session/:id").delete(auth_1.default.validate, SessionController_1.default.delete);
        app.post("/api/v1/spots", uploads_1.default.single('thumbnail'), SpotController_1.default.create);
    }
}
exports.Routes = Routes;

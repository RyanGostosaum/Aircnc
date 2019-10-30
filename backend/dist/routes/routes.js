"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../config/auth");
const SessionController_1 = require("../controllers/SessionController");
const SpotController_1 = require("../controllers/SpotController");
const DashboardController_1 = require("../controllers/DashboardController");
const uploads_1 = require("../config/uploads");
class Routes {
    routes(app) {
        app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' });
        });
        app.route("/sessions")
            .get(auth_1.default.validate, SessionController_1.default.get)
            .post(SessionController_1.default.create);
        app.get("/dashboard", DashboardController_1.default.get);
        app.post("/spots", uploads_1.default.single('thumbnail'), SpotController_1.default.create);
        app.get("/spots", SpotController_1.default.index);
    }
}
exports.Routes = Routes;

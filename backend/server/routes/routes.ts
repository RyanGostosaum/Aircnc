import * as express from "express";

import Auth from '../config/auth';
import SessionController from '../controllers/SessionController';
import SpotController from '../controllers/SpotController'
import DashboardController from '../controllers/DashboardController'
import uploads from '../config/uploads'

export class Routes {
    private router: express.Router;

    public routes(app): void {

        app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' })
        });
        app.route("/sessions")
            .get(Auth.validate, SessionController.get)
            .post(SessionController.create);

        app.get("/dashboard", DashboardController.get)
        app.post("/spots", uploads.single('thumbnail'), SpotController.create)
        app.get("/spots", SpotController.index)
    }
}

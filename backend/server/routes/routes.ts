import * as express from "express";

import Auth from '../config/auth';
import SessionController from '../controllers/SessionController';
import SpotController from '../controllers/SpotController'
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

        app.route("/api/v1/session/:id").get(Auth.validate, SessionController.getById);
        app.route("/api/v1/session/:id").put(Auth.validate, SessionController.update);
        app.route("/api/v1/session/:id").delete(Auth.validate, SessionController.delete);

        app.post("/api/v1/spots", uploads.single('thumbnail'), SpotController.create)
    }
}

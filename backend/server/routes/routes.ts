import * as express from "express";

import Auth from '../config/auth';
import UserController from '../controllers/userController';


export class Routes {
    private router: express.Router;

    public routes(app): void {
        app.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' })
        });

        app.route("/api/v1/users")
            .get(Auth.validate, UserController.get)
            .post(Auth.validate, UserController.create);

        app.route("/api/v1/users/:id").get(Auth.validate, UserController.getById);
        app.route("/api/v1/users/:id").put(Auth.validate, UserController.update);
        app.route("/api/v1/users/:id").delete(Auth.validate, UserController.delete);
    }
}

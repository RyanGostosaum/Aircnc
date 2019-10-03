"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db_1 = require("./config/db");
const cors = require("cors");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.enableCors();
        this.middleware();
        this.database = new db_1.default();
        this.dataBaseConnection();
        this.routes.routes(this.app);
    }
    enableCors() {
        const options = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };
        this.app.use(cors(options));
    }
    dataBaseConnection() {
        this.database.createConnection();
    }
    closedataBaseConnection(message, callback) {
        this.database.closeConnection(message, () => callback());
    }
    middleware() {
        this.app.use(morgan("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App();

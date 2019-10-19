"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const db_1 = require("./config/db");
const cors = require("cors");
const path_1 = require("path");
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
        this.app.use(express.json());
        this.app.use("/files", express.static(path_1.resolve(__dirname, '..', 'uploads')));
    }
}
exports.default = new App();

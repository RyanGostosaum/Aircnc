import * as express from "express";
import * as morgan from "morgan";
import DataBase from './config/db';
import * as cors from "cors";
import { resolve } from "path"
import { createServer, Server } from 'http';

import { Routes } from "./routes/routes";

class App {
  public app: express.Application;
  private morgan: morgan.Morgan;
  private database: DataBase;
  private server: Server
  public routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.enableCors();
    this.middleware();
    this.database = new DataBase();
    this.dataBaseConnection();
    this.routes.routes(this.app)
  }

  enableCors() {
    const options: cors.CorsOptions = {
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
    this.app.use("/files", express.static(resolve(__dirname, '..', 'uploads')))
  }
}
export default new App();

import App from "./app";

import { appConfig } from './config/configs'

import * as socketio from "socket.io";
import { Server } from 'http'

let connectedUsers = {}

let http = new Server(App.app);

let io = socketio(http);

App.app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
})

http.listen(appConfig.port, () => {
  console.log(`server running in" + ${appConfig.port}`);
});

process.once('SIGUSR2', () => App.closedataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.once('SIGINT', () => App.closedataBaseConnection('connection crashed', () => process.exit(0)));

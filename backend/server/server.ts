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

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  console.log('[SOCKET CONTROLLER]: a user is connected:', user_id);
  connectedUsers[user_id] = socket.id;
});

http.listen(appConfig.port, () => {
  console.log(`server running in" + ${appConfig.port}`);
});

process.once('SIGUSR2', () => App.closedataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.once('SIGINT', () => App.closedataBaseConnection('connection crashed', () => process.exit(0)));

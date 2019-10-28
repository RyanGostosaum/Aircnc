"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const configs_1 = require("./config/configs");
const socketio = require("socket.io");
const http_1 = require("http");
let connectedUsers = {};
let http = new http_1.Server(app_1.default.app);
let io = socketio(http);
app_1.default.app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    console.log('[SOCKET CONTROLLER]: a user is connected:', user_id);
    connectedUsers[user_id] = socket.id;
});
http.listen(configs_1.appConfig.port, () => {
    console.log(`server running in" + ${configs_1.appConfig.port}`);
});
process.once('SIGUSR2', () => app_1.default.closedataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.once('SIGINT', () => app_1.default.closedataBaseConnection('connection crashed', () => process.exit(0)));

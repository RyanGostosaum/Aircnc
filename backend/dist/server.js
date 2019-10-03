"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const configs_1 = require("./config/configs");
app_1.default.app.listen(configs_1.appConfig.port, () => {
    console.log(`server running in" + ${configs_1.appConfig.port}`);
});
process.once('SIGUSR2', () => app_1.default.closedataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.once('SIGINT', () => app_1.default.closedataBaseConnection('connection crashed', () => process.exit(0)));

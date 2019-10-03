import App from "./app";

import { appConfig } from './config/configs'

App.app.listen(appConfig.port, () => {
  console.log(`server running in" + ${appConfig.port}`);
});

process.once('SIGUSR2', () => App.closedataBaseConnection('nodemon restart', () => process.kill(process.pid, 'SIGUSR2')));
process.once('SIGINT', () => App.closedataBaseConnection('connection crashed', () => process.exit(0)));

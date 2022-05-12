import dotenv from 'dotenv';
const node_env = process.env.NODE_ENV?.trim();
switch (node_env) {
  case 'production':
    dotenv.config({ path: '.env.production', debug: true });
    break;
  case 'test':
    dotenv.config({ path: '.env.test', debug: true });
    break;
  case 'development':
    dotenv.config({ path: '.env.development', debug: true });
    break;
}

import customExpress from './service/customExpress';

console.log('Environment: ', node_env?.toUpperCase());

const port = process.env.PORT || 3333;

const app = customExpress
  .listen(port, () => { console.log(`\u001b[1;34mServer running on ${process.env.HOST} - port ${port} ... \u001b[0m`); })
  .on('error', function (err) { console.log(`\u001b[1;31mFail on starting server - ${err} \u001b[0m`) });

process.on('SIGINT', gracefulShutdown('SIGINT'));

process.on('SIGTERM', gracefulShutdown('SIGTERM'));

process.on('exit', (code) => { console.info('Exit signal received.', code); });

process.on('uncaughtException', (error, origin) => { console.info(`\n${origin} signal received.`, error); });

function gracefulShutdown(code: string) {
  return (event: string) => {
    console.info(`${event} signal received with code ${event}`);
    console.log('Closing http server...');
    app.close(() => {
      console.log('Http server closed.');
      process.exit(0);
    });
  }
}

export default app;
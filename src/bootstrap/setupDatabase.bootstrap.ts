import mongoose from 'mongoose';
import { configenv } from '@configs/configEnvs';
import Logger from 'bunyan';
import { logger } from '@configs/configLogs';

const log: Logger = logger.createLogger('setupDatabase'); // se crea la definicion del lo

// Desing Pattern Singleton https://refactoring.guru/design-patterns/singleton
export default () => {
  const connect = () => {
    mongoose
      .connect(`${configenv.DATABASE_URL}`)
      .then(() => {
        log.info('Seccessfully connected to database at CM-Vidal');
      })
      .catch(error => {
        log.error('Error connecting to database at CM-Vidal', error);
        return process.exit(1); // para no dejar el proceso colgado
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

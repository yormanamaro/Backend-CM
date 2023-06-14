import bunyan from 'bunyan';

class LoggerConfig{
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, lavel: 'debug' });
  }
}

export const logger: LoggerConfig = new LoggerConfig();


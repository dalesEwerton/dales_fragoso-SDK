import winston, { Logger as WinstonLogger } from 'winston';

export class Logger {
  private logger: WinstonLogger;
  private tag: string;

  constructor(tag: string) {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          const { timestamp, level, message } = info;
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
      ],
    });
    this.tag = tag;
  }

  public error(message: string): void {
    this.logger.error(`[${this.tag}]: ${message}`);
  }

  public warn(message: string): void {
    this.logger.warn(`[${this.tag}]: ${message}`);
  }

  public info(message: string): void {
    this.logger.info(`[${this.tag}]: ${message}`);
  }

  public debug(message: string): void {
    this.logger.debug(`[${this.tag}]: ${message}`);
  }
}

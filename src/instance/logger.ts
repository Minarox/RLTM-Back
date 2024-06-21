import { createLogger, format, transports } from "winston";

let singleton: any;

/**
 * @description Create singleton instance of Winston (= logger)
 * @return {any} - Winston
 */
function logger(): any {
  if (singleton) {
    return singleton;
  }

  singleton = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/warning.log', level: 'warning' }),
      new transports.File({ filename: 'logs/combined.log' })
    ]
  });

  if (process.env['NODE_ENV'] !== 'production') {
    singleton.add(new transports.Console({
      format: format.simple(),
    }));
  }
  return singleton;
}

export default logger();

import winston from "winston";

let singleton: any;

/**
 * @description Create singleton instance of Winston (= logger)
 * @return {any} - Winston
 */
function logger(): any {
  if (singleton) {
    return singleton;
  }

  singleton = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
      service: 'user-service'
    },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env['NODE_ENV'] !== 'production') {
    singleton.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  return singleton;
}

export default logger();

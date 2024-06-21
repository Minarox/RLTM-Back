import winston as Winston from "winston";

let instance: any;

/**
 * @description Create singleton instance of Winston
 * @return {any} - Winston
 */
function winston(): any {
  if (instance) {
    return instance;
  }

  instance = Winston.createLogger({
    level: 'info',
    format: Winston.format.json(),
    defaultMeta: {
      service: 'user-service'
    },
    transports: [
      new Winston.transports.File({ filename: 'error.log', level: 'error' }),
      new Winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env['NODE_ENV'] !== 'production') {
    instance.add(new Winston.transports.Console({
      format: Winston.format.simple(),
    }));
  }
  return instance;
}

export default winston();


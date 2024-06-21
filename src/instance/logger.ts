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

    const { combine, timestamp, printf, colorize } = format;
    singleton = createLogger({
        level: 'info',
        format: combine(
            colorize(),
            timestamp(),
            printf((info): string => {
                return `${info['timestamp']} - ${info.level}: ${info.message}`;
            })
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'logs/combined.log' }),
            new transports.File({ filename: 'logs/error.log', level: 'error' })
        ]
    });
    return singleton;
}

export default logger();

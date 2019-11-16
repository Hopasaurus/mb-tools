const levels = ['debug', 'info', 'warn', 'error'];

const config = {
    logger: null,
};

const createLogger = (logLevel, logFunction=console.log) => {
    if (config.logger !== null) throw new Error('createLogger can only be called once.');

    const logLevelIndex = levels.indexOf(logLevel);

    config.logger = levels.reduce((logger, level) => {
        const loggerIndex = levels.indexOf(level);
        logger[level] = message => {
            if (loggerIndex >= logLevelIndex)
                logFunction(`${level} ${message}`);
        };
        return logger;
    }, {});

    return config.logger
};

const getLogger = () => {
    if (config.logger === null) throw new Error('createLogger must be called before calling getLogger.');
    return config.logger;
};

module.exports = {createLogger, getLogger};

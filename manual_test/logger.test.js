const requireUncached = module => {
    delete require.cache[require.resolve(module)];
    return require(module);
};

{
    const {createLogger} = requireUncached('../src/logger');


    const logger = createLogger();

    logger.debug('This is a debug log');
    logger.info('This is an info log');
    logger.warn('This is a warn log');
    logger.error('This is an error log');
}

{
    const {createLogger, getLogger} = requireUncached('../src/logger');

    const logger2 = createLogger('error');


    logger2.debug('This is a debug log');
    logger2.info('This is an info log');
    logger2.warn('This is a warn log');
    logger2.error('This is an error log');

    const logger3 = getLogger();
    logger3.error('Another error');
}
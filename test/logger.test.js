const assert = require('assert');

const requireUncached = module => {
    delete require.cache[require.resolve(module)];
    return require(module);
};

const logged = [];
const fake_console_log = message => logged.push(message);

describe('createLogger', function () {
    const {createLogger} = requireUncached('../src/logger');
    createLogger();

    it('should throw an exception when called a second time', function () {
        assert.throws(() => createLogger());
    });
});

describe('createLogger with debug level', function () {
    const {createLogger} = requireUncached('../src/logger');
    const logger = createLogger('debug', fake_console_log);

    beforeEach(function () {
        while (logged.length) logged.pop();
    });

    it('should log debug messages', function () {
        logger.debug('message');
        assert.equal(logged[0], 'debug message');
    });

    it('should log info messages', function () {
        logger.info('message');
        assert.equal(logged[0], 'info message');
    });

    it('should log warn messages', function () {
        logger.warn('message');
        assert.equal(logged[0], 'warn message');
    });

    it('should log error messages', function () {
        logger.error('message');
        assert.equal(logged[0], 'error message');
    });
});

describe('createLogger with info level', function () {
    const {createLogger} = requireUncached('../src/logger');
    const logger = createLogger('info', fake_console_log);

    beforeEach(function () {
        while (logged.length) logged.pop();
    });

    it('should not log debug messages', function () {
        logger.debug('message');
        assert.equal(logged.length, 0);
    });

    it('should log to info messages', function () {
        logger.info('message');
        assert.equal(logged[0], 'info message');
    });

    it('should log to warn messages', function () {
        logger.warn('message');
        assert.equal(logged[0], 'warn message');
    });

    it('should log to error messages', function () {
        logger.error('message');
        assert.equal(logged[0], 'error message');
    });
});

describe('getLogger', function () {
   it('should return the same logger created by createLogger', function () {
      const {createLogger, getLogger} = requireUncached('../src/logger');
      const createdLogger = createLogger();
      const logger = getLogger();
      assert.strictEqual(logger, createdLogger);
   });

   it('should throw exception of createLogger was not called first', function () {
      const {getLogger} = requireUncached('../src/logger');
      assert.throws(() => getLogger());
   });
});

// can log to debug at default log level

//test('loggging to debug works when logger is created at default level', () => {
// TODO: note that the tests will interact, logger only going to be built once
// TODO:
//});
// can log to info at default log level
// can log to warn at default log level
// can log to error at default log level


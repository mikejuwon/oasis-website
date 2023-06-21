const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'Oasis Website' });

const log = logger.child({ module: 'server' });


module.exports = {
    log: log
}
import debug from 'debug';
import _ from 'lodash';
import dotenv from 'dotenv';
import variableExpansion from 'dotenv-expand';

if (process.env.NODE_ENV === 'development') {
    // loads config from .env file
    const localEnv = dotenv.config();

    variableExpansion(localEnv);
    debug.enable(process.env.DEBUG);
}

const commonConfig = require('./config.common');
const developConfig = require('./config.development');

let configs = commonConfig;

switch (process.env.NODE_ENV) {
    case 'development': {
        configs = _.merge(configs, developConfig);
        break;
    }
    default:
}

module.exports = configs;

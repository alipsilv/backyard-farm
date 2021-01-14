import debug from 'debug';
import _ from 'lodash';
import dotenv from 'dotenv';
import variableExpansion from 'dotenv-expand';
import os from 'os';
import fs from 'fs';
import path from 'path';

if (process.env.NODE_ENV === 'development') {
    // loads config from .env file
    const localEnv = dotenv.config();

    variableExpansion(localEnv);
    debug.enable(process.env.DEBUG);
}

const localPathExists = fs.existsSync(path.join(__dirname, './config.local.js'));

const commonConfig = require('./config.common');
const developConfig = require('./config.development');
const localConfig = localPathExists ? require('./config.local') : {};

let configs = commonConfig;

switch (process.env.NODE_ENV) {
    case 'development': {
        configs = _.merge(configs, developConfig);
        configs = _.merge(configs, localConfig);
        break;
    }
    case 'staging': {
        configs = _.merge(configs, stagingConfig);
        configs = _.merge(configs, localConfig);
        break;
    }
    default:
}

module.exports = configs;


export const SEED = '@logistica-@mi-@semilla';
export const SERVER_PORT: number = Number( process.env.PORT ) || 80;

import {configure, getLogger} from "log4js";

export const logger = getLogger();
logger.level = 'debug';
logger.debug("Test console debug");

configure({
    appenders: { cheese: { type: 'dateFile', filename: './logs/logistica.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

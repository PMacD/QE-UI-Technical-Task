"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    baseUrl: 'https://www.gov.uk/calculate-your-holiday-entitlement',
    browser: process.env.BROWSER || 'chromium',
    defaultTimeout: 60 * 1000,
    runHeadless: true,
    runSlow: 0,
};
exports.default = config;

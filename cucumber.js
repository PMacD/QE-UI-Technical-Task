module.exports = {
  default: {
    require: ['src/steps/**/*.ts', 'src/support/**/*.ts'],
    requireModule: ['ts-node/register'],
    paths: ['features/**/*.feature'],
    format: ['@cucumber/pretty-formatter', 'html:reports/report.html'],
    timeout: 60000,
  },
};
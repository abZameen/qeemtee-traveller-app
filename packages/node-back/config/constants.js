const envVariables = process.env;
module.exports = {
  DB_CREDENTIALS: {
    NAME: {
      development: envVariables.DB_NAME_DEV,
      production: envVariables.DB_NAME_PROD
    },
    HOST: {
      development: envVariables.DB_HOST_DEV,
      production: envVariables.DB_HOST_PROD
    },
    PORT: {
      development: envVariables.DB_PORT_DEV,
      production: envVariables.DB_PORT_PROD
    }
  },
  APP_PORT: {
    development: envVariables.APP_PORT_DEV,
    production: envVariables.APP_PORT_PROD
  }
};

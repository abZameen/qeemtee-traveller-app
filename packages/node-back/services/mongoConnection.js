const mongoose = require("mongoose");
const constants = require("../config/constants");

// eslint-disable-next-line consistent-return
module.exports.makeConnection = env => {
  try {
    // Commence connection with database
    mongoose.connect(
      `mongodb://${constants.DB_CREDENTIALS.HOST[env]}:${
        constants.DB_CREDENTIALS.PORT[env]
      }/${constants.DB_CREDENTIALS.NAME[env]}`,
      { useNewUrlParser: true }
    );

    // If connection gets through
    mongoose.connection.on("connected", ref => {
      // eslint-disable-next-line no-console
      console.log("[Mongoose] Connected to database!");
      return ref;
    });

    // If the connection throws an error
    mongoose.connection.on("error", error => {
      // eslint-disable-next-line no-console
      console.error(
        "[Mongoose] Failed to connect to database on startup: ",
        error
      );
      throw error;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("[Mongoose] Database initialization failed: ", error.message);
    return error;
  }
};

module.exports.gracefulExit = () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line no-console
    console.log("[Mongoose] Database connection terminated gracefully");
    process.exit(0);
  });
};

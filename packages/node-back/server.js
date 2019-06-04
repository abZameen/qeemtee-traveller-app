// const path = require("path");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();

const routes = require("./config/routes");
const constants = require("./config/constants");
const mongoConnection = require("./services/mongoConnection");

require("./models/Traveler");

const env = process.env.NODE_ENV || "development";

const app = express();

// Configure middlewar for CORS
app.use(cors());
// Configure middlewar for http compression
app.use(compression());

// Max file size limit for HTTP
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: env.FILE_SIZE
  })
);
app.use(
  bodyParser.json({
    limit: env.FILE_SIZE
  })
);

// Set static content directory
app.use(express.static(path.join(__dirname, "public")));

// Set API Routes
routes(app);

// Set port for the app
const port = constants.APP_PORT[env];
app.set("port", parseInt(port, 10));

// Create HTTP server
const server = http.createServer(app);

// Listen on the set port
server.listen(port);

// Bind methods to server events
server.on("listening", () => {
  mongoConnection.makeConnection(env);
  const address = server.address();

  const bind =
    typeof address === "string" ? `pipe: ${address}` : `port: ${address.port}`;
  // eslint-disable-next-line no-console
  console.log(`Server now listening on ${bind}`);
});

server.on("error", error => {
  // eslint-disable-next-line no-console
  console.log("cameinto error", error);
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      // eslint-disable-next-line no-console
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      // eslint-disable-next-line no-console
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// If the Node process ends, close the database connection
process
  .on("SIGINT", mongoConnection.gracefulExit)
  .on("SIGTERM", mongoConnection.gracefulExit);

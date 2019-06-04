const httpStatus = require("http-status");
const travelerController = require("../controllers/Travelers");

module.exports = app => {
  app.use("/api/travelers", travelerController);

  // If route provided does not match
  app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).send({ error: httpStatus["404_MESSAGE"] });
  });
};

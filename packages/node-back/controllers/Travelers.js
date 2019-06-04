require("../models/Traveler");
const router = require("express").Router();
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const helpers = require("../services/helpers");

const Traveler = mongoose.model("Traveler");

router.post("/", async (req, res) => {
  try {
    const data = helpers.getModelRawParams(req.body, Traveler);
    const traveler = await Traveler.create(data);
    res.send(traveler);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const travelers = await Traveler.findById(req.params.id);
    res.send(travelers);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const travelers = await Traveler.find();
    res.send(travelers);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = helpers.getModelRawParams(req.body, Traveler);
    const travelers = await Traveler.findOneAndUpdate(
      { _id: req.params.id },
      data,
      { new: true, runValidators: true }
    );
    res.send(travelers);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  res.send(JSON.stringify({ name: "Kaylie" }));
});

module.exports = router;

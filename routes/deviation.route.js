const express = require("express");
const Crypto = require("../models/crypto.model");
const router = express.Router();

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).send({ error: "Coin query parameter is required." });
  }

  try {
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (records.length < 2) {
      return res.status(400).send({ error: "Not enough data for standard deviation calculation." });
    }

    const prices = records.map((record) => record.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.send({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;

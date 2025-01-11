const express = require("express");
const Crypto = require("../models/crypto.model");
const router = express.Router();

router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).send({ error: "Coin query parameter is required." });
  }

  try {
    const latestRecord = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestRecord) {
      return res.status(404).send({ error: "No data found for the requested coin." });
    }

    res.send({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord.change24h,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal server error." });
  }
});

module.exports = router;

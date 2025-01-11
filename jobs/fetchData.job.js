const cron = require("node-cron");
const Crypto = require("../models/crypto.model");
const { fetchCoinData } = require("../services/coingecko.service");

const CRYPTO_IDS = ["bitcoin", "matic-network", "ethereum"];

const startFetchDataJob = () => {
  cron.schedule("0 */2 * * *", async () => {
    console.log("Running background job to fetch cryptocurrency data...");
    try {
      const coinData = await fetchCoinData(CRYPTO_IDS);

      const records = coinData.map((coin) => ({
        coin: coin.id,
        price: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
      }));

      await Crypto.insertMany(records);
      console.log("Data fetched and stored successfully.");
    } catch (error) {
      console.error("Error in background job:", error.message);
    }
  });
};

module.exports = startFetchDataJob;

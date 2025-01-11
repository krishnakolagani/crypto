const axios = require("axios");

const COINGECKO_API = "https://api.coingecko.com/api/v3/coins/markets";
const CURRENCY = "usd";
const API_KEY = process.env.COINGECKO_API_KEY;

const fetchCoinData = async (coinIds) => {
  try {
    const { data } = await axios.get(COINGECKO_API, {
      params: {
        vs_currency: CURRENCY,
        ids: coinIds.join(","),
        x_cg_demo_api_key: API_KEY, // Pass the API key here
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error.message);
    throw new Error("Failed to fetch data from CoinGecko.");
  }
};

module.exports = { fetchCoinData };

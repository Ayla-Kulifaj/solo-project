const express = require('express');
const router = express.Router();

// import environment
require('dotenv').config();
// import polygon
const { restClient } = require('@polygon.io/client-js');

const globalFetchOptions = {
    pagination: true,
};
// setup polygon client
const rest = restClient(process.env.POLY_API_KEY);
const pag= restClient(process.env.POLY_API_KEY, "https://api.polygon.io", globalFetchOptions);

// Get Stock route
router.get('/data/:ticker', (req, res) => {
    // get ticker from path
    const { ticker } = req.params;
    // optionally get date from path
    const { startDate } = req.query;

    // if startDate was not sent in default to yesterday:
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // the if statement for it strtDate, use startDate, else use yesterday
    let defaultStartDate = startDate ? startDate : yesterday;

    console.log("Stock data date:", defaultStartDate);
    rest.stocks.dailyOpenClose(`${ticker}`, `${defaultStartDate}`).then((data) => {
        console.log(data);
        res.send(data);
    }).catch(e => {
        console.error('An error happened:', e);
    });
  });

  // Get all stocks route
router.get('/', (req, res) => {
    const { limit = 1000 } = req.query;

    pag.reference.tickers({ market: "stocks", limit: limit, type: 'CS' }).then((data) => {
        console.log(data);
        res.send(data)
    }).catch(e => {
        console.error('An error happened:', e);
        res.status(500).send('Failed to fetch data');
    });
});

// Get stock details route
router.get('/data/:ticker/details', (req, res) => {
    const { ticker } = req.params;

    console.log("ticker details")
    rest.reference.tickerDetails(`${ticker}`).then((data) => {
        console.log(data);
        res.send(data);
    }).catch(e => {
        console.error('An error happened:', e);
    });
});
// Get top Gainers 
router.get('/gainers', (req, res) => {
    console.log("gainers")

    rest.stocks.snapshotGainersLosers("gainers").then((data) => {
        console.log(data);
        res.send(data)
    }).catch(e => {
        console.error('An error happened:', e);
    });
});

// Get top losers
router.get('/losers', (req, res) => {
    console.log("losers")
    
    // losers
    rest.stocks.snapshotGainersLosers("losers").then((data) => {
        console.log(data);
        res.send(data)
    }).catch(e => {
        console.error('An error happened:', e);
    });
})


module.exports = router;
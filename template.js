// Example template for WillowCoin (https://bitcointalk.org/index.php?topic=5234309.0)
// Data is from my mining pool at http://scpool.xyz

/**
 * Returns a promise of a Number representing the coin's current difficulty
 * @returns {Promise}
 */
function getDifficulty(){

    // Usually I'd say use an api, don't scrape a pool
    // But I own this pool so I am fine scraping it
    return customFetch('http://profit.scpool.xyz/explor',false)
        .then((data) => {
            return data.split('id="DIFF WILLOW" data="')[1].split('"')[0];
        });
}

/**
 * Returns a promise of a Number representing the coin's current exchange rate to btc
 * @returns {Promise}
 */
function getExchangeRate(){

    // Willow currently only trades on erex, so getting data from there
    return customFetch('http://profit.scpool.xyz/ticker',true)
        .then((data) => {
            let willowStats = data.filter((x) => {return x.pair == 'BTC_WILLOW'})[0];
            console.log(Number(willowStats.high24hr) + Number(willowStats.low24hr));
            return ((Number(willowStats.high24hr) + Number(willowStats.low24hr))/2).toFixed(9);
        });
}

/**
 * Returns a promise of a Number representing the coin's current block reward.
 * NOTE: This will often be a very simple function that just returns a static value,
 * but we have to account for coins with varying block reward
 * @returns {Promise}
 */
async function getBlockReward(){
    let blockReward = 120; // Static for WillowCoin
    return blockReward;
}

let template = {
    'coin' : 'Willow',
    'symbol' : 'WILLOW',
    'decimalPlaces' : 3,
    'getBlockReward' : getBlockReward,
    'getDifficulty' : getDifficulty,
    'getExchangeRate' : getExchangeRate
};
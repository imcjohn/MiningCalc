function getExchangeRate(){
    // load current btc exchange rate, useful to have
    return fetch('https://blockchain.info/tobtc?currency=USD&value=1&cors=true')
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            template.btcUSD = 1/data;
        });
}

function loadTemplate(){
    getExchangeRate();
    document.getElementById('calcText').innerText = template.coin + ' ' + document.getElementById('calcText').innerText
    let fields = ['BlockReward','Difficulty','ExchangeRate'];
    fields.forEach(function (item){
        template['get'+item]().then((data) => {document.getElementById(item).value = data});
    })
}

function doCalc(){
    let fields = ['hashRate','powerUse','poolFee','powerCost','BlockReward','Difficulty','ExchangeRate'];
    let decoded = {};
    try {
        fields.forEach(function (item) {
            decoded[item] = Number(document.getElementById(item).value);
        });
    }
    catch {}
    let cost = 0.001 * decoded.powerCost * decoded.powerUse;
    console.log(cost);
    let hour = decoded.hashRate * 1000000 * 3600 * decoded.BlockReward / (2**32 * decoded.Difficulty);
    let ranges = {'Hour' : 1, 'Day' : 24, 'Week' : 24 * 7, 'Year' : 24 * 365};
    let out = '';
    let prof = '';
    for (let label in ranges){
        let mult = ranges[label];
        let val = (mult * hour).toFixed(template.decimalPlaces);
        let usd = (val * decoded.ExchangeRate * template.btcUSD).toFixed(template.decimalPlaces);
        let usd_cost = (mult * hour * decoded.ExchangeRate * template.btcUSD - cost * mult).toFixed(template.decimalPlaces)
        out = out + `<li><p>One ${label}: <b>${val} ${template.coin}</b>, equal to ${usd} USD</p></li>\n`
        prof = prof + `<li><p>One ${label}: ${usd_cost} USD</p></li>\n`
    }
    document.getElementById("outputWindow").style.display = '';
    document.getElementById("outputWindow").innerHTML = `
    <h1 style='
              font-size:2em;
              font-weight:400;
              color:#ffffff;
              border-bottom:1px solid #ffffff;
              margin-bottom:1em;'
            >
            Expected Mining Return
            
            </h1>
            <table>
                <tr>
                    <td>
                       <p>Returns over time (not accounting for cost):</p> 
                       <ul>
                       ${out}
                       </ul>
                    </td>
                    <td>
                           <p>Profit over time:</p> 
                           <ul>
                           ${prof}
                           </ul>    
                    </td>
                </tr>
            </table>       
    `;
}

window.onload = loadTemplate;

# Ian's Mining Calculator

##### Introduction
MiningCalc is an extremely easy to use, templated, mining profitability calculator, 
that supports a wide variety of altcoins. In order to set it up, all you need to do
is clone the repo to a web server that can host static files (including GH Pages, or
my project [SkyPages](https://imcjohn.github.io/SkyPages/frontend/)), then edit the template.js 
file to configure a few variables specific to your currency.
 
##### Templating Setup
In order to get MiningCalc set up for your cryptocurrency, simply set the below variables in template.js
```
coin - The name of your cryptocurrency (ex. Bitcoin)
symbol - The symbol for your cryptocurrency (ex. BTC)
decimalPlaces - How many decimal places you want the final output to be
getBlockReward - Function that returns the current block reward (see template.js for examples)
getDifficulty - Function that returns the current network difficulty (see template.js for examples)
getExchangeRate - Function that returns the current coin to BTC exchange rate (see template.js for examples)
```

##### Thanks for reading!
 MiningCalc is designed to be easy to 
configure for new altcoin creators, pool operators, or anyone else who needs a simple 
calculator. Messages and pull requests are always appreciated if you have any suggestions, and 
if this project helps you out, feel free to toss me some BTC at 1H63qcrbSBpdxLgHvzVVKVMGKQJqiZHdiK . In addition, this 
project wouldn't have been possible without an excellent CodePen [template](https://codepen.io/ehermanson/pen/KwKWEv)
 from ehermanson, so definitely check that out! Also, while this does have ads in it, you are welcome to remove them in 
 the HTML if you really have to, but I appreciate the revenue for anyone who keeps them in.


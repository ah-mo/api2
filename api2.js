const baseURL = 'http://api.coinlayer.com/api/';
const key = '80e030ac2c60634293cf1c209ecccd67';
let symbols = document.getElementById('coinSelect');
let url;
let value;
const coinz = document.getElementById('coinz');
const dollaz = document.getElementById('dollaz');
const convertBtn = document.getElementById('#convertBtn')
const convertForm = document.getElementById('conversionForm');
const buyPowerForm = document.getElementById('buyPowerForm');

//Results section
const convSection = document.getElementById('convSection');
const bpSection = document.getElementById('bpSection');

const results = document.querySelector('results');

convertForm.addEventListener('submit', fetchRates);
buyPowerForm.addEventListener('submit', fetchRatesForBp);

async function fetchRates(e) { //creating function to fetch the results from the api
    console.log(e);
    //console.log(typeof e); //object
    e.preventDefault();//preventing the page from refreshing and stopping data from going anywhere
    let symbol = symbols.value;
    console.log('Symbol:', symbol);
    url = `${baseURL}/live?access_key=${key}&symbols=${symbol}`;//concatenates variables into a url string which is used to query the api
    // console.log('URL:', url);
    symbol = document.getElementById('coinSelect');
    console.log('URL:', url);

    await fetch(url)//fetching data from the url we've created in the previous statements
        .then(function (result) {//taking result of the fetch and passing to anonymous function which jsonifys the data
            console.log(result);
            return result.json();//sets up our results as a json object and return them to be used down the chain of .then statements
        })
        .then(function (json) {//takes the return from previous .then statement and sets it up in json argument to be used in the displayResults function
            console.log(json);

            
            displayResults(json);//runs the displayResults function with the object from the json argument passed from the first .then
        })
}
async function fetchRatesForBp(e) { //creating function to fetch the results from the api
    console.log(e);
    //console.log(typeof e); //object
    e.preventDefault();//preventing the page from refreshing and stopping data from going anywhere
    let symbol = symbols.value;
    console.log('Symbol:', symbol);
    url = `${baseURL}/live?access_key=${key}&symbols=${symbol}`;//concatenates variables into a url string which is used to query the api
    // console.log('URL:', url);
    symbol = document.getElementById('coinSelect');
    console.log('URL:', url);

    await fetch(url)//fetching data from the url we've created in the previous statements
        .then(function (result) {//taking result of the fetch and passing to anonymous function which jsonifys the data
            console.log(result);
            return result.json();//sets up our results as a json object and return them to be used down the chain of .then statements
        })
        .then(function (json) {//takes the return from previous .then statement and sets it up in json argument to be used in the displayResults function
            console.log(json);

            
            displayResultsBuyPower(json);//runs the displayResults function with the object from the json argument passed from the first .then
        })
}
function displayResults(json) {//using the json argument in the promise returned from the fetch(url)
    while (convSection.firstChild) {//begins while loop (while loops result always have to come back true then stop when false(y)) to check if section has a firstChild element
        convSection.removeChild(convSection.firstChild);//if it does remove the firstChild, this will clear the section to display the next results
        
    }
    let rateObj = Object.values(json.rates);
    let rate = Number(rateObj);
    console.log('Rate:', rate);
    let value = coinz.value * rate;
    console.log('Value:', value);
    let usdValue = value.toFixed(2);
    let usdValue2 = Intl.NumberFormat().format(usdValue);
    console.log(`$${usdValue2}`);
    let symbol = symbols.value;

    //NEW RESULTS BUILD SECTION
    let resultsContainer = document.createElement('div');
    resultsContainer.setAttribute('class','card mb-3 bg-success');
    let row = document.createElement('div');
    row.setAttribute('class', 'row no-gutters');
    let coinImg = document.createElement('div');
    coinImg.setAttribute('class', 'card-img-top');
    let ccImg = document.createElement('img');
    ccImg.setAttribute('class', 'coinIcon');
    if (symbol === 'ETH'){
        ccImg.setAttribute('src', './assets/ethereum.png')
    }else if (symbol === 'XRP'){
        ccImg.setAttribute('src', './assets/ripple.png')
    }else if (symbol === 'USDT'){
        ccImg.setAttribute('src', './assets/tether.png')
    }else if (symbol === 'BCH'){
        ccImg.setAttribute('src', './assets/bitcoincash.png')
    }else if (symbol === 'XMR'){
        ccImg.setAttribute('src', './assets/xrm.png')
    }else if (symbol === 'EOS'){
        ccImg.setAttribute('src', './assets/eos.png')
    }else if (symbol === 'LTC'){
        ccImg.setAttribute('src', './assets/litecoin.png')
    }else {
        ccImg.setAttribute('src', './assets/bitcoin.png')
    }

    let coinResultText = document.createElement('div');
    coinResultText.setAttribute('class', 'col-md-8');
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    let cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title');
    let cardInfo = document.createElement('p');
    cardInfo.setAttribute('class', 'card-text text-light display-4');
    let cardUpdate = document.createElement('p');
    cardUpdate.setAttribute('class', 'card-text');
    let cardUpdateInfo = document.createElement('small');
    cardUpdateInfo.setAttribute('class', 'text-warning');

//CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    convSection.appendChild(resultsContainer);
    resultsContainer.appendChild(row);
    row.appendChild(coinImg);
    coinImg.appendChild(ccImg);
    row.appendChild(coinResultText);
    coinResultText.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardInfo);
    cardBody.appendChild(cardUpdate);
    cardUpdate.appendChild(cardUpdateInfo);

    let ccSymbol = json.symbol;
    cardTitle.textContent = ccSymbol;

    cardInfo.textContent = `${coinz.value} ${symbol} worth $${usdValue2}`

    let convDateStamp = json.timestamp;
    var date = new Date(convDateStamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formConvDateStamp = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    cardUpdateInfo.textContent = `Values updated at ${formConvDateStamp}`;
  
}

function displayResultsBuyPower(json) {
    while (bpSection.firstChild) {
        bpSection.removeChild(bpSection.firstChild);    
    }
    let rateObj = Object.values(json.rates);
    let rate = Number(rateObj);
    console.log('Rate:', rate);
    let bpValue = dollaz.value / rate;
    console.log('Value:', bpValue);
    
    let usdBpInput2 = Intl.NumberFormat().format(dollaz.value);
    let symbol = symbols.value;

    //NEW RESULTS BUILD SECTION
    let resultsContainer = document.createElement('div');
    resultsContainer.setAttribute('class','card mb-3 bg-success');
    let row = document.createElement('div');
    row.setAttribute('class', 'row no-gutters');
    let coinImg = document.createElement('div');
    coinImg.setAttribute('class', 'card-img-top');
    let ccImg = document.createElement('img');
    ccImg.setAttribute('class', 'coinIcon');
    if (symbol === 'ETH'){
        ccImg.setAttribute('src', './assets/ethereum.png')
    }else if (symbol === 'XRP'){
        ccImg.setAttribute('src', './assets/ripple.png')
    }else if (symbol === 'USDT'){
        ccImg.setAttribute('src', './assets/tether.png')
    }else if (symbol === 'BCH'){
        ccImg.setAttribute('src', './assets/bitcoincash.png')
    }else if (symbol === 'XMR'){
        ccImg.setAttribute('src', './assets/xrm.png')
    }else if (symbol === 'EOS'){
        ccImg.setAttribute('src', './assets/eos.png')
    }else if (symbol === 'LTC'){
        ccImg.setAttribute('src', './assets/litecoin.png')
    }else {
        ccImg.setAttribute('src', './assets/bitcoin.png')
    }

    let coinResultText = document.createElement('div');
    coinResultText.setAttribute('class', 'col-md-8');
    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    let cardTitle = document.createElement('h5');
    cardTitle.setAttribute('class', 'card-title');
    let cardInfo = document.createElement('p');
    cardInfo.setAttribute('class', 'card-text text-light display-4');
    let cardUpdate = document.createElement('p');
    cardUpdate.setAttribute('class', 'card-text');
    let cardUpdateInfo = document.createElement('small');
    cardUpdateInfo.setAttribute('class', 'text-warning');

//CORRECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    bpSection.appendChild(resultsContainer);
    resultsContainer.appendChild(row);
    row.appendChild(coinImg);
    coinImg.appendChild(ccImg);
    row.appendChild(coinResultText);
    coinResultText.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardInfo);
    cardBody.appendChild(cardUpdate);
    cardUpdate.appendChild(cardUpdateInfo);

    let ccSymbol = json.symbol;
    cardTitle.textContent = ccSymbol;

    cardInfo.textContent = `$${usdBpInput2} buys ${bpValue} worth of ${symbol}`

    let convDateStamp = json.timestamp;
    var date = new Date(convDateStamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formConvDateStamp = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    cardUpdateInfo.textContent = `Values updated at ${formConvDateStamp}`;
 
}

//fetchRates();
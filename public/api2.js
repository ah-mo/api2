const baseURL = 'http://api.coinlayer.com/api/';
const key = '80e030ac2c60634293cf1c209ecccd67';
let symbols = document.getElementById('coinSelect');
let url;
let value;
const coinz = document.getElementById('coinz');
const convertBtn = document.getElementById('#convertBtn')
const convertForm = document.querySelector('form');

//Results section
const section = document.querySelector('section');
const results = document.querySelector('results');

convertForm.addEventListener('submit', fetchRates);

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
            for (const [symbol, rate] of Object.entries(json.rates)) {
                console.log(`${symbol}: ${rate}`);
            }
            
            displayResults(json);//runs the displayResults function with the object from the json argument passed from the first .then
        })
}
function displayResults(json) {//using the json argument in the promise returned from the fetch(url)
    while (section.firstChild) {//begins while loop (while loops result always have to come back true then stop when false(y)) to check if section has a firstChild element
        section.removeChild(section.firstChild);//if it does remove the firstChild, this will clear the section to display the next results
        
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
    let card = document.createElement('div');
    card.setAttribute('class', 'card bg-light mb-3');
    let row = document.createElement('div');
    row.setAttribute('class', 'row no-gutters');
    let img = document.createElement('img');
    let src;
    // if (){

    // }else if {

    // }else if {

    // }else if {

    // }else {

    // }
    //img.setAttribute('src', src);
    let convInfo = document.createElement('div');
    convInfo.setAttribute('class', 'col-md-8');
    let convText = document.createElement('div');
    convText.setAttribute('class', 'card-body');
    let convTitle = document.createElement('h5');
    convTitle.setAttribute('class', 'card-title');
    let ccSymbol = json.symbol;
    convTitle.textContent = ccSymbol;
    let convAmount = document.createElement('p');
    convAmount.setAttribute('class', 'card-text');
    convAmount.textContent = `You have ${coinz.value} ${symbol} coins worth $${usdValue2}.`
    let convDateSection = document.createElement('p');
    convDateSection.setAttribute('class', 'card-text');
    let convDate = document.createElement('small');
    convDate.setAttribute('class', 'text-muted');
    let convDateStamp = json.timestamp;
    var date = new Date(convDateStamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formConvDateStamp = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    convDate.textContent = `Values updated at ${formConvDateStamp}`;

    //Creating elements in DOM

    card.appendChild(convDate);
    card.appendChild(convDateSection);
    card.appendChild(convAmount);
    convText.appendChild(convTitle);
    convInfo.appendChild(convText);
    card.appendChild(convInfo);
    row.appendChild(img);
    card.appendChild(row);
    section.appendChild(card);
}

//fetchRates();
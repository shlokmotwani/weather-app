const URL_LEFT = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const URL_RIGHT = '?unitGroup=metric&key=HRAC76VQCCEJMMRPLCSUF98AF&contentType=json';
const inputField = document.querySelector("#location-input");
const fetchButton = document.querySelector("#fetch-button");
const outputField = document.querySelector("#area");
const contentDiv = document.querySelector("#content-div");
let weatherReportJSON;
let weatherReportJSONExtracted = {};

async function getWeatherReport(){
    const location = inputField.value;
    const url = URL_LEFT + location + URL_RIGHT;
    outputField.value = url;
    let result = await fetch(url, {mode: 'cors'});
    weatherReportJSON = await result.json();
}

function extractNecessaryDetails(){
    weatherReportJSONExtracted.resolvedAddress = weatherReportJSON.resolvedAddress;
    weatherReportJSONExtracted.conditions = weatherReportJSON.currentConditions.conditions;
    weatherReportJSONExtracted.datetime = weatherReportJSON.currentConditions.datetime;
    weatherReportJSONExtracted.dew = weatherReportJSON.currentConditions.dew;
    weatherReportJSONExtracted.feelslike = weatherReportJSON.currentConditions.feelslike;
    weatherReportJSONExtracted.humidity = weatherReportJSON.currentConditions.humidity;
    weatherReportJSONExtracted.pressure = weatherReportJSON.currentConditions.pressure;
    weatherReportJSONExtracted.temp = weatherReportJSON.currentConditions.temp;
    weatherReportJSONExtracted.windspeed = weatherReportJSON.currentConditions.windspeed;
}

fetchButton.addEventListener('click', async ()=>{
    contentDiv.innerHTML = "";
    await getWeatherReport();
    extractNecessaryDetails();
    loadWeatherCard();
});

function loadWeatherCard(){
    let weatherCard = document.createElement('div');
    let address = document.createElement('div');
    let conditions = document.createElement('div');
    let datetime = document.createElement('div');
    let dew = document.createElement('div');
    let feelslike = document.createElement('div');
    let humidity = document.createElement('div');
    let pressure = document.createElement('div');
    let temp = document.createElement('div');
    let windspeed = document.createElement('div');

    address.textContent = weatherReportJSONExtracted.resolvedAddress;
    conditions.textContent = weatherReportJSONExtracted.conditions;
    datetime.textContent = weatherReportJSONExtracted.datetime;
    dew.textContent = weatherReportJSONExtracted.dew;
    feelslike.textContent = weatherReportJSONExtracted.feelslike;
    humidity.textContent = weatherReportJSONExtracted.humidity;
    pressure.textContent = weatherReportJSONExtracted.pressure;
    temp.textContent = weatherReportJSONExtracted.temp;
    windspeed.textContent = weatherReportJSONExtracted.windspeed;

    weatherCard.appendChild(address);
    weatherCard.appendChild(conditions);
    weatherCard.appendChild(datetime);
    weatherCard.appendChild(dew);
    weatherCard.appendChild(feelslike);
    weatherCard.appendChild(humidity);
    weatherCard.appendChild(pressure);
    weatherCard.appendChild(temp);
    weatherCard.appendChild(windspeed);

    weatherCard.style.backgroundColor = "rgba(100, 100, 100, 0.8)";
    contentDiv.appendChild(weatherCard);
}
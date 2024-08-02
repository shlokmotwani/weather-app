import "./style.css";

const URL_LEFT =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const URL_RIGHT =
  "?unitGroup=metric&key=HRAC76VQCCEJMMRPLCSUF98AF&contentType=json";

let weatherReportJSON;
let weatherReportJSONExtracted = {};

async function getWeatherReport(location) {
  const url = URL_LEFT + location + URL_RIGHT;
  let result = await fetch(url, { mode: "cors" });
  weatherReportJSON = await result.json();
}

function extractNecessaryDetails() {
  weatherReportJSONExtracted.resolvedAddress =
    weatherReportJSON.resolvedAddress;
  weatherReportJSONExtracted.timezone = weatherReportJSON.timezone;
  weatherReportJSONExtracted.conditions =
    weatherReportJSON.currentConditions.conditions;
  weatherReportJSONExtracted.icon = weatherReportJSON.currentConditions.icon;
  weatherReportJSONExtracted.datetime =
    weatherReportJSON.currentConditions.datetime;
  weatherReportJSONExtracted.dew = weatherReportJSON.currentConditions.dew;
  weatherReportJSONExtracted.feelslike =
    weatherReportJSON.currentConditions.feelslike;
  weatherReportJSONExtracted.humidity =
    weatherReportJSON.currentConditions.humidity;
  weatherReportJSONExtracted.pressure =
    weatherReportJSON.currentConditions.pressure;
  weatherReportJSONExtracted.temp = weatherReportJSON.currentConditions.temp;
  weatherReportJSONExtracted.windspeed =
    weatherReportJSON.currentConditions.windspeed;
  weatherReportJSONExtracted.uvindex =
    weatherReportJSON.currentConditions.uvindex;
  weatherReportJSONExtracted.sunrise =
    weatherReportJSON.currentConditions.sunrise;
  weatherReportJSONExtracted.sunset =
    weatherReportJSON.currentConditions.sunset;
}

function loadWeatherCard() {
  loadTopLeftCard();
  loadTopRightCard();
}

function loadTopLeftCard() {
  let topLeftDiv = document.querySelector("#top-left");
  topLeftDiv.innerHTML = "";

  let itemsData = [
    {
      value: weatherReportJSONExtracted.conditions,
    },
    {
      value: weatherReportJSONExtracted.icon,
    },
    {
      value: weatherReportJSONExtracted.temp,
    },
    {
      value: weatherReportJSONExtracted.resolvedAddress,
    },
    {
      value: weatherReportJSONExtracted.datetime,
    },
  ];

  itemsData.forEach((item) => {
    let itemDiv = document.createElement("div");
    itemDiv.textContent = item.value;

    itemDiv.style.cssText = `
    border: 1px solid white;
    text-align: center;
    padding: 10px;
    width: 100%;
    `;

    topLeftDiv.appendChild(itemDiv);
  });

  let location = document.createElement("input");
  location.placeholder = "Location";
  location.style.cssText = `
  color: black;
  padding: 3px;
  font-size: 1.0rem;
  border: 1px solid white;
  text-align: center;
  padding: 10px;
  width: 100%;`;

  location.addEventListener("keypress", async (event) => {
    if (event.key == "Enter") {
      fetchAndDisplayWeatherReport(location.value);
    }
  });

  topLeftDiv.appendChild(location);
}

function loadTopRightCard() {
  let topRightDiv = document.querySelector("#top-right");
  topRightDiv.innerHTML = "";

  let itemsData = [
    {
      text: "Feels like",
      value: weatherReportJSONExtracted.feelslike,
    },
    {
      text: "Humidity",
      value: weatherReportJSONExtracted.humidity,
    },
    {
      text: "UV Index",
      value: weatherReportJSONExtracted.uvindex,
    },
    {
      text: "Wind Speed",
      value: weatherReportJSONExtracted.windspeed,
    },
    {
      text: "Sunrise",
      value: weatherReportJSONExtracted.sunrise,
    },
    {
      text: "Sunset",
      value: weatherReportJSONExtracted.sunset,
    },
  ];

  itemsData.forEach((item) => {
    let itemDiv = document.createElement("div");
    let itemText = document.createElement("span");
    let itemValue = document.createElement("div");

    itemDiv.style.cssText = `
    display: flex;
    border: 1px solid white;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    width: 100%;
    `;

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemValue);

    itemText.textContent = item.text;
    itemValue.textContent = item.value;

    topRightDiv.appendChild(itemDiv);
  });
}

async function fetchAndDisplayWeatherReport(location) {
  await getWeatherReport(location);
  console.log(weatherReportJSON);
  extractNecessaryDetails();
  loadWeatherCard();
}

fetchAndDisplayWeatherReport("Bilaspur");

"use strict";

let today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let cityLocation = document.getElementById("location");
let cityDegree = document.getElementById("todayDegree");
let todayWeatherSign = document.getElementById("todayIcon");
let todayWord = document.getElementById("todayDescription");
let todayWind = document.getElementById("wind");
let todayCompass = document.getElementById("compass");
let next_day = document.querySelector(".nextDay");
let nextDaySign = document.querySelector(".nextDayIcon");
let nextDayDegreeMax = document.querySelector(".maxDegree");
let nextDayDegreeMin = document.querySelector(".minDegree");
let NextDayDecription = document.querySelector(".nextDescription");

let afterDay = document.querySelector(".afterDay");
let afterDayIcon = document.querySelector(".afterDayIcon");
let afterDayMax = document.querySelector(".maxDegreeAfter");
let afterDayMin = document.querySelector(".minDegreeAfter");
let afterDayDesc = document.querySelector(".afterDescription");



let search = document.getElementById("searchBar");
let citySearching = "cairo";
let apiResponse;
let responseData;
let monthName = [
  "jan",
  "feb",
  "march",
  "april",
  "may",
  "june",
  "july",
  "aug",
  "sep",
  "october",
  "november",
  "december",
];

let days = [
 
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

async function getApiResponse() {
  apiResponse = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=0783e049a98441a2bf2142823232402&q=${citySearching}&days=3`
  );
  responseData = await apiResponse.json();

  console.log(responseData);
  displayToday();
 displayNextDay();
 displayAfterTomorrow()
}

getApiResponse();

function displayToday() {
  let date = new Date();
  console.log(date.getDay());
  today.innerHTML = days[date.getDay()];
  
  todayDate.innerHTML = `${date.getDay()} ${monthName[date.getMonth()]}`;

  cityLocation.innerHTML = responseData.location.name;
  cityDegree.innerHTML = `${responseData.current.temp_c}°C`;

  todayWeatherSign.setAttribute(
    "src",
    `https:${responseData.current.condition.icon}`
  );
  todayWord.innerHTML = responseData.current.condition.text;
  todayWind.innerHTML = `${responseData.current.wind_kph} Kph`;
  todayCompass.innerHTML = responseData.current.condition.text;
}

 function displayNextDay() {



    next_day.innerHTML =days[new Date(responseData.forecast.forecastday[1].date).getDay()];
    nextDaySign.setAttribute("src",`https:${responseData.forecast.forecastday[1].day.condition.icon}`);
    nextDayDegreeMax.innerHTML =responseData.forecast.forecastday[1].day.maxtemp_c;
    nextDayDegreeMin.innerHTML =responseData.forecast.forecastday[1].day.mintemp_c;
    NextDayDecription.innerHTML =responseData.forecast.forecastday[1].day.condition.text;
  
}


function displayAfterTomorrow() {



  afterDay.innerHTML =days[new Date(responseData.forecast.forecastday[2].date).getDay()];
  afterDayIcon.setAttribute("src",`https:${responseData.forecast.forecastday[ 2].day.condition.icon}`);
  afterDayMax.innerHTML =`Maximum: ${responseData.forecast.forecastday[2].day.maxtemp_c} °C`;
  afterDayMin.innerHTML =`Minimu:${responseData.forecast.forecastday[2].day.mintemp_c}`;
  afterDayDesc.innerHTML =responseData.forecast.forecastday[2].day.condition.text;
  
}

search.addEventListener("keyup", function () {
  citySearching = search.value;
  console.log(citySearching);
  getApiResponse(citySearching);
});

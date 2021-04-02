/* eslint-disable no-undef */
'use strict';

const express = require('express'); // Load the express module into our script
const cors = require('cors');
require('dotenv').config();
const app = express(); // Creates a server application.
const PORT = process.env.PORT || 3000;
app.use(cors()); // Allow access to api from another domain

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


app.get('/location',(handleLocation));
app.get('/weather',(handleWeather));

function handleLocation (req , res){ 
  let query = req.query.city;
  let locationObj = getLocationData(query);
  try { res.status(200).send(locationObj)}
  catch(error){res.status(500).send('An error occured '+error)}
}

function handleWeather (req , res){ 
  let query = req.query.city;
  let weatherObj = getWeatherData(query);
  try { res.status(200).send(weatherObj)}
  catch(error){res.status(500).send('An error occured '+error)}
}

function getLocationData(query) {
  let locationData = require ('./data/location.json');
  let displayName= locationData[0].display_name;
  let latitude=locationData[0].lat;
  let longitude=locationData[0].lon;
  let resObj= new CityLocation (query,displayName,latitude,longitude);
  return resObj;
};

function getWeatherData(query) {
  let weatherData = require('./data/weather.json');
  let weatherArray=[];
  for (let i=0; i<weatherData.data.length; i++){
    let weatherDesc= weatherData.data[i].weather['description'];
    let time= weatherData.data[i].datetime;
    time = time.replace('-','/');
    let date = new Date(time);
    let dateStr = date.toString();
    let newDate = dateStr.slice('',16);
    let resObj= new CityWeather (query, weatherDesc, newDate);
    weatherArray.push(resObj);
  }
  return weatherArray;
}

function CityLocation (query,displayName,lat,long){
  this.search_query=query;
  this.display_name=displayName;
  this.latitude=lat;
  this.longitude=long;
}


function CityWeather (query, weatherDesc, time) {
  this.search_query= query;
  this.forecast=weatherDesc;
  this.time=time;
}

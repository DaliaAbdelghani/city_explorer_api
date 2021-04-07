'use strict';

const express = require('express'); // Load the express module into our script
const cors = require('cors');
require('dotenv').config();
const app = express(); // Creates a server application.
const PORT = process.env.PORT || 3000;

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
app.use(cors()); // Allow access to api from another domain
const superagent = require('superagent');


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


// function getLocationData(query) {
//   let locationData = require ('./data/location.json');
//   let displayName= locationData[0].display_name;
//   let latitude=locationData[0].lat;
//   let longitude=locationData[0].lon;
//   let resObj= new CityLocation (query,displayName,latitude,longitude);
//   return resObj;
// };


function getLocationData(request, response) {
  let city = request.query.city;
  let key = process.env.GEOCODE_API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json&limit=1`;

  // Caching
  // Check to see if we have this url saved in our locations variable
  if (locations[url]) {
    // send the data we currently have
    response.send(locations[url]);
  } else {
    superagent.get(url)
      .then(data => {
        const geoData = data.body[0]; // first one ...
        console.log(data);
        const location = new Location(city, geoData);
        // Save that object in our location object with the url as the key
        locations[url] = location;
        response.send(location);
      })
      .catch(() => {
        console.log('ERROR', error);
        response.status(500).send('So sorry, something went wrong.');
      });
  }
}

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.display_name;
  this.latitude = geoData.lat;
  this.longitude = geoData.lon;
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


/*

// Route Definitions
app.get('/location', locationHandler);
app.get('/restaurants', restaurantHandler);
app.get('/places', placesHandler);
app.use('*', notFoundHandler);



function restaurantHandler(request, response) {

  const url = 'https://developers.zomato.com/api/v2.1/geocode';
  const queryParams = {
    lat: request.query.latitude,
    lng: request.query.longitude,
  };

  superagent.get(url)
    .set('user-key', process.env.ZOMATO_API_KEY)
    .query(queryParams)
    .then((data) => {
      const results = data.body;
      const restaurantData = [];
      results.nearby_restaurants.forEach(entry => {
        restaurantData.push(new Restaurant(entry));
      });
      response.send(restaurantData);
    })
    .catch(() => {
      console.log('ERROR', error);
      response.status(500).send('So sorry, something went wrong.');
    });

}

function Restaurant(entry) {
  this.restaurant = entry.restaurant.name;
  this.cuisines = entry.restaurant.cuisines;
  this.locality = entry.restaurant.location.locality;
}

function placesHandler(request, response) {

  const lat = request.query.latitude;
  const lng = request.query.longitude;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`;

  const queryParams = {
    access_token: process.env.MAPBOX_API_KEY,
    types: 'poi',
    limit: 10,
  };

  superagent.get(url)
    .query(queryParams)
    .then((data) => {
      const results = data.body;
      const places = [];
      results.features.forEach(entry => {
        places.push(new Place(entry));
      });
      response.send(places);
    })
    .catch((error) => {
      console.log('ERROR', error);
      response.status(500).send('So sorry, something went wrong.');
    });
}

function Place(data) {
  this.name = data.text;
  this.type = data.properties.category;
  this.address = data.place_name;
}


function notFoundHandler(request, response) {
  response.status(404).send('huh?');
}

// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));


*/


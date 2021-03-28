
const express = require ('express'); // loading express module  --> in the terminal => npm install express

const app = express(); // the new created server
const PORT = 3000;

const handleRequest = (request, response) => {
  const weather = require('./data/weather.json');
  weather.forEach(element => {
    if ( weather === request.query.weather){
      response.status(200).json(weather);
    } 
  });
  response.json(weather);

};

app.get ('/weather', handleRequest);

app.listen( PORT, () =>{

  console.log (`server is listening on port ${PORT}`)

});

// const dotenv = require ('dotenv'); 
// dotenv.config();
// const express = require ('express'); // loading express module  --> in the terminal => npm install express
// const PORT = process.env.PORT;
// const cors = require ('cors');

// let app = express(); // the new created server
// app.use(cors());


// app.get ('/location', handleLocation);

// function handleLocation(req, res){
//  let inquiry = req.query.city;
//  let location = getLocation(inquiry);
//  try {
//   res.status.(200).send(location);
//   }
// catch(error) {
//   res.status.(500).send(${error});
//   }
// }

// // const handleRequest = (request, response) => {
// //   const weather = require('./data/weather.json');
// //   weather.forEach(element => {
// //     if ( weather === request.query.weather){
// //       response.status(200).json(weather);
// //     } 
// //   });
// //   response.json(weather);

// // };

// // app.get ('/weather', handleWeather);

// // app.get ('*', handleErrors);

// app.listen( PORT, () =>{
//   console.log (`server is listening on port ${PORT}`);
// });

// app.get ('/locat', handlehomepage);//route

// function handlehomepage ( req, res) {
//  res.send('Hello')
// };

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


// app.get('/location', handleLocation); // route

//  function handleLocation (req, res) {
//  let inquiry = req.query.city;
//  let location = getLocation(inquiry);
// try {
// res.status.(200).send(location);
// }
// catch(error) {
// res.status.(500).send(${error});
//  }
// };

// function getLocation(inquiry) {
// let locationsData = require ('./data/location.json');
// let locations = JSON.parse(locationsData);
// let lat = locations.lat;
// let long = locations.lon;
// }

// const handleRequest = (request, response) => {
//   console.log(request.query);
//   response.send('ok');
// };

// const handleAbout = (request, response) => {
//   const author = process.env.AUTHOR;
//   console.log(author);
//   response.send(`<h1 style="color: green">${author}</h1>`);
// };

// Setup a route to handle
// handle the get request to the '/' path
// www.example.com => wwww.example.com/ => '/'


// function handleRequest (re)

// // www.example.com/about =>  '/about'
// app.get('/about', handleAbout);

// app.get('/students', (req, res) => {
//   const students = require('./data/students.json');
//   // console.log(req);
//   let foundStudent = null;
//   // return the data for the student whose name matches the name from the query
//   students.forEach(student => {
//     if (student.name === req.query.name) {
//       foundStudent = student;
//     }
//   });
//   if (foundStudent) {
//     res.status(200).json(foundStudent);
//   } else {
//     // Did not find out student
//     res.status(404).send('Student Not Found');
//   }
// });
// app.get('/all-students', (req, res) => {
//   const students = require('./data/students.json');
//   res.status(200).json(students);
// });


// request are handled by callbacks
// express will pass paramter to the callbacks




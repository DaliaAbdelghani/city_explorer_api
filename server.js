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

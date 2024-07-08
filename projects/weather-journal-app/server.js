// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const dataEndpoint = '/api/data';
require('dotenv').config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/* Routes */
//GET weather
app.get('/api/weather', (req, res) => {
    console.log('GET /api/weather');
    const weather = '';
    getWeather(req.query.zip)
      .then(data => res.send(data))
      .catch(error => {
        console.log(error.message);
        res.status(500).send({ message: `could not get weather: ${error.message}`});
      });
});

const getWeather = async (zipCode) => {
    const url = `${weatherEndpoint}?zip=${zipCode}&units=imperial&APPID=${process.env.apiKey}`;
    const response = await fetch(url);
    const resJson = await response.json();
    if (!response.ok) {
        throw new Error(resJson.message);
    }
    
    return resJson;
};

//GET projectData
app.get('/api/data', (req, res) => {
    console.log('GET /api/data');

    res.send(projectData);    
});

//POST projectData
app.post('/api/data', (req, res) => {
    console.log('POST /api/data');

    const newData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };

    console.log('data received: ', newData);
    Object.assign(projectData, newData);

    res.send('post ok');
});


// Setup Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
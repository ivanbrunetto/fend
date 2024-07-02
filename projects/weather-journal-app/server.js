// Setup empty JS object to act as endpoint for all routes
const projectData = {};

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
//GET projectData
app.get('/api/getData', (req, res) => {
    console.log('/api/getData');
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
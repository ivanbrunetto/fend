/* Global Variables */
const weatherEndpoint = '/api/weather';
const dataEndpoint = '/api/data';

//Function to process the click event
const processGenerateClick = () => {
    const zipCode = document.querySelector('#zip').value;
    
    getWeather(zipCode)
      .then(weather => postData(buildObj(weather))) 
      .then(() => retrieveData())
      .then(data => updateUI(data))
      .catch(error => {
        console.log(error.message);
        alert('Could not generate info');
      });
};

//asynchronouus function to get weather info
const getWeather = async (zipCode) => {
    const url = `${weatherEndpoint}?zip=${zipCode}`;
    const response = await fetch(url);
    const resJson = await response.json();
    if (!response.ok) {
        throw new Error(resJson.message);
    }
    return resJson;
};

//asynchronous function to post data to app server
const postData = async (data) => {
    const request = new Request(dataEndpoint, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return fetch(request);
};

//asynchronous function to get data from app server
const retrieveData = () => {
    return fetch(dataEndpoint)
            .then(response => response.json());
};

//aux function to build the object to be sent to app server
const buildObj = (weather) => {
    const temperature = Math.round(weather.main.temp);
    // Create a new date instance dynamically with JS
    const d = new Date();
    const date = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
    const userResponse = document.querySelector('#feelings').value;
    const obj = { 
        temperature: temperature,
        date: date,
        userResponse: userResponse,
    };

    return obj;
};

//update the UI with the data values
const updateUI = (data) => {
    document.querySelector('#date').innerHTML = `Date: ${data.date}`;
    document.querySelector('#temp').innerHTML = `Temp: ${data.temperature}`;
    document.querySelector('#content').innerHTML = `User feelings: ${data.userResponse}`;
};

//add the click event listener
document.querySelector('#generate').addEventListener('click', processGenerateClick);

/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '8b8a50f0d80fea595dc71924ff6a54d9';


const processGenerateClick = () => {
    const zipCode = document.querySelector('#zip').value;
    
    getWeather(zipCode)
      .then(weather => postData('/api/data', buildObj(weather))) 
      .then(postResponse => updateUI(postResponse))
      .catch(error => alert('Could not generate info', error));
};

const getWeather = async (zipCode) => {
    const url = `${baseUrl}?zip=${zipCode}&units=imperial&APPID=${apiKey}`;
    const response = await fetch(url);
    const resJson = await response.json();
    if (!response.ok) {
        console.log("Problem with openweathermap api", resJson);
        throw new Error(response);
    }
    return resJson;
};

const postData = async (url, data) => {
    const request = new Request(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    return fetch(request)
            .then(response => response.json());
};


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

const updateUI = (data) => {
    document.querySelector('#date').innerHTML = data.date;
    document.querySelector('#temp').innerHTML = data.temperature;
    document.querySelector('#content').innerHTML = data.userResponse;
};

document.querySelector('#generate').addEventListener('click', processGenerateClick);

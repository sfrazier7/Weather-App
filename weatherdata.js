const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentweatheritemsEl = document.getElementById('current-weather-items');
const place = document.getElementById('place');
const currentTempEl = document.getElementById('temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const inputValue = document.getElementById('inputValue')
const API_KEY = '38a633b66d909acd9ed59271b56dc0ca';
let zipcode = '';
const button = document.getElementById('submit')

setInterval(() => {
    const time = new Date();    
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12Hr = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const minutesUnder10 = minutes < 10 ? '0' + minutes: minutes;
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12Hr+ ':' +minutesUnder10+ '' +`<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' +date+ ' ' + months[month]

}, 1000);

function getWeatherData () {
    
    fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&units=imperial&appid=' +API_KEY)
    .then(res => res.json()).then(data => {
        console.log(data)
        showWeatherData(data);
    })
    .catch(err => alert("Incorrect ZipCode!"))
}

function showWeatherData (data) {
    let {feels_like, humidity, pressure, temp, temp_max, temp_min} = data.main;
    let {name} = data

    currentweatheritemsEl.innerHTML =
    `<div class="weather-item">
        <div>Humidity:</div>
        <div>${humidity}</div>
    </div>
    <div class="weather-item">
        <div>Pressure:</div>
        <div>${pressure}</div>
    </div>`;

    currentTempEl.innerHTML =
    `<h4>Temperature</h4>
    <div class="weather-item">
        <div>Feels Like:</div>
        <div>${feels_like} F</div>
    </div>
    <div class="weather-item">
        <div>Temp:</div>
        <div>${temp} F</div>
    </div>
    <div class="weather-item">
        <div>Temp-Min:</div>
        <div>${temp_min} F</div>
    </div>
    <div class="weather-item">
        <div>Temp-Max:</div>
        <div>${temp_max} F</div>
    </div>`

    place.innerHTML =
    `<div>${name}</div>`
}

button.addEventListener('click', () => {
    zipcode = inputValue.value
    getWeatherData(zipcode) 
})
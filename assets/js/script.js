// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
var weatherDisplay = document.getElementById('weatherDisplay');
var futureForecast = document.getElementById('futureForecast');
var date = document.getElementById('date1');
var day = document.getElementById('day1');

function futureWeather(forecast) {
    var currentDay = document.createElement('div');
    var currentDate = new Date(forecast[0].dt * 1000).totalLocaleDateString('en-US');
    currentDay.textContent = currentDate;
    futureForecast.appendChild(currentDay);
    for (i = 0; i < 5; i++) {

        var futureDay = document.createElement('div');
        var futureDate = new Date(forecast[i + 1].dt * 1000).totalLocaleDateString('en-US');
        futureDay.textContent = futureDate;
        document.getElementById(`date${i + 1}`).appendChild(futureDay)

        var futureTemp = data.future.temp;
        console.log(forecast[i].temp)
        var temp = document.createElement('div')
        temp.textContent = 'Temp' + ' ' + futureTemp + ' ' + '°F';
        document.getElementById(`day${i + 1}`).appendChild(futureTemp)

        var futureWind = data.future.wind_speed;
        console.log(forecast[i].wind_speed)
        var wind = document.createElement('div')
        wind.textContent = 'Wind Speed' + ' ' + futureWind + ' ' + 'mph';
        document.getElementById(`day${i + 1}`).appendChild(futureWind)

        var futureHumidity = data.future.humidity;
        console.log(forecast[i].humidity)
        var humidity = document.createElement('div')
        humidity.textContent = 'humidity' + ' ' + futureHumidity + ' ' + '%';
        document.getElementById(`day${i + 1}`).appendChild(futureHumidity)
    }
}

function weatherApi(latitude, longitude) {
    var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?&lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly&appid=71938476f1f6ff4665e10e68dc4a1794&units=imperial'
    fetch(weatherApi).then(function (respone) {
        if (respone.ok) {
            respone.json().then(function (data) {
                console.log(data);

                var currentTemp = data.current.temp;
                var tempData = document.createElement('div')
                tempData.textContent = 'Temp' + ' ' + currentTemp + ' ' + '°F';
                weatherDisplay.appendChild(tempData)

                var currentWind = data.current.wind_speed;
                var windData = document.createElement('div')
                windData.textContent = 'Wind Speed' + ' ' + currentWind + ' ' + 'mph';
                weatherDisplay.appendChild(windData)

                var currentHumidity = data.current.humidity;
                var humidityData = document.createElement('div')
                humidityData.textContent = 'humidity' + ' ' + currentHumidity + ' ' + '%';
                weatherDisplay.appendChild(humidityData)

                var currentUvi = data.daily[0].uvi;
                var uviData = document.createElement('div')
                uviData.textContent = 'UVI' + ' ' + currentUvi + ' ';
                // if (currentUvi < 3) {
                //     uvi.classList.add('bg-success')
                // }
                // else if (currentUvi < 7) {
                //     uvi.classList.add('bg-warning')
                // }
                // else {
                //     uvi.classList.add('bg-danger')
                // }
                weatherDisplay.appendChild(uviData)

                futureWeather(data.daily);
            })
        }
    })
};

function coord(cityName) {
    var cityLocation = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=71938476f1f6ff4665e10e68dc4a1794';
    fetch(cityLocation).then(function (respone) {
        if (respone.ok) {
            respone.json().then(function (data) {
                console.log(data)
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                weatherApi(lat, lon)
            })
        }
    })
};

coord();
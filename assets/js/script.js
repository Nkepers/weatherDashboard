var weatherDisplay = document.getElementById('weatherDisplay');
var futureForecast = document.getElementById('futureForecast');
var date = document.getElementById('date1');
var day = document.getElementById('day1');
var search = document.getElementById('search');
var searchBtn = document.getElementById('searchBtn');
var citySearch = document.getElementById('citySearch');

function futureWeather(forecast) {
    futureForecast.innerHTML = "";
    var currentDay = document.createElement('div');
    var currentDate = new Date(forecast[0].dt * 1000).toLocaleDateString('en-US');
    console.log(currentDate)
    currentDay.textContent = currentDate;
    futureForecast.appendChild(currentDay);

    for (i = 0; i < 5; i++) {

        var searchDate = document.getElementById(`date${i + 1}`)
        searchDate.innerHTML = "";

        var searchDay = document.getElementById(`day${i + 1}`);
        searchDay.innerHTML = "";

        var futureWeatherIconUrl = `https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`
        console.log(futureWeatherIconUrl);
        var weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", futureWeatherIconUrl);
        weatherIcon.classList.add("icons");
        document.getElementById(`day${i + 1}`).appendChild(weatherIcon);

        var futureDay = document.createElement('div');
        var futureDate = new Date(forecast[i + 1].dt * 1000).toLocaleDateString('en-US');
        futureDay.textContent = futureDate;
        document.getElementById(`date${i + 1}`).appendChild(futureDay)


        var temp = document.createElement('div')
        temp.textContent = 'Temp' + ' ' + forecast[i].temp.day + ' ' + '°F';
        document.getElementById(`day${i + 1}`).appendChild(temp)


        var wind = document.createElement('div')
        wind.textContent = 'Wind Speed' + ' ' + forecast[i].wind_speed + ' ' + 'mph';
        document.getElementById(`day${i + 1}`).appendChild(wind)


        var humidity = document.createElement('div')
        humidity.textContent = 'humidity' + ' ' + forecast[i].humidity + ' ' + '%';
        document.getElementById(`day${i + 1}`).appendChild(humidity)
    }
};

function weatherApi(latitude, longitude) {
    var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall?&lat=' + latitude + '&lon=' + longitude + '&exclude=minutely,hourly&appid=71938476f1f6ff4665e10e68dc4a1794&units=imperial'
    fetch(weatherApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                weatherDisplay.innerHTML = "";

                var weatherIcon = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
                console.log(weatherIcon);
                var iconUrl = document.createElement("img")
                iconUrl.setAttribute("src", weatherIcon);
                iconUrl.classList.add("icons");
                weatherDisplay.appendChild(iconUrl)

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
                uviData.textContent = 'UVI' + ' ' + currentUvi;

                if (currentUvi < 3) {
                    uviData.classList.add('bg-success')
                }
                else if (currentUvi < 7) {
                    uviData.classList.add('bg-warning')
                }
                else {
                    uviData.classList.add('bg-danger')
                }
                weatherDisplay.appendChild(uviData)

                console.log(data.daily)
                futureWeather(data.daily);
            })
        }
    })
};

function coord() {
    let cityName = search.value
    displaySavedStorage();
    console.log(cityName)
    var cityLocation = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=71938476f1f6ff4665e10e68dc4a1794';
    fetch(cityLocation).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                weatherApi(lat, lon)
            })
        }
    })
};

var displayCity = function (searchTerm) {
    var saveButton = document.createElement("button");
    saveButton.textContent = searchTerm;
    saveButton.classList.add("row");
    saveButton.addEventListener("click", function () {
        console.log("this is some text", this);
        citySearch.textContent = this.textContent;
        coord(this.textContent);
        console.log(this.textContent);
    });
    saveCity.append(saveButton);
};

var saveStorage = function () {
    var priorCities = JSON.parse(localStorage.getItem("location")) || [];
    priorCities.push(search.value);
    localStorage.setItem("location", JSON.stringify(priorCities));
    console.log("this", priorCities);
};

var displaySavedStorage = function () {
    var priorCities = JSON.parse(localStorage.getItem("location")) || [];
    for (var i = 0; i < priorCities.length; i++) {
        var priorCitySearch = document.createElement("button");
        priorCitySearch.textContent = priorCities[i];
        priorCitySearch.classList.add("row");
        priorCitySearch.addEventListener("click", function () {
        console.log("this is some text", this);
        citySearch.textContent = this.textContent;
        coord(this.textContent);
        });
        saveCity.append(priorCitySearch);
    }

};

saveStorage();
searchBtn.addEventListener('click', coord)
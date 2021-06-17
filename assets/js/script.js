var userSearch = document.querySelector('#search');
var searchBtn = document.querySelector('#searchBtn');
var currentCity = document.querySelector('#name');
var currentWeatherDisplay =document.querySelector('#display');








searchBtn.addEventListener('click', function getCurrentWeather() {
    var userCity = userSearch.value.trim();
    console.log(userCity);

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
    .then(response => response.json())
    .then(data => {
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
        .then(repsonse => repsonse.json())
        .then(function displayWeather(data) {

            var name = userCity;
            var temp = data.current.temp;
            var feels_like = data.current.feels_like;
            var humidity = data.current.humidity;

            console.log(name);


            currentCity.textContent = name;
            var cityCurrentWeather = document.querySelector('#current-city');
            cityCurrentWeather.textContent = "Temperature:" + temp + "Feels Like:" + feels_like + "Humidity";
        
        });
       
    });
});

// module.exports = getCurrentWeather, displayCurrentWeather;
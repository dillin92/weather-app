var userSearch = document.querySelector('#search');
var searchBtn = document.querySelector('#searchBtn');
var currentCity = document.querySelector('#name');
var currentWeatherDisplay =document.querySelector('#display');






function displayCurrentWeather(data) {


    var name= data.name;
    var temp= data.main.temp;
    var feels_like= data.main.feels_like;
    var humidity= data.main.humidity;
    var currentWeather = temp, feels_like, humidity;

    console.log(name, temp, feels_like, humidity);

    var latLon = data.coord;
    console.log(latLon);

    currentCity.innerHTML = name;
    currentWeatherDisplay.innerHTML = "TEMPERATURE:" + currentWeather;


};


searchBtn.addEventListener('click', function getCurrentWeather() {
    var userCity = userSearch.value.trim();
    console.log(userCity);

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6').then(repsonse => repsonse.json()).then(function(data) {
        console.log(data);
        displayCurrentWeather(data);
    });
});
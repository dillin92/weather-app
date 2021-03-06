var userSearch = document.querySelector('#search');
var searchBtn = document.querySelector('#searchBtn');
var currentCity = document.querySelector('#name');
var currentWeatherDisplay =document.querySelector('#current-weather');
var innerCardBody = document.querySelector('#display');
var cities = [];
var savedCities = localStorage.getItem('cities');
var cityContainer = document.querySelector('#city-container');

searchBtn.addEventListener('click', function getCurrentWeather() {

    
    var userCity = userSearch.value.trim();
    console.log(userCity);

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
    .then(response => response.json())
    .then(async data => {
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        const repsonse = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6');
        const data_1 = await repsonse.json();
        //current weather variables
        var capitalCity = userCity.charAt(0).toUpperCase() + userCity.slice(1);
        var temp = data_1.current.temp.toFixed(0);
        var feels_like = data_1.current.feels_like.toFixed(0);
        var humidity = data_1.current.humidity.toFixed(0);
        var uvi = data_1.current.uvi;
        let currentWindspeed = data_1.current.wind_speed.toFixed(0);
        let timestamp = data_1.current.dt;
        let dateObj = new Date(timestamp * 1000);
        let month = dateObj.getMonth() + 1;
        let dateVar = dateObj.getDate();
        let year = dateObj.getFullYear();
        let date = month + "/" + dateVar + "/" + year;
        const iconCode = data_1.current.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var card = document.createElement('div');
        card.className = 'current-card';
        card.setAttribute('id', 'current-weather-card');
        var cardDivider = document.createElement('div');
        cardDivider.className = 'card-divider';
        var cardBody = document.createElement('div');
        cardBody.className = 'current-weather-card';
        card.appendChild(cardDivider);
        card.appendChild(cardBody);
        var nameEl = document.createElement('h1');
        nameEl.className = 'name';
        nameEl.setAttribute('id', 'name');
        nameEl.textContent = capitalCity;
        cardDivider.appendChild(nameEl);
        var dateEl = document.createElement('h1');
        dateEl.className = 'date';
        dateEl.setAttribute('id', 'date');
        dateEl.textContent = date;
        cardDivider.appendChild(dateEl);
        var forecastIconEl = document.createElement('img');
        forecastIconEl.className = 'icon';
        forecastIconEl.setAttribute('src', iconUrl);
        forecastIconEl.textContent = "Temp:" + temp + '??F';
        cardDivider.appendChild(forecastIconEl);
        var forecastMaxTempEl = document.createElement('h3');
        forecastMaxTempEl.className = 'max-temp';
        forecastMaxTempEl.setAttribute('id', 'max-temp');
        forecastMaxTempEl.textContent = "Feels Like:" + feels_like + '??F';
        cardDivider.appendChild(forecastMaxTempEl);
        var forecastHumidityEl = document.createElement('h2');
        forecastHumidityEl.className = 'min-temp';
        forecastHumidityEl.setAttribute('id', 'min-temp');
        forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
        cardDivider.appendChild(forecastHumidityEl);
        var forecastWindSpeedEl = document.createElement('h2');
        forecastWindSpeedEl.classname = "wind-speed";
        forecastWindSpeedEl.setAttribute("id", "wind-speed");
        forecastWindSpeedEl.textContent = "Wind-speed:" + currentWindspeed + "MPH";
        cardDivider.appendChild(forecastWindSpeedEl);
        var currentUviEl = document.createElement('div');
        currentUviEl.setAttribute("id", "uvi");
        currentUviEl.textContent = "UV Index:" + uvi;
        cardDivider.appendChild(currentUviEl);
        currentWeatherDisplay.appendChild(card);
        
    }).then(saveCity()).then(displaySavedCity());
 
    clearDisplay();
});

searchBtn.addEventListener('click', function getForecast() {
    var userCity = userSearch.value.trim();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
    .then(response => response.json())
    .then(async data => {
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        const repsonse = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6');
        const data_1 = await repsonse.json();
        //Daily Weather Card's
        for (let i = 0; i < 5 && i < data_1.daily.length; i++) {
            var day = data_1.daily[i + 1];

            let timestamp = day.dt;
            let dateObj = new Date(timestamp * 1000);
            let month = dateObj.getMonth() + 1;
            let dateVar = dateObj.getDate();
            let year = dateObj.getFullYear();
            let date = month + "/" + dateVar + "/" + year;


            var maxTemp = day.temp.max.toFixed(0);
            var minTemp = day.temp.min.toFixed(0);
            var humidity = day.humidity.toFixed(0);
            var windspeed = day.wind_speed.toFixed(0);

            const iconCode = day.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";


            var card = document.createElement('div');
            card.className = 'card';
            var cardDivider = document.createElement('div');
            cardDivider.className = 'card-divider';
            var cardBody = document.createElement('div');
            cardBody.className = 'card-body text-white';

            card.appendChild(cardDivider);
            card.appendChild(cardBody);

            var dateEl = document.createElement('h1');
            dateEl.className = 'date';
            dateEl.setAttribute('id', 'date');
            dateEl.textContent = date;
            cardDivider.appendChild(dateEl);


            var forecastIconEl = document.createElement('img');
            forecastIconEl.className = 'icon';
            forecastIconEl.setAttribute('src', iconUrl);
            forecastIconEl.textContent = "High:" + maxTemp + '??F';
            cardDivider.appendChild(forecastIconEl);



            var forecastMaxTempEl = document.createElement('h3');
            forecastMaxTempEl.className = 'max-temp';
            forecastMaxTempEl.setAttribute('id', 'max-temp');
            forecastMaxTempEl.textContent = "High:" + maxTemp + '??F';
            cardDivider.appendChild(forecastMaxTempEl);


            var forecastMinTempEl = document.createElement('h3');
            forecastMinTempEl.className = 'min-temp';
            forecastMinTempEl.setAttribute('id', 'min-temp');
            forecastMinTempEl.textContent = "Low:" + minTemp + '??F';
            cardDivider.appendChild(forecastMinTempEl);


            var forecastHumidityEl = document.createElement('h3');
            forecastHumidityEl.className = 'min-temp';
            forecastHumidityEl.setAttribute('id', 'min-temp');
            forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
            cardDivider.appendChild(forecastHumidityEl);

            var forecastWindSpeedEl = document.createElement('h3');
            forecastWindSpeedEl.classname = "wind-speed";
            forecastWindSpeedEl.setAttribute("id", "wind-speed");
            forecastWindSpeedEl.textContent = "Wind-speed:" + windspeed + "MPH";
            cardDivider.appendChild(forecastWindSpeedEl);

            innerCardBody.appendChild(card);

        }
        ;
    });

    clearDisplay();
        
});

function saveCity() {
    var userCity = userSearch.value.trim();
    var userCityObj = {
        city: userCity
    };
  

   

    console.log(userCity, userCityObj);



 
    cities.push(userCityObj);

    let newSavedCityArr= localStorage.setItem('cities', JSON.stringify(cities));
  
   
    console.log(cities, newSavedCityArr);
};

function displaySavedCity () {
    
         for(let i = 0; i < cities.length; i++) {
            var newCity = cities[cities.length -1];
            console.log(newCity)

           
            let newSavedCity = newCity.city;
            console.log(newSavedCity)
           
            var capitalNewCity = newSavedCity.charAt(0).toUpperCase() + newSavedCity.slice(1);
            
            console.log(capitalNewCity);
             };
    
        let userCitiesEl = document.createElement('button');
        userCitiesEl.setAttribute('id', 'user-cities');
        userCitiesEl.addEventListener('click', function displaySavedCityCurrentWeather () {
            
           
        
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + capitalNewCity  + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
            .then(response => response.json())
            .then(async data => {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
        
                const repsonse = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6');
                const data_1 = await repsonse.json();
                //current weather variables
                var capitalCity = newCity.charAt(0).toUpperCase() + newCity.slice(1);
                var temp = data_1.current.temp.toFixed(0);
                var feels_like = data_1.current.feels_like.toFixed(0);
                var humidity = data_1.current.humidity.toFixed(0);
                var uvi = data_1.current.uvi;
                let currentWindspeed = data_1.current.wind_speed.toFixed(0);
                let timestamp = data_1.current.dt;
                let dateObj = new Date(timestamp * 1000);
                let month = dateObj.getMonth() + 1;
                let dateVar = dateObj.getDate();
                let year = dateObj.getFullYear();
                let date = month + "/" + dateVar + "/" + year;
                const iconCode = data_1.current.weather[0].icon;
                const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var card = document.createElement('div');
                card.className = "current-card";
                var cardDivider = document.createElement('div');
                cardDivider.className = 'card-divider';
                var cardBody = document.createElement('div');
                cardBody.className = 'card-body text-white';
                card.appendChild(cardDivider);
                card.appendChild(cardBody);
                var nameEl = document.createElement('h1');
                nameEl.className = 'name';
                nameEl.setAttribute('id', 'name');
                nameEl.textContent = capitalCity;
                cardDivider.appendChild(nameEl);
                var dateEl = document.createElement('h1');
                dateEl.className = 'date';
                dateEl.setAttribute('id', 'date');
                dateEl.textContent = date;
                cardDivider.appendChild(dateEl);
                var forecastIconEl = document.createElement('img');
                forecastIconEl.className = 'icon';
                forecastIconEl.setAttribute('src', iconUrl);
                forecastIconEl.textContent = "Temp:" + temp + '??F';
                cardDivider.appendChild(forecastIconEl);
                var forecastMaxTempEl = document.createElement('h3');
                forecastMaxTempEl.className = 'max-temp';
                forecastMaxTempEl.setAttribute('id', 'max-temp');
                forecastMaxTempEl.textContent = "Feels Like:" + feels_like + '??F';
                cardDivider.appendChild(forecastMaxTempEl);
                var forecastHumidityEl = document.createElement('h2');
                forecastHumidityEl.className = 'min-temp';
                forecastHumidityEl.setAttribute('id', 'min-temp');
                forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
                cardDivider.appendChild(forecastHumidityEl);
                var forecastWindSpeedEl = document.createElement('h2');
                forecastWindSpeedEl.classname = "wind-speed";
                forecastWindSpeedEl.setAttribute("id", "wind-speed");
                forecastWindSpeedEl.textContent = "Wind-speed:" + currentWindspeed + "MPH";
                cardDivider.appendChild(forecastWindSpeedEl);
                var currentUviEl = document.createElement('div');
                currentUviEl.setAttribute("id", "uvi");
                currentUviEl.textContent = "UV Index:" + uvi;
                cardDivider.appendChild(currentUviEl);
                currentWeatherDisplay.appendChild(card);

                
       
          
            })

    
        
        });

        userCitiesEl.addEventListener('click', function displaySavedCityForecast () {

            clearDisplay();    
        
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + savedCity + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
            .then(response => response.json())
            .then(async data => {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
        
                const repsonse = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6');
                const data_1 = await repsonse.json();
                //Daily Weather Card's
                for (let i = 0; i < 5 && i < data_1.daily.length; i++) {
                    var day = data_1.daily[i + 1];

                    let timestamp = day.dt;
                    let dateObj = new Date(timestamp * 1000);
                    let month = dateObj.getMonth() + 1;
                    let dateVar = dateObj.getDate();
                    let year = dateObj.getFullYear();
                    let date = month + "/" + dateVar + "/" + year;


                    var maxTemp = day.temp.max.toFixed(0);
                    var minTemp = day.temp.min.toFixed(0);
                    var humidity = day.humidity.toFixed(0);
                    var windspeed = day.wind_speed.toFixed(0);

                    const iconCode = day.weather[0].icon;
                    const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";


                    var card = document.createElement('div');
                    card.className = 'card';
                    var cardDivider = document.createElement('div');
                    cardDivider.className = 'card-divider';
                    var cardBody = document.createElement('div');
                    cardBody.className = 'card-body text-white';

                    card.appendChild(cardDivider);
                    card.appendChild(cardBody);

                    var dateEl = document.createElement('h1');
                    dateEl.className = 'date';
                    dateEl.setAttribute('id', 'date');
                    dateEl.textContent = date;
                    cardDivider.appendChild(dateEl);


                    var forecastIconEl = document.createElement('img');
                    forecastIconEl.className = 'icon';
                    forecastIconEl.setAttribute('src', iconUrl);
                    forecastIconEl.textContent = "High:" + maxTemp + '??F';
                    cardDivider.appendChild(forecastIconEl);



                    var forecastMaxTempEl = document.createElement('h3');
                    forecastMaxTempEl.className = 'max-temp';
                    forecastMaxTempEl.setAttribute('id', 'max-temp');
                    forecastMaxTempEl.textContent = "High:" + maxTemp + '??F';
                    cardDivider.appendChild(forecastMaxTempEl);


                    var forecastMinTempEl = document.createElement('h2');
                    forecastMinTempEl.className = 'min-temp';
                    forecastMinTempEl.setAttribute('id', 'min-temp');
                    forecastMinTempEl.textContent = "Low:" + minTemp + '??F';
                    cardDivider.appendChild(forecastMinTempEl);


                    var forecastHumidityEl = document.createElement('h2');
                    forecastHumidityEl.className = 'min-temp';
                    forecastHumidityEl.setAttribute('id', 'min-temp');
                    forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
                    cardDivider.appendChild(forecastHumidityEl);

                    var forecastWindSpeedEl = document.createElement('h2');
                    forecastWindSpeedEl.classname = "wind-speed";
                    forecastWindSpeedEl.setAttribute("id", "wind-speed");
                    forecastWindSpeedEl.textContent = "Wind-speed:" + windspeed + "MPH";
                    cardDivider.appendChild(forecastWindSpeedEl);

                    innerCardBody.appendChild(card);

                }
                ;
            });   

            

        });

        userCitiesEl.textContent = capitalNewCity;
        cityContainer.appendChild(userCitiesEl);


};

function displaySavedCities () {

    let savedCitiesArr = localStorage.getItem('cities', savedCities);
     console.log(savedCitiesArr);
     var savedCitiesJson = JSON.parse(savedCitiesArr);
     console.log(savedCitiesJson);

    for(let i = 0; i < savedCitiesJson.length; i++) {
        let savedCityI = savedCitiesJson[i];
        console.log(savedCityI);
      
       let savedCity = savedCityI.city;
       console.log(savedCity);

       var capitalSavedCities = savedCity.charAt(0).toUpperCase() + savedCity.slice(1);
       
       console.log(savedCities, capitalSavedCities);
       let userCitiesEl = document.createElement('button');

        userCitiesEl.setAttribute('id', 'user-cities');
        userCitiesEl.addEventListener('click', function displaySavedCityCurrentWeather () {

            
            clearDisplay();

        
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + savedCity  + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
            .then(response => response.json())
            .then(async data => {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
        
                const repsonse = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6');
                const data_1 = await repsonse.json();
                //current weather variables
                var capitalCity = savedCity.charAt(0).toUpperCase() + savedCity.slice(1);
                var temp = data_1.current.temp.toFixed(0);
                var feels_like = data_1.current.feels_like.toFixed(0);
                var humidity = data_1.current.humidity.toFixed(0);
                var uvi = data_1.current.uvi;
                let currentWindspeed = data_1.current.wind_speed.toFixed(0);
                let timestamp = data_1.current.dt;
                let dateObj = new Date(timestamp * 1000);
                let month = dateObj.getMonth() + 1;
                let dateVar = dateObj.getDate();
                let year = dateObj.getFullYear();
                let date = month + "/" + dateVar + "/" + year;
                const iconCode = data_1.current.weather[0].icon;
                const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                var card = document.createElement('div');
                card.className = 'current-card';
                var cardDivider = document.createElement('div');
                cardDivider.className = 'card-divider';
                var cardBody = document.createElement('div');
                cardBody.className = 'card-body text-white';
                card.appendChild(cardDivider);
                card.appendChild(cardBody);
                var nameEl = document.createElement('h1');
                nameEl.className = 'name';
                nameEl.setAttribute('id', 'name');
                nameEl.textContent = capitalCity;
                cardDivider.appendChild(nameEl);
                var dateEl = document.createElement('h1');
                dateEl.className = 'date';
                dateEl.setAttribute('id', 'date');
                dateEl.textContent = date;
                cardDivider.appendChild(dateEl);
                var forecastIconEl = document.createElement('img');
                forecastIconEl.className = 'icon';
                forecastIconEl.setAttribute('src', iconUrl);
                forecastIconEl.textContent = "Temp:" + temp + '??F';
                cardDivider.appendChild(forecastIconEl);
                var forecastMaxTempEl = document.createElement('h3');
                forecastMaxTempEl.className = 'max-temp';
                forecastMaxTempEl.setAttribute('id', 'max-temp');
                forecastMaxTempEl.textContent = "Feels Like:" + feels_like + '??F';
                cardDivider.appendChild(forecastMaxTempEl);
                var forecastHumidityEl = document.createElement('h3');
                forecastHumidityEl.className = 'min-temp';
                forecastHumidityEl.setAttribute('id', 'min-temp');
                forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
                cardDivider.appendChild(forecastHumidityEl);
                var forecastWindSpeedEl = document.createElement('h3');
                forecastWindSpeedEl.classname = "wind-speed";
                forecastWindSpeedEl.setAttribute("id", "wind-speed");
                forecastWindSpeedEl.textContent = "Wind-speed:" + currentWindspeed + "MPH";
                cardDivider.appendChild(forecastWindSpeedEl);
                var currentUviEl = document.createElement('div');
                currentUviEl.setAttribute("id", "uvi");
                currentUviEl.textContent ="UV Index:" + uvi;
                cardDivider.appendChild(currentUviEl);
                currentWeatherDisplay.appendChild(card);
                
            })
        
        })

        userCitiesEl.addEventListener('click', function displaySavedCityForecast () {

            
        
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + savedCity + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
            .then(response => response.json())
            .then(async data => {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
        
                const repsonse = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6');
                const data_1 = await repsonse.json();
                //Daily Weather Card's
                for (let i = 0; i < 5 && i < data_1.daily.length; i++) {
                    var day = data_1.daily[i + 1];

                    let timestamp = day.dt;
                    let dateObj = new Date(timestamp * 1000);
                    let month = dateObj.getMonth() + 1;
                    let dateVar = dateObj.getDate();
                    let year = dateObj.getFullYear();
                    let date = month + "/" + dateVar + "/" + year;


                    var maxTemp = day.temp.max.toFixed(0);
                    var minTemp = day.temp.min.toFixed(0);
                    var humidity = day.humidity.toFixed(0);
                    var windspeed = day.wind_speed.toFixed(0);

                    const iconCode = day.weather[0].icon;
                    const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";


                    var card = document.createElement('div');
                    card.className = 'card';
                    var cardDivider = document.createElement('div');
                    cardDivider.className = 'card-divider';
                    var cardBody = document.createElement('div');
                    cardBody.className = 'card-body text-white';

                    card.appendChild(cardDivider);
                    card.appendChild(cardBody);

                    var dateEl = document.createElement('h1');
                    dateEl.className = 'date';
                    dateEl.setAttribute('id', 'date');
                    dateEl.textContent = date;
                    cardDivider.appendChild(dateEl);


                    var forecastIconEl = document.createElement('img');
                    forecastIconEl.className = 'icon';
                    forecastIconEl.setAttribute('src', iconUrl);
                    forecastIconEl.textContent = "High:" + maxTemp + '??F';
                    cardDivider.appendChild(forecastIconEl);



                    var forecastMaxTempEl = document.createElement('h3');
                    forecastMaxTempEl.className = 'max-temp';
                    forecastMaxTempEl.setAttribute('id', 'max-temp');
                    forecastMaxTempEl.textContent = "High:" + maxTemp + '??F';
                    cardDivider.appendChild(forecastMaxTempEl);


                    var forecastMinTempEl = document.createElement('h3');
                    forecastMinTempEl.className = 'min-temp';
                    forecastMinTempEl.setAttribute('id', 'min-temp');
                    forecastMinTempEl.textContent = "Low:" + minTemp + '??F';
                    cardDivider.appendChild(forecastMinTempEl);


                    var forecastHumidityEl = document.createElement('h3');
                    forecastHumidityEl.className = 'min-temp';
                    forecastHumidityEl.setAttribute('id', 'min-temp');
                    forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
                    cardDivider.appendChild(forecastHumidityEl);

                    var forecastWindSpeedEl = document.createElement('h3');
                    forecastWindSpeedEl.classname = "wind-speed";
                    forecastWindSpeedEl.setAttribute("id", "wind-speed");
                    forecastWindSpeedEl.textContent = "Wind-speed:" + windspeed + "MPH";
                    cardDivider.appendChild(forecastWindSpeedEl);

                    innerCardBody.appendChild(card);

                }
                ;
            });       
        });

        userCitiesEl.textContent = capitalSavedCities;
        cityContainer.appendChild(userCitiesEl);

            cities.push(savedCityI);

           
        };

                
        
   
};

function clearDisplay () {
    innerCardBody.innerHTML = "";
    currentWeatherDisplay.innerHTML = "";
};

function loadSavedCities () {

    localStorage.getItem(savedCities); 
    console.log(savedCities);
   
     

};

loadSavedCities();
displaySavedCities(); 

var userSearch = document.querySelector('#search');
var searchBtn = document.querySelector('#searchBtn');
var currentCity = document.querySelector('#name');
var currentWeatherDisplay =document.querySelector('#display');
var innerCardBody = document.querySelector('#display');

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
            
            //current weather variables
            var name = userCity;
            var temp = data.current.temp.toFixed(0);
            var feels_like = data.current.feels_like.toFixed(0);
            var humidity = data.current.humidity.toFixed(0);
            var uvi = data.current.uvi;
            let currentWindspeed = data.current.wind_speed.toFixed(0);

            let timestamp = data.current.dt;
            let dateObj = new Date(timestamp * 1000);
            let month = dateObj.getMonth() + 1;
            let dateVar = dateObj.getDate();
            let year = dateObj.getFullYear();
            let date = month + "/" + dateVar + "/" + year;
            
            const iconCode = data.current.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
       
     

            var card = document.createElement('div')
                card.className = 'card';
                var cardDivider = document.createElement('div')
                cardDivider.className = 'card-divider';
                var cardBody = document.createElement('div')
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
                forecastIconEl.textContent = "Temp:" + temp + '°F';
                cardDivider.appendChild(forecastIconEl);
               
    
     
                var forecastMaxTempEl = document.createElement('h3')
                forecastMaxTempEl.className = 'max-temp';
                forecastMaxTempEl.setAttribute('id', 'max-temp');
                forecastMaxTempEl.textContent = "Feels Like:" + feels_like + '°F';
                cardDivider.appendChild(forecastMaxTempEl);
            
                var forecastHumidityEl = document.createElement('h2')
                forecastHumidityEl.className = 'min-temp';
                forecastHumidityEl.setAttribute('id', 'min-temp');
                forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
                cardDivider.appendChild(forecastHumidityEl);

                var forecastWindSpeedEl = document.createElement('h2')
                forecastWindSpeedEl.classname = "wind-speed";
                forecastWindSpeedEl.setAttribute("id", "wind-speed");
                forecastWindSpeedEl.textContent = "Wind-speed:" + currentWindspeed + "MPH";
                cardDivider.appendChild(forecastWindSpeedEl);

                var currentUviEl = document.createElement('h2')
                currentUviEl.classname = "uvi";
                currentUviEl.setAttribute("id", "uvi");
                currentUviEl.textContent = uvi;
                cardDivider.appendChild(currentUviEl);

                innerCardBody.appendChild(card);


           
        });
       
    });
 
});


searchBtn.addEventListener('click', function getForecast() {
    var userCity = userSearch.value.trim();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
    .then(response => response.json())
    .then(data => {
        var lat = data.coord.lat;
        var lon = data.coord.lon;

        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=e3a955cb151dd35974130ff7ccec57c6')
        .then(repsonse => repsonse.json())
        .then(function displayforecast(data) {

            //Daily Weather Card's

            for (let i = 0; i < 5 && i < data.daily.length; i++) {
                var day = data.daily[i + 1];
                
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
              

                var card = document.createElement('div')
                card.className = 'card';
                var cardDivider = document.createElement('div')
                cardDivider.className = 'card-divider';
                var cardBody = document.createElement('div')
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
                forecastIconEl.textContent = "High:" + maxTemp + '°F';
                cardDivider.appendChild(forecastIconEl);
               
    
     
                var forecastMaxTempEl = document.createElement('h3')
                forecastMaxTempEl.className = 'max-temp';
                forecastMaxTempEl.setAttribute('id', 'max-temp');
                forecastMaxTempEl.textContent = "High:" + maxTemp + '°F';
                cardDivider.appendChild(forecastMaxTempEl);
            

                var forecastMinTempEl = document.createElement('h2')
                forecastMinTempEl.className = 'min-temp';
                forecastMinTempEl.setAttribute('id', 'min-temp');
                forecastMinTempEl.textContent = "Low:" + minTemp + '°F';
                cardDivider.appendChild(forecastMinTempEl);
       

                var forecastHumidityEl = document.createElement('h2')
                forecastHumidityEl.className = 'min-temp';
                forecastHumidityEl.setAttribute('id', 'min-temp');
                forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
                cardDivider.appendChild(forecastHumidityEl);

                var forecastWindSpeedEl = document.createElement('h2')
                forecastWindSpeedEl.classname = "wind-speed";
                forecastWindSpeedEl.setAttribute("id", "wind-speed");
                forecastWindSpeedEl.textContent = "Wind-speed:" + windspeed + "MPH";
                cardDivider.appendChild(forecastWindSpeedEl);

                innerCardBody.appendChild(card);
            
            };
    
        });
    });
        
});
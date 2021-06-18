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
            let locationIcon = document.querySelector("#icon");
            
            const iconCode = data.current.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            locationIcon.setAttribute("src", iconUrl);
            console.log(data, icon);



            currentCity.textContent = name;
            var cityTemp = document.querySelector('#temp');
            cityTemp.textContent = "Temperature:" + temp + '°F';
            var cityFeelsLike = document.querySelector('#feels-like');
            cityFeelsLike.textContent = "Feels Like:" + feels_like + '°F';
            var cityHumidity = document.querySelector('#humidity');
            cityHumidity.textContent = "Humidity:" + humidity + "%";




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
                var day = data.daily[i];
                // var date = data.daily[i].dt;
                // var convertedDate = new Date (date *1000);
                // document.textContent(convertedDate.toGMTString()+toLocaleString());
                // console.log(day, date, convertedDate);
                
                var maxTemp = day.temp.max.toFixed(0);
                var minTemp = day.temp.min.toFixed(0);
                var humidity = day.humidity.toFixed(0);

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

                // var date = document.createElement('h1');
                // date.className = 'date';
                // date.setAttribute('id', 'date');
                // date.textContent = date;
                // cardDivider.appendChild(date);


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
                forecastMinTempEl.textContent = "High:" + minTemp + '°F';
                cardDivider.appendChild(forecastMinTempEl);
       

                var forecastHumidityEl = document.createElement('h2')
                forecastHumidityEl.className = 'min-temp';
                forecastHumidityEl.setAttribute('id', 'min-temp');
                forecastHumidityEl.textContent = "Humidity:" + humidity + '%';
                cardDivider.appendChild(forecastHumidityEl);

                innerCardBody.appendChild(card);
            
            };
    
        });
    });
        
});
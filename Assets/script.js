var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=31.9523&lon=115.8613&exclude=minutely,hourly,alerts&appid=408b21a6ea25095ac89b5511c4e63503&units=metric"
var currentDay = moment().format("ddd Do of MMMM YYYY")
var mainCity = document.querySelector('.mainCity')
var searchInput = document.querySelector('textarea')
var searchBtn = document.querySelector('.search')
var figure = document.querySelector('figure')
var section = document.querySelector('section')
var card = document.querySelector('.card')

function getApi(){
    fetch(weatherUrl).then(function (response){
        return response.json()
    }).then(function(weatherInfo){
        console.log(weatherInfo)
        mainCity.children[0].textContent = "Temp: " + Math.round(weatherInfo.current.temp) + "°C";
        mainCity.children[1].textContent = "Wind Speed: " + weatherInfo.current.wind_speed + "km/h";
        mainCity.children[2].textContent = "Humidity: " + weatherInfo.current.humidity + "%";
        mainCity.children[3].textContent = "UV Index: " + weatherInfo.current.uvi;
        figure.children[0].textContent = searchInput.value + "- " + currentDay;

        for (let i = 0; i < 5; i++) {
            var weatherInfoDaily = weatherInfo.daily
            var rightCard = section.children[i]
            var DayTempWindHumidity = rightCard.querySelector('.day')
            DayTempWindHumidity.children[0].textContent = "Max Temp: " + Math.round(weatherInfoDaily[i].temp.max) + "°C";
            DayTempWindHumidity.children[1].textContent = "Min Temp: " + Math.round(weatherInfoDaily[i].temp.min) + "°C";
            DayTempWindHumidity.children[2].textContent = "Wind Speed: " + weatherInfoDaily[i].wind_speed + "km/h";
            DayTempWindHumidity.children[3].textContent = "Humidity: " + weatherInfoDaily[i].humidity + "%";
            var day = moment().add(i, 'days').format('dddd')
            rightCard.children[0].textContent = day          
        }         
    }) 
}

searchBtn.addEventListener('click', getApi)
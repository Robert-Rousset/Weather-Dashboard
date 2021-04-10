
var currentDay = moment().format("dddd, Do of MMMM, YYYY")
var mainCity = document.querySelector('.mainCity')
var searchInput = document.querySelector('textarea')
var searchBtn = document.querySelector('.search')
var figure = document.querySelector('figure')
var section = document.querySelector('section')
var card = document.querySelector('.card')
var forecast = document.querySelector('.forecast')

function callForLatandLong(){
    var cityName = searchInput.value
    var latLonUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=408b21a6ea25095ac89b5511c4e63503&units=metric"
    fetch(latLonUrl).then(function (response){
        if (response.status !== 200){
            alert('Enter a valid city name')
        }
        return response.json()
    }).then(function(latLon){
        var lat = latLon.coord.lat;
        var lon = latLon.coord.lon;
        forecast.textContent = cityName+"'s 5-Day-Forecast";
        // card.style.display = "flex";
        getApi(lat, lon)
    })
}

function getApi(lat, lon){
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=408b21a6ea25095ac89b5511c4e63503&units=metric"

    fetch(weatherUrl).then(function (response){
        return response.json()
    }).then(function(weatherInfo){
        console.log(weatherInfo)
        mainCity.children[0].textContent = "Temp: " + Math.round(weatherInfo.current.temp) + "°C";
        mainCity.children[1].textContent = "Wind Speed: " + weatherInfo.current.wind_speed + "km/h";
        mainCity.children[2].textContent = "Humidity: " + weatherInfo.current.humidity + "%";
        mainCity.children[3].textContent = "UV Index: " + weatherInfo.current.uvi;
        figure.children[0].textContent = searchInput.value + "- " + currentDay;
        var src = document.querySelector('.mainImage');
        var weather = weatherInfo.current.weather
        var imageIcon = weather[0].icon
        var img = document.createElement('img')
        img.src = "http://openweathermap.org/img/wn/"+ imageIcon + "@2x.png"

        src.appendChild(img)

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

            var image = rightCard.children[3]

            var img = document.createElement('img')
            img.image = "http://openweathermap.org/img/wn/"+ imageIcon + "@2x.png"
            var image = document.querySelector('.otherimg')
            image.appendChild(img)
        }         
    }) 
}

searchBtn.addEventListener('click', callForLatandLong)
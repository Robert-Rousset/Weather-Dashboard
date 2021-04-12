var currentDay = moment().format("dddd, Do of MMMM, YYYY")

var mainCity = document.querySelector('.mainCity')
var searchInput = document.querySelector('textarea')
var searchBtn = document.querySelector('.search')
var figure = document.querySelector('figure')
var section = document.querySelector('section')
var card = document.querySelector('.card')
var forecast = document.querySelector('.forecast')
var aside = document.querySelector('.shadow')
var clearBtn = document.querySelector('.clear')
var linebreak = document.createElement('br')
var number = 0

//TO MAKE THE LOCAL STORAGE APPEAR A MAX OF 8 TIMES
for (let index = 0; index < 8; index++) {
    var eachButtonsValue = localStorage.getItem(index)
    var citySearchHistory = document.createElement('button')
    citySearchHistory.classList.add('city')
    if(eachButtonsValue !== null){
        citySearchHistory.textContent = eachButtonsValue.charAt(0).toLocaleUpperCase()+eachButtonsValue.slice(1)
        aside.append(citySearchHistory)
        citySearchHistory.addEventListener('click', clearImagesFromSearchHistoryClick)
    }
}

searchBtn.addEventListener('click', clearDuplicates)

clearBtn.addEventListener('click', clearListFunction)

searchInput.addEventListener('keydown', function(event){
    if (event.key === "Enter"){
        clearDuplicates();
    }
})
function clearDuplicates(){
    for (let index = 0; index < 6; index++) {
        var deleteImage = document.querySelector('img')
        if (deleteImage === null){

        }else{
            deleteImage.remove()
        }
    }
    callForLatandLong();
}
function clearImagesFromSearchHistoryClick(event){
    for (let index = 0; index < 6; index++) {
        var deleteImage = document.querySelector('img')
        if (deleteImage === null){

        }else{
            deleteImage.remove()
        }
    }
    historyCallForLatandLong(event);
}
function callForLatandLong(){
    var cityName = searchInput.value
    var latLonUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=408b21a6ea25095ac89b5511c4e63503&units=metric"
    fetch(latLonUrl).then(function (response){
        if (response.status !== 200){
            alert('Please enter a valid city name');
            searchInput.value = "";
        }
        return response.json()
    }).then(function(latLon){
        var lat = latLon.coord.lat;
        var lon = latLon.coord.lon;
        forecast.textContent = cityName.charAt(0).toLocaleUpperCase()+cityName.slice(1)+"'s 5-Day-Forecast";
        figure.children[0].textContent = cityName.charAt(0).toLocaleUpperCase()+cityName.slice(1)+"'s Weather - " + currentDay;          
            var citySearchHistory = document.createElement('button')
            citySearchHistory.classList.add('city')
            citySearchHistory.textContent = cityName.charAt(0).toLocaleUpperCase()+cityName.slice(1)
            aside.append(citySearchHistory)
            localStorage.setItem(number, cityName)
            citySearchHistory.addEventListener('click', clearImagesFromSearchHistoryClick)
        getApi(lat, lon)
    })
}
function historyCallForLatandLong(event){
    var cityName = event.target.innerHTML
    var latLonUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=408b21a6ea25095ac89b5511c4e63503&units=metric"
    fetch(latLonUrl).then(function (response){
        return response.json()
    }).then(function(latLon){
        var lat = latLon.coord.lat;
        var lon = latLon.coord.lon;
        forecast.textContent = cityName.charAt(0).toLocaleUpperCase()+cityName.slice(1)+"'s 5-Day-Forecast";
        figure.children[0].textContent = cityName.charAt(0).toLocaleUpperCase()+cityName.slice(1)+"'s Weather - " + currentDay;
        getApi(lat, lon)
    })
}
function getApi(lat, lon){
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=408b21a6ea25095ac89b5511c4e63503&units=metric"

    fetch(weatherUrl).then(function (response){
        return response.json()
    }).then(function(weatherInfo){
        searchInput.value = ""
        //CREATION OF CONTENT FOR MAIN SECION
        mainCity.children[0].textContent = "Temperature: " + Math.round(weatherInfo.current.temp) + "°C";
        mainCity.children[1].textContent = "Wind Speed: " + weatherInfo.current.wind_speed + "km/h";
        mainCity.children[3].textContent = "Humidity: " + weatherInfo.current.humidity + "%";
        mainCity.children[4].textContent = "UV Index: " + weatherInfo.current.uvi;
        var uvi = document.querySelector('.UVI')
        var uviValue =weatherInfo.current.uvi
        if(uviValue>7){
            uvi.classList.add('gnarly')
        }
        if(uviValue<8 && uviValue>5){
            uvi.classList.add('high')
            uvi.classList.remove('medium')
            uvi.classList.remove('low')
            uvi.classList.remove('gnarly')
        }
        if(uviValue<6 && uviValue>2){
            uvi.classList.add('medium')
            uvi.classList.remove('high')
            uvi.classList.remove('low')
            uvi.classList.remove('gnarly')
        }
        if (uviValue<3){
            uvi.classList.add('low')
            uvi.classList.remove('medium')
            uvi.classList.remove('high')
            uvi.classList.remove('gnarly')
        }
 
        var src = document.querySelector('.mainImage');
        var weather = weatherInfo.current.weather
        var imageIcon = weather[0].icon
        var image = document.createElement('img')
        image.src = "http://openweathermap.org/img/wn/"+ imageIcon + "@2x.png"
        src.appendChild(image)
        for (let i = 0; i < 5; i++) {
            //CREATING THE 5-DAY-FORECAST
            var weatherInfoDaily = weatherInfo.daily
            var rightCard = section.children[i]
            var DayTempWindHumidity = rightCard.querySelector('.stats')
            DayTempWindHumidity.children[0].textContent = "Max Temp: " + Math.round(weatherInfoDaily[i].temp.max) + "°C";
            DayTempWindHumidity.children[1].textContent = "Min Temp: " + Math.round(weatherInfoDaily[i].temp.min) + "°C";
            DayTempWindHumidity.children[2].textContent = "Wind Speed: " + weatherInfoDaily[i].wind_speed + "km/h";
            DayTempWindHumidity.children[3].textContent = "Humidity: " + weatherInfoDaily[i].humidity + "%";
            var day = moment().add(i, 'days').format('DD/MM/YYYY')
            rightCard.children[0].textContent = day
            var imageIcon = weatherInfoDaily[i].weather[0].icon
            var image = DayTempWindHumidity.children[4]
            image.classList.add('otherImg')
            var img = document.createElement('img')
            img.src = "http://openweathermap.org/img/wn/"+ imageIcon + "@2x.png"
            image.appendChild(img)
        }         
        number++;
    }) 
}
function clearListFunction(){
    var deleteButtons = document.querySelector('.city')
    deleteButtons.remove()
}
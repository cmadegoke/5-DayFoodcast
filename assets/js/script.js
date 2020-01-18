var searchInput = document.querySelector('#searchinput');
var searchResults = document.querySelector("#searchResponse");
var Searchbtn = document.querySelector("#search");
var parent = document.getElementById('forcast');

function handleformsubmit(event) {
    event.preventDefault();
    console.log(searchInput.value)
    removeoldforecast();
    var cityID = searchInput.value;
    if (!cityID) {
        return false
    }
    runData(cityID)
}
function removeoldforecast() {
    Array.from(parent.children).forEach(child => { parent.removeChild(child) });
}
Searchbtn.addEventListener("click", handleformsubmit);
function runData(cityID) {
    var queryUrl = 'http://api.openweathermap.org/data/2.5/forecast/?q=' + cityID + "&units=imperial" + "&APPID=e37e1b254dd810c3870001c45995ed30"
    $.ajax({
        url: queryUrl,
        method: 'GET',
        origin: '*',
    })
        .then(function (weatherRES) {
            console.log(weatherRES);
            //  console.log(weatherRES);
            //     var currentWea = show(weatherRES);
            //     $('#searchResponse').html(currentWea);
            //     var header = document.getElementById ('Header')
            //     header.innerHTML = "<h3><strong>Today's Weather </strong></h3>"; 
            // function show(weatherRES){
            //     return "<h2><strong>City</strong>: " + weatherRES.city.name + "</h2>"+
            //         "<h3><strong>Description</strong>: <img src = 'http://openweathermap.org/img/w/"+ weatherRES.list[0].weather[0].icon +".png'>" +  weatherRES.list[0].weather[0].description + "</h3>"+
            //        "<h3><strong>Temperature</strong>: " + weatherRES.list[0].main.temp + "&deg;F</h3>"+
            //            "<h3><strong>Humidity</strong>: " + weatherRES.list[0].main.humidity +"%</h3>"+
            //            "<h3><strong>WindSpeed</strong>: " + weatherRES.list[0].wind.speed +"</h3>"
            // }
            var dayOne = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[0].dt_txt,
                IconImage: weatherRES.list[0].weather[0].icon,
                Temp: weatherRES.list[0].main.temp,
                UvIndex: weatherRES.list[0].main.temp,
            };
            var dayTwo = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[8].dt_txt,
                IconImage: weatherRES.list[8].weather[0].icon,
                Temp: weatherRES.list[8].main.temp,
                UvIndex: weatherRES.list[8].main.temp,
            };
            var dayThree = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[16].dt_txt,
                IconImage: weatherRES.list[16].weather[0].icon,
                Temp: weatherRES.list[16].main.temp,
                UvIndex: weatherRES.list[16].main.temp,
            };
            var dayFour = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[24].dt_txt,
                IconImage: weatherRES.list[24].weather[0].icon,
                Temp: weatherRES.list[24].main.temp,
                UvIndex: weatherRES.list[24].main.temp,
            };
            var dayFive = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[32].dt_txt,
                IconImage: weatherRES.list[32].weather[0].icon,
                Temp: weatherRES.list[32].main.temp,
                UvIndex: weatherRES.list[32].main.temp,
            };
            var forecast = [dayOne, dayTwo, dayThree, dayFour, dayFive];
            searchResults(forecast)
            console.log(forecast)
        })
    function searchResults(forecast) {
        var Fiveday = document.getElementById('Day');
        for (var i = 0; i < forecast.length; i++) {
            var card = document.createElement("div");
            card.classList.add('column');
            var date = document.createElement('div');
            var dateObj = new Date(forecast[i].Datenanme);
            date.innerHTML = dateObj.getMonth() + '1' + '-' + dateObj.getDate() + '-' + dateObj.getFullYear();
            var Temp = document.createElement('div')
            Temp.innerHTML = 'Temp: ' + forecast[i].Temp + "&deg;F"
            var icon = document.createElement('img')
            icon.innerHTML = forecast[i].IconImage
            icon.setAttribute('src', 'http://openweathermap.org/img/w/' + forecast[i].IconImage + '.png');
            card.appendChild(date);
            card.appendChild(icon);
            card.appendChild(Temp);
            parent.appendChild(card);
        }
    }
}
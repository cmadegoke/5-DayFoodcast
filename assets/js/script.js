// var searchForm = document.querySelector("#searchform");
var searchInput = document.querySelector('#searchinput');
// var clearbtn = document.querySelector("#clearButton");
var searchResults = document.querySelector("#searchResponse");
var Searchbtn = document.querySelector("#search");
var foodR = document.getElementById('foodResponse');
var parent1 = document.getElementById('foodday');
var parent = document.getElementById('forcast');
// var hiderow = document.getElementById('hiderow');
// console.log(Searchbtn)
// function prelist(event){
//     console.log (searchInput.value)
// }
function handleformsubmit(event) {
    event.preventDefault();
    console.log(searchInput.value)
    removeoldforecast();
    //forecastList();
    var cityID = searchInput.value;
    if (!cityID) {
        return false;
    }
    // cityID = food();
    runData(cityID);
}
function removeoldforecast() {
    Array.from(parent.children).forEach(child => { parent.removeChild(child) });
}
Searchbtn.addEventListener("click", handleformsubmit);
//clearbtn.addEventListener("click", handleclearclick);
function runData(cityID) {
    var queryUrl = 'http://api.openweathermap.org/data/2.5/forecast/?q=' + cityID + "&units=imperial" + "&APPID=e37e1b254dd810c3870001c45995ed30"
    $.ajax({
        url: queryUrl,
        method: 'GET',
        origin: '*',
    })
        .then(function (weatherRES) {
            console.log(weatherRES);
            var dayOne = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[0].dt_txt,
                IconImage: weatherRES.list[0].weather[0].icon,
                Temp: weatherRES.list[0].main.temp,
            };
            var dayTwo = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[8].dt_txt,
                IconImage: weatherRES.list[8].weather[0].icon,
                Temp: weatherRES.list[8].main.temp,
            };
            var dayThree = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[16].dt_txt,
                IconImage: weatherRES.list[16].weather[0].icon,
                Temp: weatherRES.list[16].main.temp,
            };
            var dayFour = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[24].dt_txt,
                IconImage: weatherRES.list[24].weather[0].icon,
                Temp: weatherRES.list[24].main.temp,
            };
            var dayFive = {
                cityname: weatherRES.city.name,
                Datenanme: weatherRES.list[32].dt_txt,
                IconImage: weatherRES.list[32].weather[0].icon,
                Temp: weatherRES.list[32].main.temp,
            };
            var forecast = [dayOne, dayTwo, dayThree, dayFour, dayFive];
            searchResults(forecast)
            food()
        });
    function food() {
        var queryUrl = "https://api.spoonacular.com/recipes/search?cuisine=American&apiKey=dca66fb5322341b49c535563addea129"
        $.ajax({
            url: queryUrl,
            method: 'GET',
            origin: '*',
        })
            .then(function (searchResults) {
                console.log(searchResults);
                var mon = {
                    FoodPic: searchResults.results[0].image,
                    PrepTime: searchResults.results[0].readyInMinutes,
                    Servings: searchResults.results[0].servings,
                };
                var tue = {
                    FoodPic: searchResults.results[2].image,
                    PrepTime: searchResults.results[2].readyInMinutes,
                    Servings: searchResults.results[2].servings,
                };
                var wed = {
                    FoodPic: searchResults.results[1].image,
                    PrepTime: searchResults.results[1].readyInMinutes,
                    Servings: searchResults.results[1].servings,
                };
                var thu = {
                    FoodPic: searchResults.results[5].image,
                    PrepTime: searchResults.results[5].readyInMinutes,
                    Servings: searchResults.results[5].servings,
                };
                var fri = {
                    FoodPic: searchResults.results[8].image,
                    PrepTime: searchResults.results[8].readyInMinutes,
                    Servings: searchResults.results[8].servings,
                };
                var foodday = [mon, tue, wed, thu, fri];
                console.log(foodday);
                foodR(foodday);
            });
    }
    function searchResults(forecast) {
        var Fiveday = document.getElementById('Day');
        for (var i = 0; i < forecast.length; i++) {
            var card = document.createElement("div");
            card.classList.add('column');
            var date = document.createElement('div');
            var dateObj = new Date(forecast[i].Datenanme);
            date.innerHTML = dateObj.getMonth() + '1' + '-' + dateObj.getDate() + '-' + dateObj.getFullYear();
            var Temp = document.createElement('div');
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
    function foodR(foodday) {
        var fday = document.getElementById('Day1');
        for (var i = 0; i < foodday.length; i++) {
            var card = document.createElement('div');
            card.classList.add('column');
            // var pic = document.createElement('div');
            var pic = document.createElement('img');
            var imgName = foodday[i].FoodPic;// + '-556x370.jpg';
            //pic.innerHTML = foodday[i].FoodPic
            pic.setAttribute('alt', foodday[i].FoodPic);
            pic.setAttribute('src', 'https://spoonacular.com/recipeImages/' + imgName);
            // pic.setAttribute('src',  'https://spoonacular.com/recipeImages/579247-556x370.jpg(38 kB)
            https://spoonacular.com/recipeImages/579247-556x370.jpg');
            var time = document.createElement('div');
            time.innerHTML = 'Prep Time: ' + foodday[i].PrepTime + "mins"
            var serving = document.createElement('div');
            serving.innerHTML = 'Servings: ' + foodday[i].Servings + "people"
            card.appendChild(pic);
            card.appendChild(time);
            card.appendChild(serving);
            parent1.appendChild(card);
        }
    }
}

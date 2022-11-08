const form= document.querySelector("#search-form")
const nameCity= document.querySelector("#nameCity")
const dateElement= document.querySelector("#date")
const temperature= document.querySelector("#temperature")
const weatherDescription= document.querySelector("#weather-description")
const weatherImg= document.querySelector(".weather-img")
const humidity= document.querySelector("#humidity")
const wind= document.querySelector("#wind")
const fahrenheitLink= document.querySelector("#fahrenheit")
const celsiusLink= document.querySelector("#celsius") 

let apiKey= "te60b41a5ebo3808074c9edaf83940fc"
let week= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
let celsiusTemp
let cityValue

function handleSubmit(event){
    event.preventDefault()
    const cityInputElement=document.querySelector("#city-input")
    cityValue= cityInputElement.value
    searchCity(cityValue)
    searchCityForecast(cityValue)
}

function searchCity(city){
    
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

    axios.get(apiUrl).then(displayTemperature)
}

function formatDate(timeStamp){
    //calculate the date
    let date = new Date(timeStamp)
    let day= week[date.getDay()]
    let hours= date.getHours()
    let currentHours
    if(hours<10){
        currentHours=`0${hours}`
    }else{
       currentHours=hours 
    }
    let minutes= date.getMinutes()
    let currentMinutes
    if(minutes<10){
        currentMinutes=`0${minutes}`
    }else{
       currentMinutes=minutes 
    }
    dateElement.innerText=`${day}, ${currentHours}:${currentMinutes}`
}

function displayTemperature(response){
    celsiusTemp=Math.round(response.data.temperature.current) 
    nameCity.innerText=response.data.city
    weatherDescription.innerText= response.data.condition.description
    weatherImg.src=response.data.condition.icon_url
    weatherImg.setAttribute("alt",response.data.condition.description)
    temperature.innerText=celsiusTemp
    humidity.innerText=`${response.data.temperature.humidity}%`
    let windData=Math.round(response.data.wind.speed)
    wind.innerText=`${windData} Km/H`
    
    formatDate(response.data.time*1000)
    displayForecast()
}

function displayCelsius(event){
    event.preventDefault()
    temperature.innerText=celsiusTemp
    celsiusLink.classList.remove("active")
    fahrenheitLink.classList.add("active")
    searchCityForecast(cityValue)
}

function displayFahrenhiet(event){
    event.preventDefault()
    let fahrenheitTemp= Math.round((celsiusTemp * 9/5) + 32)
    temperature.innerText=fahrenheitTemp
    //add the active class the celsius link and remove in fahrenheit link
    celsiusLink.classList.add("active")
    fahrenheitLink.classList.remove("active")
    searchForecastImperial()
    
}

function searchForecastImperial(){
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${cityValue}&key=${apiKey}&units=imperial`
    axios.get(apiUrl).then(displayForecast)
}


function searchCityForecast(city){
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)
}

function displayForecast(response){
    console.log(response.data.daily)
    let days=response.data.daily
    let forecastElement= document.querySelector("#forecast")
    let forecastHTML=`<div class="row">`
    
    days.forEach(function (day, index){
        if(index<6){
        forecastHTML= forecastHTML+`
         <div class="col-2">
             <div class="forecast-date">
               ${displayDay(day.time*1000)}
             </div>
              <img src=${day.condition.icon_url} alt="${day.condition.description}" class="forecast-img">
              <div class="forecast-temperature">
                <span class="forecast-max">
                  ${Math.round(day.temperature.maximum)}
                </span>
                <span class="forecast-min" id="min">
                  ${Math.round(day.temperature.minimum)}
                </span>
              </div>
            </div>
        `}
    })
    forecastElement.innerHTML= forecastHTML +`</div>`

}

function displayDay(dayStamp){
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    let date = new Date(dayStamp)
    let dayForecast= days[date.getDay()]
    return dayForecast
    
}

form.addEventListener("submit",handleSubmit)
fahrenheitLink.addEventListener("pointerdown", displayFahrenhiet)
celsiusLink.addEventListener("pointerdown",displayCelsius)

searchCity("La Ceja")
 searchCityForecast("La Ceja")
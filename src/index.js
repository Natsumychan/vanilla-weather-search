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

let week= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
let celsiusTemp

function handleSubmit(event){
    event.preventDefault()
    const cityInputElement=document.querySelector("#city-input")
    let cityValue= cityInputElement.value
    searchCity(cityValue)
}

function searchCity(city){
    let apiKey= "te60b41a5ebo3808074c9edaf83940fc"
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
}

function displayFahrenhiet(event){
    event.preventDefault()
    let fahrenheitTemp= Math.round((celsiusTemp * 9/5) + 32)
    temperature.innerText=fahrenheitTemp
    //add the active class the celsius link and remove in fahrenheit link
    celsiusLink.classList.add("active")
    fahrenheitLink.classList.remove("active")
}

function displayForecast(){
    let days=["Thu","Fri","Sat","Sun"]
    let forecastElement= document.querySelector("#forecast")
    let forecastHTML=`<div class="row">`
    
    days.forEach(function (day){

        forecastHTML= forecastHTML+`
         <div class="col-2">
             <div class="forecast-date">
               ${day}
             </div>
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png" alt="" class="forecast-img">
              <div class="forecast-temperature">
                <span class="forecast-max">
                  18°
                </span>
                <span class="forecast-min">
                  12°
                </span>
              </div>
            </div>
        `
    })
    forecastElement.innerHTML= forecastHTML +`</div>`

}

form.addEventListener("submit",handleSubmit)
fahrenheitLink.addEventListener("pointerdown", displayFahrenhiet)
celsiusLink.addEventListener("pointerdown",displayCelsius)

searchCity("La Ceja")
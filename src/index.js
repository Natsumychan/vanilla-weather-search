const nameCity= document.querySelector("#nameCity")
const temperature= document.querySelector("#temperature")
const weatherDescription= document.querySelector("#weather-description")
const weatherImg= document.querySelector(".weather-img")
const humidity= document.querySelector("#humidity")
const wind= document.querySelector("#wind")
let apiKey= "te60b41a5ebo3808074c9edaf83940fc"
let city="New York"
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

function displayTemperature(response){
    console.log(response.data)
    nameCity.innerText=response.data.city
    weatherDescription.innerText= response.data.condition.description
    weatherImg.src=response.data.condition.icon_url
    temperature.innerText=Math.round(response.data.temperature.current) 
    humidity.innerText=`${response.data.temperature.humidity}%`
    let windData=Math.round(response.data.wind.speed)
    wind.innerText=`${windData} Km/H`
}

axios.get(apiUrl).then(displayTemperature)
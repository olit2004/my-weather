const apiKey = '************************'; 
function capitalizeCity(city) { //I used this function in order to convert the city name into title case
  return city
      .split(" ")                      
      .map(word =>                     
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");                      
}
function getWeather() { //to get data from the APi
const city = capitalizeCity(document.getElementById("inp1").value);

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
fetch(url)

.then(response => {
    if (!response.ok) {
      alert("invalid city");}
    
    return response.json();
    })
 .then (data => {  display(data,city)})   

  }
function display(resource,city){

  
 
  const resultDiv = document.querySelector('.result');
  const container=document.querySelector('.container');
  container.style.height="auto"
  resultDiv.style.display="block"

  resultDiv.querySelector('.cty').textContent = city ;
  
 
 
  const iconCode = resource.weather[0].icon; 
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  resultDiv.querySelector('#weather-icon').src = iconUrl; 

 
  const tempre=resource.main.temp;
  console.log(tempre)
  const press=resource.main.pressure;

  const hum=resource.main.humidity;
  resultDiv.querySelector('.data1').innerHTML =` <i class="fas fa-thermometer-half"></i> Temperature <br> ${tempre} °C  `;
  resultDiv.querySelector('.data2').innerHTML=`<i class="fa-solid fa-droplet"></i><i class="fa-solid fa-percent"></i>humidity<br> ${hum } `;
  resultDiv.querySelector('.data3').innerHTML=`<i class="fa-solid fa-gauge"></i>pressure<br> ${press} `;

}
function getHourlyForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Unable to fetch hourly forecast.");
      }
      return response.json();
    })
    .then(data => displayHourlyForecast(data))
    .catch(error => console.error(error));
}

function displayHourlyForecast(data) {
  const forecastContainer = document.querySelector('.forecast-container');
  forecastContainer.innerHTML = ""; 
  const hF=document.querySelector('.hourly-forcast')
  hF.style.display="block"
  
  const hours = data.list.slice(0, 6);
  hours.forEach(hour => {
    const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const temp = hour.main.temp;
    const iconCode = hour.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const hourBlock = `
      <div class="hour-block">
        <p>${time}</p>
        <img src="${iconUrl}" alt="Weather icon">
        <p>${temp} °C</p>
      </div>
    `;

    forecastContainer.innerHTML += hourBlock;
  });
}


function getWeather() {
  const city = capitalizeCity(document.getElementById("inp1").value);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        alert("Invalid city");
      }
      return response.json();
    })
    .then(data => {
      display(data, city);
      getHourlyForecast(city); 
    })
    .catch(error => console.error(error));
}

let searchInput = document.getElementById('searchInput')

searchInput.addEventListener('input', function(){
    getWeather(searchInput.value)
})


async function getWeather(term){
 let apiValue = await  fetch(`http://api.weatherapi.com/v1/forecast.json?key=ef768eaa22ba4a1ebc9214608251804&q=${term}&days=3`)
 if (apiValue.ok == true ) {
    let data = await apiValue.json()
    display(data.forecast.forecastday , data.location)
 }
}

function display(arr , locatin){
    let box = ''
    for (let i = 0; i < arr.length; i++) {
        let day = arr[i];
        let date = new Date(day.date);
        let weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        let dayMonth = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        let currentHour = new Date().getHours();
        box+= 
        `
        <div class="col-4 text-dark ">
        <div class="inner">
            <div class="header d-flex justify-content-between py-2">
                <p class="ps-2">${weekday}</p>
                <p class="pe-2">${dayMonth}</p>
            </div>
            <div class="cardBody ps-3 py-4">
                <h5>${locatin.name}</h5>
                <h1 class="text-white fw-bolder">${day.day.maxtemp_c}<sup>o</sup> C</h1>
                <h4 class="text-white fw-bolder"> ${day.day.mintemp_c} <sup>o</sup> </h4>
                <img src="https:${day.day.condition.icon}" alt="">
                <span class="d-block mb-2 ">${day.day.condition.text}</span>
                <div class="cardList d-flex">
                    <p class="pe-4"><i class="fa-solid fa-umbrella"></i> ${day.day.daily_chance_of_rain}%</p>
                    <p  class="pe-4" ><i class="fa-solid fa-wind"></i>${day.day.maxwind_kph}km/h</p>
                    <p  class="pe-4" ><i class="fa-solid fa-compass"></i> ${day.hour[currentHour].wind_dir}</p>
                </div>
            </div>

        </div>
    </div>
        
        `
        document.getElementById('rowData').innerHTML = box
        
    }

}

window.addEventListener('load', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                getWeather(`${lat},${lon}`)
            },          
            
        );
    } 
});

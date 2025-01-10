async function getWeather() {
    try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=-6.1818&longitude=106.8223&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_min,wind_speed_10m_max&timezone=Asia%2FBangkok"
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        //CurrentTemp
        const currentTemp = document.querySelector(".temp-info");
        currentTemp.innerHTML = data.current.temperature_2m + "°C";

        //CurrentHumidity
        const currentHumidity = document.querySelector(".humidityHeader");
        currentHumidity.innerHTML = data.current.relative_humidity_2m + "%";

        //CurrentWind
        const currentWind = document.querySelector(".windHeader");
        currentWind.innerHTML = data.current.wind_speed_10m + "km/h";

        //CurrentTempFeel
        const currentTempFeel = document.querySelector(".tempFeel");
        currentTempFeel.innerHTML = data.current.apparent_temperature + "°C";
        
        const currentCondition = document.querySelector(".condition-info");
        const currentIcon = document.querySelector("#weather-icon");
        const currentCode = data.current.weather_code;
        const currentDay = data.current.is_day === 0 ? "night" : "day";
        
        currentCondition.innerHTML = code[currentCode][currentDay].description;
        currentIcon.src = code[currentCode][currentDay].image;

        const forecastInfo = document.querySelector(".forecast-info");
        data.daily.time.forEach((time, i) => {
            const loopCode = data.daily.weather_code[i];

            forecastInfo.innerHTML += `
            <div class="forecastContent">
                <h4 class="date-info font-normal py-2" style="color: gray;">${time}</h4>
                <div class="dailyWeather">
                    <h4 class="forecast-condition text-xl font-semibold w-40" style="color: black;">${code[loopCode][currentDay].description}</h4>
                    <img class="forecast-icon" src="${code[loopCode][currentDay].image}" style="width: 36px; height: 36px;"</img>
                    <h4 class="wind-content text-xl font-medium" style="color: black;">${data.daily.wind_speed_10m_max[i]}km/h</h4>
                    <h4 class="temp-content text-xl font-medium" style="color: black;">${data.daily.temperature_2m_min[i]}°C</h4>
                </div>
            </div>
            `
        })

    } catch (error) {
        console.log(error); 
    }
}
getWeather();

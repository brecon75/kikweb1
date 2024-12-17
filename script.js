document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const weatherDetails = document.getElementById("weather");
    const error = document.getElementById("error");
    const backToTopButton = document.getElementById("backToTop");

    searchButton.addEventListener("click", () => {
        const city = document.getElementById("city").value;
        const apiKey = "f303a7825e15423b8fa135125241712";
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                const weather = data.current;
                weatherDetails.innerHTML = `
                    <div id="weatherDetails">
                        <h2>Weather in ${city}</h2>
                        <p>Local time: ${data.location.localtime}</p>
                        <img src="https:${weather.condition.icon}" alt="${weather.condition.text}"/>
                        <p>Temperature: ${weather.temp_c}°C</p>
                        <p>Description: ${weather.condition.text}</p>
                        <p>Humidity: ${weather.humidity}%</p>
                        <p>Wind: ${weather.wind_kph} km/h</p>
                        <p>Pressure: ${weather.pressure_mb} mbar</p>
                    </div>
                `;
                error.textContent = "";
            })
            .catch(err => {
                error.textContent = "Failed to fetch weather data. Please try again.";
                weatherDetails.innerHTML = "";
            });
    });
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
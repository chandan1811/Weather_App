const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
// const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '';//api key
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            container.classList.remove('hidden');
            const image = document.querySelector('.container img');
            image.src = '/No_data.jpg';
            const temperature = document.querySelector('.weather-box .temperature span');
            const description = document.querySelector('.weather-box .description span');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            description.innerHTML="------";
            temperature.innerHTML="Invalid Location";
            humidity.innerHTML='-----';
            wind.innerHTML='-----';
            weatherDetails.style.display ='none';

            return;
        }

        const image = document.querySelector('.container img');
        const temperature = document.querySelector('.weather-box .temperature span');
        const description = document.querySelector('.weather-box .description span');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        const imgCode = json.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/" + imgCode + "@2x.png";
        image.src = imgurl;
        temperature.innerHTML = `${parseInt(json.main.temp)} &#176C`;

        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;
        weatherDetails.style.display ='flex';

        container.classList.remove('hidden');
        // container.style.height = '590px';
    });
});

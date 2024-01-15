const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(nameCity === '' || nameCountry === ''){
        showError('Ambos campos son obligatorios');
    }

    callAPI(nameCity.value, nameCountry.value);
})

function callAPI(city, country){
    const apiId = 'c0e98b18829e8f27bee64931e669cea6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url).then(data => {
        return data.json();
    })
    .then(dataJSON => {
        if(dataJSON === '404'){
            showError('Ciudad no encontrada...');
        }else{
            clearHTML();
            showError(dataJSON);
        }
        //console.log(dataJSON);
    })
    
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} =  data;

    const degrees = kelvinToCentigrade(temp);
    const min = kelvinToCentigrade(temp_min);
    const max = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
        <h2>${degrees}°C</h2>
        <p>${max}°C</p>
        <p>${min}°C</p>
    `;

    result.appendChild(content);
}

function showError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove();
    },3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 163.15);
}

function clearHTML(){
    result.innerHTML = '';
}
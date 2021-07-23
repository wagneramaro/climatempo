document.querySelector('.busca').addEventListener('submit', async(event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;


    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');
        
        //Cadastre-se no site https://openweathermap.org e copie sua api. Geralmente ela demora 60 minutos para ficar ativa.
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=SUA_API_AQUI&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            console.log(json);
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempDescript: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            clearInfo();
            showWarning('Não encontramos esta cidade.');
        }

    } else {
        clearInfo();
    }

});

function showInfo(json) {
    showWarning('');


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.tempDescript').innerHTML = `${json.tempDescript}`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <spam>km</spam>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

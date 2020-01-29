const url = 'https://restcountries.eu/rest/v2/all?fields=flag;name;capital;region;population';
let innerHTML = '';
let main = document.querySelector('main');

fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let country of data) {
      innerHTML += `    
        <div class='country-card'>
        <img class='flag' src="${country.flag}">
        <div class='description'>
          <div class='headline'>
            <h2>${country.name}</h2>
            <a href=""><img class='edit' src="media/edit.svg"></a>
          </div>
          <div class='capital lines'><span>Столица</span><span>${country.capital}</span></div>
          <div class='region lines'><span>Регион</span><span>${country.region}</span></div>
          <div class='population lines'><span>Население</span><span>${country.population}</span></div>
        </div>
      </div>
      `
    }
    main.innerHTML = innerHTML;
  });

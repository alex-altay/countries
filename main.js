const url = 'https://restcountries.eu/rest/v2/all?fields=flag;name;capital;region;population;alpha3Code';
let innerHTML = '';
let main = document.querySelector('main');
let cards = '';
let editLinks = '';

fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let country of data) {
      innerHTML += `    
        <div class='country-card'>
          <img class='flag' src="${country.flag}">
          <div class='description' data-country-code="${country.alpha3Code}">
            <div class='headline'>
              <h2>${country.name}</h2>
              <img class="edit" data-country-code="${country.alpha3Code}" src="media/edit.svg">
            </div>
            <div class='capital lines'><span>Столица</span><span id='country-capital'>${country.capital}</span></div>
            <div class='region lines'><span>Регион</span><span id='country-region'>${country.region}</span></div>
            <div class='population lines'><span>Население</span><span id='country-population'>${country.population}</span></div>
          </div>
        </div>
      `
    }
    main.innerHTML = innerHTML;
    cards = document.querySelectorAll('div[data-country-code]');
    cards = Array.from(cards);
    editLinks = document.querySelectorAll('img[data-country-code]');
    editLinks.forEach(link => link.addEventListener('click', editModalHandler));
  });


function editModalHandler(event) {
  const scrollY = event.pageY;
  console.log(event);
  console.log(scrollY);
  const code = event.target.dataset.countryCode;
  let country = document.querySelector(`div[data-country-code=${code}]`);

  // записать данные в переменные
  let countryNameTag = country.querySelector('h2');
  let countryName = countryNameTag.innerHTML;
  let countryCapitalTag = country.querySelector('#country-capital');
  let countryCapital = countryCapitalTag.innerHTML;
  let countryRegionTag = country.querySelector('#country-region');
  let countryRegion = countryRegionTag.innerHTML;
  let countryPopulationTag = country.querySelector('#country-population');
  let countryPopulation = countryPopulationTag.innerHTML;

  // спрятать карточки  
  document.querySelector('main').style.display = 'none';
  
  // отобразить форму
  let body = document.querySelector('body');
  let modalWindowInnerHtml = `  
    <div class='modal-container'>
      <div class='edit-modal-window'>
        <div class='edit-modal-header'>Изменение информации о стране</div>
        <form>
          <input type='text' id='countryName' required placeholder='Наименование страны' value=${countryName} />
          <input type='text' id='capitalName' placeholder='Столица' value=${countryCapital} />
          <input type='text' id='regionName' placeholder='Регион' value=${countryRegion} />
          <input type='text' id='populationNum' placeholder='Население' value=${countryPopulation} />
          <div class='buttons'>
            <button id='submit' type='button'>Сохранить</button>
            <button id='reset' type='button'>Отмена</button>
          </div>
        </form>  
      </div>
    </div>`
  body.innerHTML += modalWindowInnerHtml;
  let modalWindow = document.querySelector('.modal-container');

  // по клику на субмит - записать новые данные и отобразить карточки, спрятать форму
  const submit = modalWindow.querySelector('#submit');
  submit.addEventListener('click', (event) => submitData(event, code, scrollY));
  
  // по клику на отмену - отобразить карточки, спрятать форму   
  const reset = modalWindow.querySelector('#reset');
  reset.addEventListener('click', (event) => removeModal(event, scrollY));
}  


function removeModal(event, scrollY) {
  const modal = document.querySelector('.modal-container');
  modal.remove();
  document.querySelector('main').style.display = 'flex';
  const links = document.querySelectorAll('img.edit');
  links.forEach(link => link.addEventListener('click', editModalHandler));

  // Возвращаемся к тому скроллу, откуда начали
  window.scrollTo(0, scrollY - 300);
}  

function submitData(event, code, scrollY) {
  // Новые значения
  const modal = document.querySelector('.modal-container');
  const newName = modal.querySelector('input#countryName').value;
  const newCapital = modal.querySelector('input#capitalName').value;
  const newRegion = modal.querySelector('input#regionName').value;
  const newPopulation = modal.querySelector('input#populationNum').value;

  // Старые поля
  const country = document.querySelector(`div[data-country-code=${code}]`);
  const countryNameTag = country.querySelector('h2');
  const countryCapitalTag = country.querySelector('#country-capital');
  const countryRegionTag = country.querySelector('#country-region');
  const countryPopulationTag = country.querySelector('#country-population');
  
  // Новое в старое
  countryNameTag.innerHTML = newName;
  countryCapitalTag.innerHTML = newCapital;
  countryRegionTag.innerHTML = newRegion;
  countryPopulationTag.innerHTML = newPopulation;

  // Скрываем модальное окно
  removeModal(event, scrollY);
}

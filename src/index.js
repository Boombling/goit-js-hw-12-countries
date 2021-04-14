import './styles.css';
// import countryService from './services/country.service';
import countriesCard from './templates/countries-card.hbs'

const searchRef = document.querySelector('.search');

searchRef.addEventListener('input', listenInput)
function listenInput(e) {
    // console.log(e.currentTarget.value);
}

// countryService.fetchCountries()
//     .then(response => console.log(response))
//     .catch(error => {
//     console.log(error);
//     });
//  const BASE_URL = 'https://restcountries.eu';
fetch('https://restcountries.eu/rest/v2/name/ukrain')
    .then(response => {
        return response.json();
    })
    .then(country => {
        console.log(country);
        const countries = countriesCard(country);
        console.log(countries);
    })
    .catch(error => {
        console.log(error);
    });


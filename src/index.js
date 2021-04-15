import './styles.css';
import countryService from './services/country.service';
import countriesCard from './templates/countries-card.hbs';
import getRefs from './js/get-refs';


const refs = getRefs();

refs.searchRef.addEventListener('imput', onSearch);

function onSearch(e) {
    e.preventDefault();

    // const form = e.currentTarget;
    const searchQuery = refs.searchRef.value;

    countryService(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => form.reset());
}

function renderCountryCard(country) {
    const countries = countriesCard(country);
        refs.cardContainer.innerHTML = countries;
}

function onFetchError(erro) {
    alert('ERROR страна не найдена')
}
// countryService(ukrain)
// const BASE_URL = 'https://restcountries.eu';
// fetch(`${BASE_URL}/rest/v2/name/{name}`)
//     .then(response => {
//             return response.json();
//         },
// )
//     .then(renderCountryCard);
import './styles.css';
// import fetchCountris from './services/country.service';
import countriesCard from './templates/countries-card.hbs';
import countriesList from './templates/countries-list.hbs';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import showAlert from './js/pnotify';
// const debounce = require('lodash.debounce');
const refs = getRefs();

refs.searchRef.addEventListener('input', debounce(onSearch, 500));


function fetchCountris(name) {
    
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => {
            if (!response.ok) {
                return onFetchError(error);
            } else {
                return response.json();
            }
        });
}

function onSearch(e) {
    e.preventDefault();

    const searchQuery = refs.searchRef.value;
    fetchCountris(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => refs.searchRef.value ='');
}

function renderCountryCard(country) {
    

    if (country.length > 1) {
        const countries = countriesList(country);
        refs.cardContainer.innerHTML = countries;
        
    if (country.langth >= 10) {
        return showAlert('Too many matches found. Please enter a more specific query!');
    }
    }
    else {        
        const countries = countriesCard(country);
        refs.cardContainer.innerHTML = countries;
    }

    
}

function onFetchError(error) {
    showAlert('This country not found')
}
// function onShowAlert(alert) {
//     showAlert('Too many matches found. Please enter a more specific query!')
// }


// const debounceInput = debounce(onSearch, 2000);
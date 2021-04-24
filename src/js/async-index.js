import countriesCard from '../templates/countries-card.hbs';
import countriesList from '../templates/countries-list.hbs';
import getRefs from '../js/get-refs';
import debounce from 'lodash.debounce';
import { showAlert, showError } from '../js/pnotify';
const refs = getRefs();

refs.searchRef.addEventListener('input', debounce(onSearch, 500));

async function fetchCountris(name) {
    const countries = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
    if (!countries.ok) {
        throw countries;
        }
    const response = await countries.json();
    return response;
}
async function onSearch(e) {
    e.preventDefault();

    const searchQuery = refs.searchRef.value;
try{
    const fetchCountry = await fetchCountris(searchQuery);
    const renderCountry = await renderCountryCard(fetchCountry);
    return renderCountry;
}
    
catch {
    onFetchError()
    }
finally {
      refs.searchRef.value ='';
    }
}

function renderCountryCard(country) {
    
    if (country.length > 1) {
        const countries = countriesList(country);
        refs.cardContainer.innerHTML = countries;
        
    if (country.length >= 10) {
        return showAlert('Too many matches found. Please enter a more specific query!');
    }
    }
    else {        
        const countries = countriesCard(country);
        refs.cardContainer.innerHTML = countries;
    }
}

function onFetchError(error) {
    showError('This country not found')
}
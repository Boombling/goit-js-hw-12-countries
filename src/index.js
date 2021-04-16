import './styles.css';
// import fetchCountris from './services/country.service';
import countriesCard from './templates/countries-card.hbs';
import countriesList from './templates/countries-list.hbs';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';

const refs = getRefs();

refs.searchRef.addEventListener('input', onSearch);


function fetchCountris(name) {
    
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => {
        if(!response.ok){
            return onFetchError();
        }
            return response.json();
        })
}

function onSearch(e) {
    e.preventDefault();

    const searchQuery = e.currentTarget.value;
    debounceInput(searchQuery)
    fetchCountris(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => form.reset());
}

function renderCountryCard(country) {
    
    if (country.length > 1) {
        const countries = countriesList(country);
        refs.cardContainer.innerHTML = countries;
    }
    else {
        
        const countries = countriesCard(country);
        refs.cardContainer.innerHTML = countries;
    }
}

function onFetchError(error) {
    console.log('ERROR страна не найдена')
}

const debounceInput = debounce(onSearch, 2000);
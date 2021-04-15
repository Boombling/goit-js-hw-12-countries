const BASE_URL = 'https://restcountries.eu';


// export default {
//     fetchCountries() {
//         return fetch(`${BASE_URL}/rest/v2/name/{name}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw response;
//                 }

//                 return response.json();
//             });
//     },
// }


function fetchCountris(name) {
    
    return fetch(`${BASE_URL}/rest/v2/name/{name}`)
    .then(response => {
            return response.json();
        },
    );
}

export default { fetchCountris };
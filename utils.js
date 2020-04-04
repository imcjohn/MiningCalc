/**
 * Handles the first-level promise of fetch, returns either text or json promise
 * @param url - url to fetch
 * @param json - true, pass json output, false, pass text
 * @returns {Promise<Response>}
 */
function customFetch(url,json){
    return fetch(url)
        .then((response) => {
            if (json)
                return response.json();
            return response.text();
        })
}
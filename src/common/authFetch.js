export default async function authFetch(url, params) {
    /**
     * @param {Object} params An object with parameters to be passed for fetching.
     * @param {string} [params.method] An optional method, will default to GET
     * @param {string} [params.token] An optional token, will add to headers if present.
     */
    const headers = {
        'Content-Type': 'application/json',
    }
    const { token, method = "GET", ...remainingParams } = params
    
    if(token) {
        headers.Authorization = `Token ${token}`
    }
    const fetchParams = {
        method: method,
        headers: headers,
        ...remainingParams,
    }

    return await fetch(url, fetchParams)
}
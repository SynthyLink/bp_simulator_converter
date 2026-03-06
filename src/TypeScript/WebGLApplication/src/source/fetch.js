"use strict";
/* spellchecker: disable */
const properties_1 = require("./properties");
/* spellchecker: enable */
/** Namespace that comprises various utils (also cleans up documentation). */
var fetch;
(function (fetch) {
    const failed = (url, request) => `fetching '${url}' failed (${request.status}): ${request.statusText}`;
    /**
     * Creates a promise for an asynchronous xml/http request on a given URL. If an URL is fetched successfully, the
     * promise is resolved with the fetched data.
     * @param url - Uniform resource locator string referencing a file.
     * @param type - Request response type.
     * @returns - A promise that resolves on a parsed object if successful.
     */
    function fetchAsync(url, type) {
        const response = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = type;
            request.onload = () => {
                if (request.status < 200 || request.status >= 300) {
                    reject(failed(url, request));
                    return;
                }
                resolve(request.response);
            };
            request.onerror = () => reject(failed(url, request));
            request.ontimeout = () => reject(failed(url, request));
            request.send();
        });
        return response;
    }
    fetch.fetchAsync = fetchAsync;
    /**
     * Creates a promise for an asynchronous xml/http request on a given URL. If an URL is fetched successfully, the
     * promise is resolved with a parsed JSON object. An error code and message can be caught otherwise.
     * @param url - Uniform resource locator string referencing a JSON file.
     * @param transform - Callback to a function that transforms the fetched data into an instance of targeted type.
     * @param schema - Optional schema, that if specified, is used to validate the fetched json data.
     * @returns - A promise that resolves on a parsed JSON object if successful.
     */
    function fetchJsonAsync(url, transform, schema) {
        const response = new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = () => {
                if (request.status < 200 || request.status >= 300) {
                    reject(failed(url, request));
                    return;
                }
                const json = request.responseText;
                if (schema !== undefined && !(0, properties_1.validate)(json, schema)) {
                    return;
                }
                let data;
                try {
                    data = JSON.parse(json);
                }
                catch (error) {
                    reject(`fetching '${url}' failed (${error.name}): ${error.message}`);
                    return;
                }
                const object = transform(data);
                if (object === undefined) {
                    reject(`fetching '${url}' failed (TransformError): transforming the object failed.`);
                    return;
                }
                resolve(object);
            };
            request.onerror = () => reject(failed(url, request));
            request.ontimeout = () => reject(failed(url, request));
            request.send();
        });
        return response;
    }
    fetch.fetchJsonAsync = fetchJsonAsync;
})(fetch || (fetch = {}));
module.exports = fetch;
//# sourceMappingURL=fetch.js.map
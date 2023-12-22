function obj2params(obj) {
    let str = "";
    for (let key in obj) {
        str += key + "=" + obj[key] + "&";
    }
    return str.substr(0, str.length - 1);
}

const x_get = (str, data) => {
    const url = JSON.stringify(data) !== "{}" ? `${str}?${obj2params(data)}` : str;
    return fetch(url)
        .then((response) => {
            // network failure, request prevented
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            }

            return Promise.reject(new Error(response.statusText));
        })
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return null;
        });
};

const x_post = (url, data) =>
    fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => {
            // network failure, request prevented
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        })
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => {
            // common error
            return null;
        });

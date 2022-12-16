class Request {
    static get(api, success, fail=console.log) {
        fetch(
            api,
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            success(data);
        })
        .catch((error) => {
            fail(error);
        })
    
    }
    
    static post(api, success, fail, config) {
        fetch(
            api,
            {
                body : config.body,
                method : "POST",
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            success(data);
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
            fail(error);
        })
    }

    static put() {

    }

    static delete() {

    }
}

export { Request }
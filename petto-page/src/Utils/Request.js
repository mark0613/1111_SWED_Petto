class Request {
    static get(url, args) {
        fetch(
            url,
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            args.success(data);
        })
        .catch((error) => {
            args.fail = (typeof args.fail !== 'undefined') ?  args.fail : console.log;
            args.fail(error);
        })
    }
    
    static post(url, args) {
        fetch(
            url,
            {
                body : args.body,
                method : "POST",
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            args.success(data);
        })
        .catch((error) => {
            args.fail = (typeof args.fail !== 'undefined') ?  args.fail : console.log;
            args.fail(error);
        })
    }

    static put() {

    }

    static delete(url, args) {
        fetch(
            url,
            {
                body : args.body,
                method : "DELETE",
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            args.success(data);
        })
        .catch((error) => {
            args.fail = (typeof args.fail !== 'undefined') ?  args.fail : console.log;
            args.fail(error);
        })
    }
}

export { Request }
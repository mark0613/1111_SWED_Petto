class CookieUtil {
    static getAllCookies() {
        let result = {};
        if (document.cookie.length === 0) {
            return result;
        }
        document.cookie.split("; ").map((pair) => {
            let [k, v] = pair.split("=");
            result[k] = v;
        });
        return result;
    }

    static replaceAll(cookiesJson) {
        let result = [];
        for (let k in cookiesJson) {
            let v = cookiesJson[k];
            result.push(`${k}=${v}`);
        }
        if (result.length > 0) {
            document.cookie = result.join("; ");
        }
    }

    static getValue(key) {
        return CookieUtil.getAllCookies()[key];
    }

    static set(key, value) {
        let all = CookieUtil.getAllCookies();
        all[key] = value;
        CookieUtil.replaceAll(all);
    }

    static contains(key) {
        return CookieUtil.getAllCookies().hasOwnProperty(key);
    }

    static clearAll() {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            for(var i = keys.length;i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}

export { CookieUtil };

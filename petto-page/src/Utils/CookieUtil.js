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
        document.cookie = result.join("; ");
    }

    static getValue(key) {
        return CookieUtil.getAllCookies()[key];
    }

    static set(key, value) {
        let all = CookieUtil.getAllCookies();
        console.log(all);
        all[key] = value;
        CookieUtil.replaceAll(all);
    }
}

export { CookieUtil };

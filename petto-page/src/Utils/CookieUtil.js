import Cookies from 'universal-cookie';


const cookies = new Cookies();

class CookieUtil {
    static set(key, value) {
        cookies.set(
            key,
            value, 
            { 
                path: '/',
                secure: true,
                sameSite :true
            }
        );
    }

    static getValue(key) {
        return cookies.get(key);
    }

    static contains(key) {
        return cookies.getAll().hasOwnProperty(key);
    }

    static remove(key) {
        cookies.remove(key, { path: '/' });
    }
}

export { CookieUtil };

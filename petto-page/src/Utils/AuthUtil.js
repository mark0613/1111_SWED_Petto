import { 
    decodeToken,
    isExpired,
} from "react-jwt";

import { CookieUtil } from ".";


class AuthUtil {
    static isLogin() {
        if (CookieUtil.contains("token")) {
            let token = CookieUtil.getValue("token");
            return !isExpired(token);
        }
        return false;
    }

    static logout() {
        CookieUtil.remove("token");
    }

    static getUserDetails() {
        if (!AuthUtil.isLogin()) {
            return null;
        }
        let token = CookieUtil.getValue("token");
        return decodeToken(token);
    }
}

export { AuthUtil };

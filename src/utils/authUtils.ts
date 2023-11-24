export const setAuthTokens = (accessToken: any) => {

    localStorage.setItem("TOKEN_KEY", accessToken);

    let payload = accessToken.split(".")[1];
    payload = window.atob(payload);
    const user = { ...JSON.parse(payload) }

    localStorage.setItem("USER_INFO", JSON.stringify(user));

    const expirationTime = new Date(user.exp);

    localStorage.setItem("EXPIRATION_TIME", expirationTime.toString());

};

export const getToken = () => {
    const token = localStorage.getItem('USER_INFO');
    const expirationTime = localStorage.getItem('EXPIRATION_TIME');


    if (!token || !expirationTime) {
        return null;
    }

    if (isTokenExpired(expirationTime)) {
        clearToken();
        return null;
    }

    return JSON.parse(token);
};


export const getUserInfo = () => {
    const userInfo = localStorage.getItem('USER_INFO');
    const expirationTime = localStorage.getItem('EXPIRATION_TIME');

    if (!userInfo || !expirationTime) {
        return null;
    }

    if (isTokenExpired(expirationTime)) {
        clearToken();
        return null;
    }

    return JSON.parse(userInfo);
};

export const isTokenExpired = (expirationTime: string) => {
    return Date.now() > parseInt(expirationTime, 10);
};

export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
};

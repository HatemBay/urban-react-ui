import formatDate from "./formatDate";

export const setAuthTokens = async (accessToken: any) => {
  localStorage.setItem("TOKEN_KEY", accessToken);

  let payload = accessToken.split(".")[1];
  payload = window.atob(payload);
  const user = { ...JSON.parse(payload) };

  localStorage.setItem("USER_INFO", JSON.stringify(user));

  const expirationTime = new Date(user.exp * 1000);

  localStorage.setItem(
    "EXPIRATION_TIME",
    ((user.exp * 1000) as number).toString()
  );
};

export const getToken = () => {
  const token = localStorage.getItem("USER_INFO");
  const expirationTime = localStorage.getItem("EXPIRATION_TIME");

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
  const userInfo = localStorage.getItem("USER_INFO");
  const expirationTime = localStorage.getItem("EXPIRATION_TIME");

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
  localStorage.removeItem("USER_INFO");
  localStorage.removeItem("EXPIRATION_TIME");
};

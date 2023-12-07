const ACCESS_TOKEN_KEY = "access_token";

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

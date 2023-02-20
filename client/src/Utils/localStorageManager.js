//! Store the AccessToken in the Local Storage Memory 3

export const KEY_ACCESS_TOKEN = "access_token";

//* LOGIN
export function setItem(key, value) {
  //This method is invoked when user login
  //to save the accessToken in local storage
  localStorage.setItem(key, value);
}

//* LOGGED IN ALLREADY
export function getItem(key) {
  //This method is invoked when user is already logged in
  //to access the accessToken from local storage
  return localStorage.getItem(key);
}

//* LOGGED OUT
export function removeItem(key) {
  //This method is invoked when user logout
  localStorage.removeItem(key);
}

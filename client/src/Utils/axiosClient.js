import axios from "axios";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";

//! Create the axiosClient with Backend BASE URL 1
export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

//! Request Interceptor 4 (send accessToken before calling the request API)
//*(access the accessToken from local storage and send it to the Headers like Postman)
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

//! Response Interceptor 5
axiosClient.interceptors.response.use(async (response) => {
  const data = response.data;
  const status = data.status; //? ok
  const error = data.error; //? error
  const statusCode = data.statusCode; //? 200 or 401
  const originalRequet = response.config;

  //?when access token is valid the return from here right now
  if (status === "ok") {
    return data;
  }

  //?when refresh token has expired, will send user to login page
  if (
    statusCode === 401 &&
    originalRequet.url ===
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
  ) {
    removeItem(KEY_ACCESS_TOKEN);
    window.location.replace("/login", "_self");
    return Promise.reject(error);
  }

  //?when access token has expired, will generate the new Access Token by calling the RefreshApi
  if (statusCode === 401 && !originalRequet._retry) {
    originalRequet._retry = true;

    const response = await axios
      .create({
        withCredentials: true,
      })
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
      
    console.log("response from backend: ", response);

    if (response.status === "ok") {
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      originalRequet.headers[
        "Authorization"
      ] = `Bearer ${response.result.accessToken}`;

      return axios(originalRequet);
    }
  }

  //? If CodeStatus is not 401 the return reject error only
  return Promise.reject(error);
});

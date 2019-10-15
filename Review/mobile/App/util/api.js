import { AsyncStorage } from "react-native";
import { navigate } from "./NavigationService";

//const BASE_URL = "http://localhost:3000";
//const BASE_URL = "http://172.17.57.104:3000";
const BASE_URL = "http://10.30.129.49:3000";
const AUTH_TOKEN = "ReviewApp::AUTH_TOKEN";

// save user login info
export const saveAuthToken = token => {
  // sign out
  if (!token) {
    return AsyncStorage.removeItem(AUTH_TOKEN);
  }

  return AsyncStorage.setItem(AUTH_TOKEN, token);
};

// check if login info saved before
export const hasAuthToken = () => {
  return AsyncStorage.getItem(AUTH_TOKEN).then(token => {
    if (token) {
      return true;
    }

    return false;
  });
};

export const reviewApi = (path, options = {}) => {
  return AsyncStorage.getItem(AUTH_TOKEN).then(token => {
    const completeOptions = {
      // json type
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json"
      }
    };

    // add token info to get restaurant/review info
    if (token) {
      completeOptions.headers.authorization = `Bearer ${token}`;
    }

    return fetch(`${BASE_URL}/api${path}`, completeOptions).then(async res => {
      const responseJson = await res.json();

      if (res.ok) {
        return responseJson;
      }

      // if unauthorized
      if (res.status === 401) {
        navigate("Auth"); // go to sign-in screen
        saveAuthToken(); // remove auth token
      }

      throw new Error(responseJson.error);
    });
  });
};

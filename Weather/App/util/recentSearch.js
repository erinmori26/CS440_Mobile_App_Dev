import { AsyncStorage } from "react-native";
// AsyncStorage stores locally on device (phone)

// import AsyncStorage from '@react-native-community/async-storage';
// yarn add @react-native-community/async-storage
// react-native link @react-native-community/async-storage

const KEY = "@WeatherApp/searchHistory"; // store search key

export const getRecentSearch = () =>
  AsyncStorage.getItem(KEY).then(str => {
    // if string does not exist, return it
    if (str) {
      return JSON.parse(str);
    }

    return [];
  });

export const addRecentSearch = item =>
  getRecentSearch().then(history => {
    // get rid of duplicate searches
    const oldHistory = history.filter(
      existingItem => existingItem.id !== item.id
    );
    const newHistory = [item, ...oldHistory]; // spread old history onto back of obj

    // change to string, write to memory storage
    return AsyncStorage.setItem(KEY, JSON.stringify(newHistory));
  });

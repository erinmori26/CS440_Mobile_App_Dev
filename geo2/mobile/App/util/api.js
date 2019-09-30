//const BASE_URL = "http://localhost:3000"; // computer
//const BASE_URL = "http://172.17.58.118:3000"; // Wifi
//const BASE_URL = "http://173.51.196.50:3000"; // iPhone
const BASE_URL = "http://172.17.57.236:3000";

export const geoFetch = (path, options = {}) => {
  return fetch(`${BASE_URL}/api${path}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Something went wrong... please try again.");
    })
    .catch(error => {
      // catch global errors
      console.warn("ERROR: ", `${BASE_URL}/api${path}`, error);

      throw new Error(error);
    });
};

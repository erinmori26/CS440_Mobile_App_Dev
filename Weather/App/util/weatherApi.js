// For call for weather and forecast (same base code)
// Clean up Details.js (more consistent/less repetitive)

const apiKey = "d3d9d604fe4dec7152c2489147f5cab4";

export const weatherApi = (path, { zipcode, coords }) => {
  let suffix = "";

  if (zipcode) {
    suffix = `zip=${zipcode}`; // for zipcode
  } else if (coords) {
    suffix = `lat=${coords.latitude}&lon=${coords.longitude}`; // for coord
  }

  // call to weather API to get weather info
  return fetch(
    `https://api.openweathermap.org/data/2.5${path}?appid=${apiKey}&units=imperial&${suffix}` // add info to request
  ).then(response => response.json()); // response to fetch
};

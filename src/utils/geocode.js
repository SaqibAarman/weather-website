const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    " .json?access_token=pk.eyJ1Ijoic2FxaWJhYXJtYW4iLCJhIjoiY2t6M3dwN29tMDRoNzJ2cG43b3NldDh4ayJ9.JqNuB_KMRpR--ipPamOM0g";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable To Connect Server!", undefined);
    } else if (response.body.features.length === 0) {
      callback("No Location found", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

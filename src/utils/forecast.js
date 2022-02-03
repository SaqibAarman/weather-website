const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e3f772de9499757da737df23f6c68f66&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, response) => {
    //const data = JSON.parse(response.body);
    if (error) {
      callback("Unable To Connect Server!", undefined);
      //console.log("Unable To Connect Server!");
    } else if (response.body.error) {
      callback("Something Went Wrong...", undefined);
      //console.log("Something Went Wrong...");
    } else {
      callback(
        undefined, "It Is Currently" + " " +
        response.body.current.temperature +
          " " +
          "degrees Temperature. It feels " +
          response.body.current.feelslike +
          " " +
          "degree Out. And the Weather Description Is" + " ' " +
          response.body.current.weather_descriptions[0] + " ' "
      );
      /* console.log(
      response.body.current.temperature +
        "degree out. It feels" +
        response.body.current.feelslike +
        "degree out. And the weather Description is" +
        response.body.current.weather_descriptions[0]
    ); */
    }
  });
};

module.exports = forecast;

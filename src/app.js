const hbs = require("hbs");
const path = require("path");
const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

/* console.log(__dirname);
console.log(path.join(__dirname, "../public")); */

const app = express();

const port = process.env.PORT || 3001;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templetes/views");

const partialPath = path.join(__dirname, "../templetes/partialy");

//setUp static directory serve
app.use(express.static(publicDirectoryPath));

// setUps handlerBars and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Saqib Ahmed",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Saqib Ahmed",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must provide Search Term",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("pageNotFound", {
    title: "404",
    errorMessage: "Not Found Page...",
    name: "Saqib Ahmed",
  });
});

app.listen(port, () => {
  console.log("Port Started On " + port);
});

/* 

console.log(req.query.address);
  res.send({
    /* products: [{
        address:req.query.address
    }], 
    forecast: "Rainy",
    location: "Mysore",
    address: req.query.address,
  });

*/

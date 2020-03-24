const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/views");
const partialDirectoryPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialDirectoryPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "rhodlib"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "rhodlib"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page!",
    name: "rhodlib"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term"
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, name } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        address: req.query.address,
        forecast: forecastData,
        location: name
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "rhodlib",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Page not found",
    name: "rhodlib"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

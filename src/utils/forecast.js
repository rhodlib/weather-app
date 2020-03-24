const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/1d33b28740049006f1c3ed39d50f284f/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!..", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        chanceToRain: body.currently.precipProbability,
        maxTemperature: body.daily.data[0].temperatureHigh,
        minTemperature: body.daily.data[0].temperatureLow,
      });
    }
  });
};

module.exports = forecast;

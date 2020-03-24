const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmhvZGxpYiIsImEiOiJjazgzcGN2a3owMXdwM2xsYTFxenhldmdiIn0.qznIPqMJbG4C-qtAsHFfAA&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocoding service!.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        name: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      });
    }
  });
};

module.exports = geocode;

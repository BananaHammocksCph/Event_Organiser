const axios = require("axios");
require("dotenv").config();

const getLocationFromIp = (ip, cb) => {
  let url = 'https://ipinfo.io/'+ip+'/?token=4b9949e9536e10';
axios
  .get(url)
  .then(function(response) {
    // handle success
    console.log(response.data);
     cb({}, response.data);
  })
  .catch(function(error) {
    // handle error
      cb(error, {});
  });
}

// Gets distance between two sets of coordinates
function getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2) {
  var p = 0.017453292519943295;    //This is  Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((latitude2 - latitude1) * p) / 2 +
    c(latitude1 * p) * c(latitude2 * p) *
    (1 - c((longitude2 - longitude1) * p)) / 2;
  var R = 6371; //  Earth distance in km so it will return the distance in km
  var dist = 2 * R * Math.asin(Math.sqrt(a));
  return dist;
}

const convertLocationString = (cStr) => {
  var locArr = cStr.split(',');
  return {
    lat: locArr[0],
    lon: locArr[1]
  };
}

exports.getLocationFromIp = getLocationFromIp;
exports.getDistanceFromLatLonInKm = getDistanceFromLatLonInKm;
exports.convertLocationString = convertLocationString;
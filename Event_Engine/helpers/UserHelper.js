const axios = require('axios');

// DTO for transfering a user connection to the VPN_VALIDATOR_SERVICE
function userConnectionDTO(user, lat, lon, ip) {
  return {userDTO: {
  id: user._id,
  ip: ip,
  lat: lat,
  lon: lon,
  date: Date.now()
  }};
}

// Request VPNService
const requestVPN = (userDTO) => {
  return axios
    .post("http://vpnservice:3002/api/connections", userDTO)
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
}

exports.requestVPN = requestVPN;
exports.userConnectionDTO = userConnectionDTO;
// DTO for transfering a user connection to the VPN_VALIDATOR_SERVICE
function userConnectionDTO(user, ip, coords) {
  return {
  id: user._id,
  ip: ip,
  coordinates: coords,
  date: Date.now()
  };
}

exports.userConnectionDTO = userConnectionDTO;
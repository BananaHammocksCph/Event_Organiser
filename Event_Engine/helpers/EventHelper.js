// DTO for transfering a user connection to the VPN_VALIDATOR_SERVICE
function EventEmailDTO(event) {
  return {
    Name: event.Name,
    Date: event.Date,
    Catering: event.Catering,
    Catering_Desc: event.Catering_Desc,
    Recipient: event.Email,
    Date: event.Date
  };
}

exports.EventEmailDTO = EventEmailDTO;
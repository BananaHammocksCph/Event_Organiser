// DTO for transfering a user connection to the VPN_VALIDATOR_SERVICE
function EventEmailDTO(event) {
  return {
    Catering: event.Catering,
    Catering_Desc: event.Catering_Desc,
    Recipient: getRecipientEmail(),
    Date: event.Date
  };
}

const getRecipientEmail = (event) => {
  return "seanaltoft@gmail.com"
}

exports.EventEmailDTO = EventEmailDTO;
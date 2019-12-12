// const sendMsg = require('../amqp/send');
const BufferHelper = require('./BufferHelper');
const EventHelper = require("./EventHelper");
const amqp = require('../amqp/send');

// Checks if event object has catering, and then sends the event to queue if it does
function handleEvent(eventObj) {
  if ( eventObj.Catering) {
    amqp.sendMsg("mail_queue", BufferHelper.convertJSONToBuffer(EventHelper.EventEmailDTO(eventObj)));
  }
}

module.exports.handleEvent = handleEvent;
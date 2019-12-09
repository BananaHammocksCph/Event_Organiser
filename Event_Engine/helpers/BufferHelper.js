// Converts a JSON Object to a buffer
const convertJSONToBuffer = (json) => {
  let buf = Buffer.from(JSON.stringify(json));
  return buf;
}

// Converts a buffer to a JSON Object
const convertBufferToJSON = (buffer) => {
  var temp = JSON.parse(buf.toString());
  return temp;
}

exports.convertJSONToBuffer = convertJSONToBuffer;
exports.convertBufferToJSON = convertBufferToJSON;
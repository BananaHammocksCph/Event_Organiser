"use strict";
const bramqp = require("bramqp");
const net = require("net");
const async = require("async");
const socket = net.connect({
  port: 5672
});

const sendMsg = (queueName, msgBuffer) => {
bramqp.initialize(socket, "rabbitmq/full/amqp0-9-1.stripped.extended", function(
  error,
  handle
) {
  async.series(
    [
      function(seriesCallback) {
        handle.openAMQPCommunication("guest", "guest", true, seriesCallback);
      },
      function(seriesCallback) {
        handle.queue.declare(
          1,
          queueName,
          false,
          true,
          false,
          false,
          false,
          {}
        );
        handle.once("1:queue.declare-ok", function(channel, method, data) {
          console.log("queue declared");
          seriesCallback();
        });
      },
      function(seriesCallback) {
        const args = process.argv.splice(2);
        const message =msgBuffer;
        handle.basic.publish(1, "", queueName, false, false, function() {
          handle.content(
            1,
            "basic",
            {
              "content-encoding": "utf-8",
              "content-type": "application/json",
              delivery_mode: 2
            },
            message,
            seriesCallback
          );
        });
      },
      function(seriesCallback) {
        handle.closeAMQPCommunication(seriesCallback);
      },
      function(seriesCallback) {
        handle.socket.end();
        setImmediate(seriesCallback);
      }
    ],
    function() {
      console.log("all done");
    }
  );
});
};

exports.sendMsg = sendMsg;
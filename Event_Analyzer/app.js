const amqp = require('amqp'), util = require('util');
const mq_cnn = amqp.createConnection({
    host: 'rabbitmq'
});

mq_cnn.on('ready', function () {
    console.log("Connected");
    mq_cnn.queue('analyzer_queue', function (q) {
        console.log('Listening to analyzer_queue');
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            handleRequest(message);
        });
    });
});

function handleRequest(message) {
    
}
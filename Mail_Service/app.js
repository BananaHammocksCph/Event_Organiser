const amqp = require('amqp'), util = require('util');
const mq_cnn = amqp.createConnection({
    host: '127.0.0.1'
});

mq_cnn.on('ready', function () {
    console.log("Connected");
    mq_cnn.queue('mail_queue', function (q) {
        console.log('Listening to mail_queue');
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            handleRequest(message);
        });
    });
});

function handleRequest(message) {
    var nodemailer = require('nodemailer');

    console.log(message);

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'bananahammocksinfo@gmail.com',
            pass: 'bananahammocks'
        }
    });
    
    var mailOptions = {
        from: 'bananahammocksinfo@gmail.com',
        to: message.Recipient,
        subject: 'Subject',
        text: 'Text'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
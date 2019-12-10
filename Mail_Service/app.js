const amqp = require('amqp'), util = require('util');
const mq_cnn = amqp.createConnection({
    host: '127.0.0.1'
});

mq_cnn.on('ready', function () {
    console.log('Listening to user_queue');
    mq_cnn.queue('user_queue', function (q) {
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
        to: message.UserMail,
        subject: 'Subject',
        text: 'Text'
    };

    console.log("Mail sent");
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
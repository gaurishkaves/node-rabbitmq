var amqp = require('amqplib/callback_api');
//const opt = { credentials: require('amqplib').credentials.plain('guest', 'guest') };

amqp.connect('',function(error1,connection){
    if (error1) {
        throw error1;
    }
       connection.createChannel(function(error1, channel) {
          if (error1) {
            throw error1;
          }
          var exchange = 'direct_logs';
          var exchange_type = 'direct';
          var msg = process.argv.slice(2).join(' ') || 'Hello 5';
          var queue = 'test';

          channel.assertExchange(exchange, exchange_type, {
            durable: false // if true queue will be active when server restart
          });

          //channel.publish(exchange, queue, Buffer.from(msg));
          //console.log(" [x] Sent %s", msg);

           channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
          });






        });

        setTimeout(function() {
          connection.close();
          process.exit(0);
        }, 500);


})
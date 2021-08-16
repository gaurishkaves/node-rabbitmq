var amqp = require('amqplib/callback_api');
const opt = { credentials: require('amqplib').credentials.plain('guest', 'guest') };

amqp.connect('amqp://snow:snowpass@206.189.130.135:5672/',function(error1,connection){
  if (error1) {
        throw error1;
      }
       connection.createChannel(function(error1, channel) {
          if (error1) {
            throw error1;
          }
          var exchange = 'direct_logs';
          var msg = process.argv.slice(2).join(' ') || 'Hello 5';

          channel.assertExchange(exchange, 'direct', {
            durable: false
          });
          channel.publish(exchange, 'test', Buffer.from(msg));
          console.log(" [x] Sent %s", msg);
          var queue = 'task_queue';
            channel.assertQueue(queue, {
              durable: true
            });

          channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
          });



        });

        setTimeout(function() {
          connection.close();
          process.exit(0);
        }, 500);


})
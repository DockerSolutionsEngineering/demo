const config = require('./config');

const amqplib = require('amqplib');
const mysql = require ('mysql2');
const restify = require('restify');

// Connect to MySQL
const mysqlconn = mysql.createConnection(config.mysql);

let cur_task_id = 1;

// Start Restify
const server = restify.createServer({
  name: 'MessyRepo',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/tasks', function (req, res, next) {
  res.send(cur_task_id);
  return next();
});

server.listen(config.app.port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// Main loop
async function main() {
    const amqpconn = await amqplib.connect(config.rabbitmq.url);

    const tasksConsumer = await amqpconn.createChannel();
    await tasksConsumer.assertQueue(config.rabbitmq.queue);

    // Tasks consumer
    tasksConsumer.connection(config.rabbitmq.queue, (message) => {
        if (message !== null) {
            console.log('Inbound Task: ', message.content.toString());
            mysqlconn.query('INSERT INTO `tasks` VALUES (?)', [message.content.toString()]);
            tasksConsumer.ack(message);
        } else {
            console.log('Consumer cancelled by server');
        }
    })

    // Task dispatcher
    const taskDispatcher = await amqpconn.createChannel();
    setInterval(() => {
        taskDispatcher.sendToQueue(config.rabbitmq.queue, Buffer.from(`Task ID: ${cur_task_id++}`));
    }, 1000);


    // Select stored tasks
    setInterval(() => {
        console.log('*** Current Tasks *** \n');
        mysqlconn.query('SELECT * FROM `tasks` WHERE `task_id` > 0', function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        });
    }, 1337);
}

main();
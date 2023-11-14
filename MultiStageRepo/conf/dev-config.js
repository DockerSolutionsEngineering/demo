const config = {
    app: {
        port: 8080
    },
    mysql: {
        host: 'db',
        user: 'root',
        database: 'tasks'
    },
    rabbitmq: {
        url: 'amqp://amqp',
        queue: 'tasks'
    }
};

module.exports = config;
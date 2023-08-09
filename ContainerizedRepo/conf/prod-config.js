const config = {
    app: {
        port: 8080
    },
    mysql: {
        host: 'gandolf01.messycorp.com',
        user: 'root',
        database: 'prod_accounts'
    },
    mongo: {
        url: 'mongodb://frodo01.messycorp.com:27017'
    },
    rabbitmq: {
        url: 'amqp://bilbo04.messycorp.com',
        queue: 'tasks'
    }
};

module.exports = config;
const restify = require('restify');

// Start Restify
const server = restify.createServer({
  name: 'BasicRepo',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', function (req, res, next) {
  res.send('Hello world!');
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// Main loop
async function main() {
    console.log('Testing 1, 2, 3?');
}

main();
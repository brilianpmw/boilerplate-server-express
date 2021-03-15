/*** App Init ***/
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  config = require('./database'),
  fileUpload = require('express-fileupload'),
  path = require('path'),
  debug = require('debug')('shipping-connector:server');
http = require('http');

app = express(),

  // app.use(express.static('files'))
  app.use(express.static(path.join(__dirname, '..')));
app.use(morgan('combined'));
app.use(fileUpload());
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*** Global Variable ***/
require(`./global`)(global);

/*** Database Connection ***/


mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log('\n\n\n\n');
  console.log(`Server successfully compiled on ${moment().format(`YYYY-MM-DDTHH:mm:ss.SSSZ`)} \nDatabase connection Success!\n\n\n\n\n`);
});

/*** FOR CREATE NEW ROUTES ***/
require(`./routes`)(app);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8888');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/judge')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

//require('./javascripts/db');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/judge', routes.index);
app.get('/users', user.index);

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

var io =  require('socket.io').listen(server);
io.set('log level', 3);
var ls = 0;
io.sockets.on('connection', function (socket) {
    ls++;

    console.log("LS'ow jest " + ls);

    console.log(socket.id);
    socket.emit('socketid', socket.id);
    socket.emit('clientid', socket.id);
    console.log("Client");
//    io.sockets.socket(socket.id).emit('clientid', socket.id);


    socket.on('klientid', function (data) {
      console.log(data);
      io.sockets.emit('socketid', data);
    });

    socket.on('newplayer', function (data) {
      console.log(data);
      io.sockets.emit('nowenoty', data);
    });

    socket.on('sendocen', function (data) {
      console.log(data);
      io.sockets.emit('ocenjudges', data);
    });

    socket.on('danee', function (data) {
        io.sockets.emit('dane', data);
    });

    socket.on('disconnect', function () {
       ls--;
       console.log("LS'ow jest " + ls);
    });
});

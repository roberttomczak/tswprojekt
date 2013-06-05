
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/judge')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();



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
io.set('log level', 1);
var ls = -1;
var ilosc = 0, t = 0, g = 0, k = 0, n= 0, r = 0;
var db = require('./public/javascripts/db');
var mongoose = require('mongoose');
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

    
    
    socket.on('zapisz', function (dane) {
        ilosc++;
        console.log(ilosc);
        var players = new db.model();
        players.name = dane.imie;
        t += dane.t;
        g += dane.g;
        k += dane.k;
        n += dane.n;
        r += dane.r;
	console.log(t);
	console.log(g);
	console.log(k);
	console.log(n);
	console.log(r);
        if (ilosc === ls) {
		mongoose.connect('mongodb://localhost/players');
		mongoose.connection.on('open', function (){			 
			players.t = t;
			players.g = g;
			players.k = k;
			players.n = n;
			players.r = r;
			players.srednia =  (players.t + players.g + players.k + players.n + players.r) / ls;
			players.save(function(err, player_saved){
				if(err){
					throw err;
					console.log(err);
					mongoose.connection.close();
				}else{
					console.log('saved!');
					mongoose.connection.close();
				}
			});
			
		});
        }

    });


});

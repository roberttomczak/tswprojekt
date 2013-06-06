
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

app.get('/judge',/* routes.index*/ function(){
    var Player = db.model( 'Players' );
    Player.find( function ( err, players , count){
        res.render('index', {
            title : 'Express Judge Notes',
            players : players
        });
    });
});
app.get('/users', user.index);

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

var io =  require('socket.io').listen(server);
io.set('log level', 1);
var ls = -1;
var ilosc = 0, t = 0, g = 0, k = 0, n = 0, r = 0, srednianot = 0, imie = "";
//var db = require('./public/javascripts/db');

//MongoDB
var mongoose = require('mongoose');
var db = mongoose.connection;

var Players = mongoose.Schema({
    name    : String,
    t : Number,
    g : Number,
    k : Number,
    n : Number,
    r : Number,
    srednia : Number

});

var playersmodel = db.model('Players', Players);
var zapisz = function (name1, t1, g1, k1, n1, r1, sredniafun){

    mongoose.connect('mongodb://localhost/test', function(err){
        if (err) throw err;
        else console.log("Connected to database");
    });

    db.on('open', function () {
        console.log("Add to database");
        var player = new playersmodel({
            name : name1,
            t : t1,
            g : g1,
            k : k1,
            n : n1,
            r : r1,
            srednia : sredniafun
        });

        player.save(function(err, player_saved){
            if(err){
                throw err;
                console.log(err);
                db.close();
            }else{
                console.log('saved!');
                console.log(player_saved);
                db.close();
            }
        });
    });
};

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

    socket.on('flusk', function (data){
        console.log(data.clientid)
        io.sockets.emit('wyczysc', data);
    });

    socket.on('aktywuj', function (data){
        io.sockets.socket(data.clientid).emit('accept', data);
    });

    socket.on('disconnect', function () {
       ls--;
       console.log("LS'ow jest " + ls);
    });

    
    
    socket.on('zapisz', function (dane) {
        ilosc++;
        console.log(ilosc);
        console.log(dane.imie);
        imie = dane.imie;
        t += parseFloat(dane.t);
        g += parseFloat(dane.g);
        k += parseFloat(dane.k);
        n += parseFloat(dane.n);
        r += parseFloat(dane.r);
        console.log(t);
        console.log(g);
        console.log(k);
        console.log(n);
        console.log(r);
        if (ilosc === ls) {
            console.log("Before");
            srednianot = (t + g + k + n + r) / ls;
            zapisz(dane.imie,t,g,k,n,r,srednianot);
            console.log(srednianot);
            ilosc = 0, t = 0, g = 0, k = 0, n = 0, r = 0, srednianot = 0 , imie = "";


        }
    });
});

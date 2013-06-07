var mongoose = require('mongoose');
exports.db = mongoose.connection;
dbs = mongoose.connection;

mongoose.connect('mongodb://localhost/test', function(err){
    if (err) throw err;
    else console.log("Connected to database db.js");
});

var Players = mongoose.Schema({
    name    : String,
    t : Number,
    g : Number,
    k : Number,
    n : Number,
    r : Number,
    srednia : Number

});

exports.playersmodel = dbs.model('Players', Players)
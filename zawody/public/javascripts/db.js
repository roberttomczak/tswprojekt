var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
db = mongoose.connection;
var Players = new Schema({
    name    : String,
    t : Number,
    g : Number,
    k : Number,
    n : Number,
    r : Number

});


mongoose.connect('mongodb://localhost/players');

exports.model= mongoose.model('Players', Players);

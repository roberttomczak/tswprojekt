var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var Players = new Schema({
    name    : String,
    surname    : String,
    t : Number,
    g : Number,
    k : Number,
    n : Number,
    r : Number

});
 
mongoose.model('Players', Players);
 
mongoose.connect('mongodb://localhost/players');
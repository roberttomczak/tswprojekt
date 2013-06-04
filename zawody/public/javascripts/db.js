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
 
mongoose.connect('mongodb://localhost/players');

module.exports = mongoose.model('Players', Players);
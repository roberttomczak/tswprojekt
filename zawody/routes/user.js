
/*
 * GET users listing.
 */

exports.index = function(req, res){
  res.render('judge', { title: 'judge' });
};

////Mongoose

//
//var mongoose = require('mongoose');
//var Schema   = mongoose.Schema;
//
//var schemat = new Schema({
//    name    : String,
//    surname    : String,
//    t : Number,
//    g : Number,
//    k : Number,
//    n : Number,
//    r : Number
//
//});
//
//var Players = mongoose.model('Players', schemat);
//
//mongoose.connect('mongodb://localhost/players');

//END Mongoose

//exports.zapiszgracza = function ( imie, t, g, k, n, r){
//  new Players({
//    imie:imie, t: t, g: g, k: k, n: n, r: r
//  }).save( function( err ){
//    console.log("Zawodnik zapisany !!");
//  });
//};
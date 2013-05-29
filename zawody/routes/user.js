
/*
 * GET users listing.
 */

exports.index = function(req, res){
  res.render('judge', { title: 'Judge' });
};

var mongoose = require('mongoose');
var Players  = mongoose.model('Players');

exports.zapiszgracza = function (  ){
  new Players({
    
  }).save( function( err, todo, count ){
   
  });
};
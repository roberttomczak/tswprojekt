var mongoose = require('mongoose');
exports.index = function ( req, res ){
    var Player = mongoose.model( 'Players' );
    Player.find( function ( err, players , count){
      res.render('index', {
        title : 'Express Judge Notes',
        players : players
        });
    });
};
//var mongoose = require( 'mongoose' );
//var Player     = mongoose.model('Players');

exports.index = function ( req, res ){
//    Player.find( function ( err, players ){
        res.render('index', {
            title : 'Express Todo Example',
//            players : players
        });
//    });
};
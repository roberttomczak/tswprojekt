exports.index = function ( req, res ){
      res.render('index', {
        title : 'Express Judge Notes'
      });

};

//var Players = require("../public/javascripts/db");
//exports.index = function ( req, res ){
//    Players.playersmodel.find( function ( err, players, count ){
//        res.render( 'index', {
//            title : 'Express Judge Notes',
//            players : players
//        });
//        Players.db.close();
//    });
//};
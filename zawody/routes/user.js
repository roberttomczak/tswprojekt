
/*
 * GET users listing.
 */

exports.index = function(req, res){
  res.render('judge', { title: 'Judge' });
};
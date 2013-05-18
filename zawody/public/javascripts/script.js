$(function(){

	var socket = io.connect();
	socket.on('od_serwera', function (data) {
		console.log(data);
		socket.emit('od_klienta', { sie: 'ma!' });
	});
	socket.on('do_glownego',function(data){
		console.log(data);
		$(".well").append('<p>' + data + '</p>');
	});

	$('#add-player').click(function(){
		$('#new-player').slideToggle();
	});

	$('#sendplayer').click(function(){
		var player = {};
		player.name = $('#imie').val();
		player.surname = $('#nazwisko').val();
		socket.emit('newplayer',player);
	});

	socket.on('ocenjudges',function(data){
		console.log(data);
		$("#wyniki").append('<p>' + data.imie + '</p> <p> t: ' + data.t + ' g: ' + data.g +' k: ' + data.k + ' n: ' + data.n + ' r: ' + data.r + '</p>');
	});

});
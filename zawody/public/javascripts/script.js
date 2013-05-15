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

});
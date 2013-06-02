$(function(){

	var socket = io.connect();


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


    socket.on('socketid',function(data){
        console.log(data);
        $(".well").append("<div class='sedzia'><p>" + data + "</p><div class='zaakceptowane'><span>T:<i class='icon-remove'></i></span>");

    });

});
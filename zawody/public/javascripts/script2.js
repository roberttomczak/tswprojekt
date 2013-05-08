$(function(){

	$(".btn").on('click', function(){
		var username = $("#username").val();
		console.log(username);
		socket.emit('nazwa', username);
		$("#username").val("");
	});

});
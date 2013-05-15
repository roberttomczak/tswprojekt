$(function(){

	var socket = io.connect();
   	socket.on('od_serwera', function (data) {
    	console.log(data);
    	socket.emit('od_klienta', { sie: 'ma!' });
  	});

	$(".btn").on('click', function(){
		var username = $("#username").val();
		console.log(username);
		socket.emit('nazwa', username);
		$("#username").val("");
	});

	socket.on('nowenoty',function(data){
		console.log(data);
		/*$(".noty").append('<div class="zawodnik">')
				  .append('<p>' + data.name + ' ' + data.surname + ' </p>')
				  .append('<p>T: <input type="number" id="t" min="0" max="10"></p>')
				  .append('<p>G: <input type="number" id="g" min="0" max="10"></p>')
				  .append('<p>K: <input type="number" id="k" min="0" max="10"></p>')
				  .append('<p>N: <input type="number" id="n" min="0" max="10"></p>')
				  .append('<p>R: <input type="number" id="r" min="0" max="10"></p>')
				  .append('</div>');*/
		$('<div class="zawodnik"> <p>' + data.name + ' ' + data.surname + ' </p> <p>T: <input type="number" id="t" min="0" max="10"></p> <p>G: <input type="number" id="g" min="0" max="10"></p> <p>K: <input type="number" id="k" min="0" max="10"></p> <p>N: <input type="number" id="n" min="0" max="10"></p> <p>R: <input type="number" id="r" min="0" max="10"></p> </div>').appendTo('.noty');
	});

});
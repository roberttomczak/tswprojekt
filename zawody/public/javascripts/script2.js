$(document).ready(function(){

	var playername;
	var zapisz = require("./routes/user");

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
		playername = data;
		var imie = data.name, nazwisko = data.surname;
		$('.noty').append('<div class="zawodnik"><div id="name">' + imie + ' ' + nazwisko + '</div> <p>T: <input type="number" id="t" min="0" max="10"></p> <p>G: <input type="number" id="g" min="0" max="10"></p> <p>K: <input type="number" id="k" min="0" max="10"></p> <p>N: <input type="number" id="n" min="0" max="10"></p> <p>R: <input type="number" id="r" min="0" max="10"></p><button class="btn btn-primary send" >Send</button></div>');
	});

	$('body').on('click','.send', function(){
		console.log("Dziala Kurwa!!");
		var oceny = {};
		oceny.imie = playername.name;
		oceny.t = $("#t").val();
		oceny.g = $("#g").val();
		oceny.k = $("#k").val();
		oceny.n = $("#n").val();
		oceny.r = $("#r").val();
		zapisz.zapiszgracza();
		socket.emit('sendocen', oceny);
		console.log(oceny);
    });	
});
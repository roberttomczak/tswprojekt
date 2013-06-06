$(document).ready(function () {

	var playername;
    var clid;

	var socket = io.connect();
    $(".noty").on('focusout', 'input', function () {
        var info = $(this).val();
        var iden = $(this).attr('id');
        if (info.length != 0) {
            console.log("ID to " + iden + " a wartosc to " + info);
            socket.emit('danee', {ide: iden, clientid: clid, mood: "ok"});
        } else {
            console.log("Remove");
            socket.emit('danee', {ide: iden, clientid: clid, mood: "bad"});
        }

    });
	$(".btn").on('click', function () {
		var username = $("#username").val();
		console.log(username);
		socket.emit('nazwa', username);
		$("#username").val("");
	});

    socket.on('clientid', function (data) {
        console.log(data);
        clid = data;
        socket.emit('klientid', data);
    });

	socket.on('nowenoty', function (data) {
		console.log(data);
		playername = data;
		var imie = data.name, nazwisko = data.surname;
		$('.noty').append('<div class="zawodnik"><div id="name">' + imie + ' ' + nazwisko + '</div> <p>T: <input type="number" id="t" min="0" max="10" step="0.5"></p> <p>G: <input type="number" id="g" min="0" max="10" step="0.5"></p> <p>K: <input type="number" id="k" min="0" max="10" step="0.5"></p> <p>N: <input type="number" id="n" min="0" max="10" step="0.5"></p> <p>R: <input type="number" id="r" min="0" max="10" step="0.5"></p><button class="btn btn-primary send" disabled >Send</button></div>');
	});

	$('body').on('click', '.send', function () {
		var oceny = {};
		oceny.imie = playername.name;
		oceny.t = $("#t").val();
		oceny.g = $("#g").val();
		oceny.k = $("#k").val();
		oceny.n = $("#n").val();
		oceny.r = $("#r").val();
        socket.emit('zapisz', oceny);
		console.log(oceny);
        $(this).parent().remove();
        console.log(clid);
        socket.emit('flusk', {clientid : clid});
    });

    socket.on('accept', function (data) {
        if(data.stan === "aktywny"){
            console.log("OK button enabled");
            $("div.zawodnik .send").removeAttr("disabled");
        }
    });
});

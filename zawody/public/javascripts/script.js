$(function () {

	var socket = io.connect();

    var licznik = 0, licznik1 = 0;
	$('#add-player').click(function () {
		$('#new-player').slideToggle();
	});

	$('#sendplayer').click(function () {
		var player = {};
		player.name = $('#imie').val();
		player.surname = $('#nazwisko').val();
		socket.emit('newplayer', player);
	});

    socket.on('dane', function (dane) {
//        var $cont =  $("div." + dane.clientid + " span#" + dane.id + " i");
        console.log(dane.ide);
        var $cont =  $("div." + dane.clientid + " span#" + dane.ide + " i");
        if (dane.mood == "ok") {
            console.log("OK");
            $cont.removeClass("icon-remove").addClass("icon-ok");
        }
        if (dane.mood == "bad") {
            console.log("BAD");
            $cont.removeClass("icon-ok").addClass("icon-remove");

        }
//        var ok = $("i.icon-ok").length;
//        console.log(ok);

        if ($("i.icon-ok").length == 5) {
            console.log("IN IF");
            $("#eviar").html("OK");
        } else {
            $("#eviar").html("");
        }
    });

	socket.on('ocenjudges', function (data) {
		console.log(data);
		$("#wyniki").append('<p>' + data.imie + '</p> <p> t: ' + data.t + ' g: ' + data.g + ' k: ' + data.k + ' n: ' + data.n + ' r: ' + data.r + '</p>');
	});

    socket.on('socketid', function (data) {
        console.log(data);
        $(".well").append("<div class='" + data + "'><p>" + data + "</p><div class='zaakceptowane'><span id='t'>T:<i class='icon-remove'></i></span><span id='g'>G:<i class='icon-remove'></i></span><span id='k'>K:<i class='icon-remove'></i></span><span id='n'>N:<i class='icon-remove'></i></span><span id='r'>R:<i class='icon-remove'></i></span></div><br><span id='eviar'></span></div>");

    });

});
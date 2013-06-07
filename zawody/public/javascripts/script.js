$(function () {

	var socket = io.connect();

    var licznik = 0, licznik1 = 0;
	$('#add-player').click(function () {
		$('#new-player').slideToggle();
        $('#imie').focus();
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

        if ($("div." + dane.clientid + " i.icon-ok").length == 5) {
            console.log("IN IF " + dane.clientid);

            $("div." + dane.clientid + " #eviar").html("Kliknij by akceptowac noty <p><button class='btn' id='accept'>Akceptuj</button></p> ");
        } else {
            $("div." + dane.clientid + " #eviar").html("");
        }
    });

    $('.well').on('click', '#accept', function () {
        var iden = $(this).parent().parent().parent().parent().attr("class");
        console.log(iden);
        socket.emit('aktywuj', {stan : "aktywny", clientid : iden});
    });

	socket.on('ocenjudges', function (data) {
		console.log(data);
		$("#wyniki").append('<p>' + data.imie + '</p> <p> t: ' + data.t + ' g: ' + data.g + ' k: ' + data.k + ' n: ' + data.n + ' r: ' + data.r + '</p>');
	});

    socket.on('spis', function (data) {
        console.log(data.playerlist);

        data.playerlist.forEach(function (Player){
            $("#zawodnicy").append("<div id=" + Player.name + "><p>" + Player.name + "</p></div>");
        });


    });

    socket.on('socketid', function (data) {
        console.log(data);
        $(".well").append("<div class='" + data + "'><p>" + data + "</p><div class='zaakceptowane'><span id='t'>T:<i class='icon-remove'></i></span><span id='g'>G:<i class='icon-remove'></i></span><span id='k'>K:<i class='icon-remove'></i></span><span id='n'>N:<i class='icon-remove'></i></span><span id='r'>R:<i class='icon-remove'></i></span><br><span id='eviar'></span></div>");

    });

    socket.on('wyczysc', function (data) {
        console.log("Czyszczenie");
        $(".well div." + data.clientid + " span i").removeClass("icon-ok").addClass("icon-remove");
        $("div." + data.clientid + " #eviar").html("");
    });

});
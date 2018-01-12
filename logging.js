$('#left').click(function(e) {
    document.location.href = "https://serene-fjord-98327.herokuapp.com/dip.html?name=dipe";
});

$('#right').click(function(e) {
    document.location.href = "https://serene-fjord-98327.herokuapp.com/dip.html?name=dipe2";
});


var loc = document.location.href;
var paramItem = loc.split('=');
var socket = io("/" + paramItem[1]);
alert(paramItem[1]);

$('#ugo').click(function(e) {
    let ms = document.myf.com.value;
    let nm = document.myf.name.value;

    if (ms != "" && nm != "") {
        socket.emit('msg', nm + " > " + ms);
    }
    document.myf.com.value = "";
    alert(e);
});

/*
$('#odai').click(function(e) {
    let odai = document.myf.odai.value;
    if (odai != "") {
        socket.emit('dai', odai);
    }
    document.myf.word.value = "";
});*/


socket.on('msg', function(data) {
    switch (true) {
        case / > 931/.test(data):
            var d = data.replace(/931/g, "");
            data = $('<div/>').text(data).html();
            $('#chat_log').prepend(d + '<img src="https://pbs.twimg.com/profile_images/510615322307461120/o-vKGUzY_400x400.jpeg" width="100" height="100"><br><hr>');
            break;
        case /810/.test(data):
            break;

        default:
            if (paramItem[1] == "dipe") {
                data = $('<div/>').text(data).html();
                $('#chat_log').prepend(data + '<br><hr>');
            } else if (paramItem[1] == "dipe2") {
                data = $('<div/>').text(data).html();
                $('#chat_log2').prepend(data + '<br><hr>');
            }
            break;
    }
});

socket.on('dai',
    function(data) {
        $('#titlec').prepend(data);
    });

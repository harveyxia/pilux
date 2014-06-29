'use strict';

$(document).ready(function() {
    var socket = io.connect('http://10.0.0.14:3000');
    // update slider
    socket.on('transition', function(data){
        console.log('recevied transition');
        $('#slider').val(data.lightVal);
    });
    // show message
    socket.on('message', function(data) {
        console.log('received data message');
        $('#message').text(data.message).slideDown('fast');
    });
    // live updating upon slide
    $('#slider')[0].oninput = function() {
        var val = $(this).val();
        socket.emit('color', { lightVal: val });
    }
    $('#green-on').click(function() {
        socket.emit('color', { color: 'g', pwm: 100 });
    });
    $('#green-off').click(function() {
        socket.emit('color', { color: 'g', pwm: 0 });
    });
    // TODO: take user input for delay
    $('#transition').click(function() {
        socket.emit('transition', { delay: 30 });
    });
    $('#all-off').click(function() {
        socket.emit('off', {});
    });
});
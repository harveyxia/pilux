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
    $('#transition').click(function() {
        var delay = Math.max(0, parseInt($('#transition-input').val()));
        socket.emit('transition', { delay: delay });
    });
    $('#set-color').click(function() {
        function validateRange(val) {
            val = parseFloat(val, 10);
            return Math.max(0, Math.min(100, val));
        }
        var r = validateRange($('#r-input').val()),
            g = validateRange($('#g-input').val()),
            b = validateRange($('#b-input').val());
        console.log([r, g, b]);
        socket.emit('color', { r: r, g: g, b: b });
    });
    $('#all-off').click(function() {
        socket.emit('off', {});
    });
});
'use strict';

$(document).ready(function() {
    var socket = io.connect('http://10.0.0.14:3000');
    // live updating upon slide
    $('#slider')[0].oninput = function() {
        console.log('message');
        var val = $(this).val();
        // var url = 'http://localhost:3000/?color=' + val;
        socket.emit('color', { color: val });
    }
});
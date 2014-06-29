'use strict';

var lux = require('./lux.js');

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(express.static( __dirname + '/public'));
app.use(express.static( __dirname + '/node_modules/socket.io/node_modules/socket.io-client'));

app.engine('html', require('jade').renderFile);

app.route('/')
    .get(function(req, res) {
        res.render('index.jade', {},
            function(err, html) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(html);
                }
            });
    });

function broadcastMessage(message) {
    console.log('Broadcasting message: ' + message);
    io.sockets.emit('message', { message: message });
}

io.on('connection', function(socket) {
    socket.on('color', function(data) {
        if (data.color && data.pwm) {
            lux.setColor(data.color, data.pwm);
            var message = 'Set ' + data.color + ' to ' + data.pwm;
            broadcastMessage(message);
        } else if ( data.r !== undefined && data.g !== undefined && data.b !== undefined) {
            console.log('Set color: ' + [data.r, data.g, data.b].join(','));
            lux.light(data.r, data.g, data.b);
            broadcastMessage('Set color: ' + [data.r, data.g, data.b].join(','));
        } else {
            // slider
            console.log(data);
            lux.mapColor(data.lightVal);
            // update slider of all clients
            socket.broadcast.emit('transition', { lightVal: data.lightVal } );
        }
    });

    socket.on('off', function(data) {
        console.log('Darkness.');
        lux.turnOff();
        broadcastMessage('Darkness');
    });

    socket.on('transition', function(data) {
        console.log('transition ' + data.transition);
        lux.transition(data.delay);
        broadcastMessage('Transitioning spiral by ' + data.transition + ' ms');
    });

});

server.listen(3000);
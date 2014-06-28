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
        res.render('index.jade', { message: req.flash('message') },
            function(err, html) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(html);
                }
            });
    })
    .post(function(req, res) {
        // console.log(req.query);
        if (req.query.color === 'greenon') {
            console.log('on');
            lux.greenOn(100);
            req.flash('message', 'Green turned on! :D');
            res.redirect('/');
            // renderIndex(res, {status: 'Green turned on! :D'});
        } else if (req.query.color === 'greenoff') {
            console.log('off');
            lux.greenOn(0);
            req.flash('message', 'Green turned off! D:');
            res.redirect('/');
            // renderIndex(res, {status: 'Green turned off! D:'});
        } else if (req.query.color === 'transition') {
            console.log('transition');
            lux.transition(10);
            req.flash('message', 'Transition.');
            res.redirect('/');
        } else if (req.query.color === 'off') {
            console.log('turn all off');
            lux.turnOff();
            req.flash('message', 'Darkness.');
            res.redirect('/');
        }
    });

io.on('connection', function(socket) {
    socket.on('color', function(data) {
        console.log(data);
        lux.mapColor(data.color);
    });
});

server.listen(3000);
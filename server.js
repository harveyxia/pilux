'use strict';

// var lux = require('./lux.js');

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
            // lux.greenOn();
            req.flash('message', 'Green turned on! :D');
            res.redirect('/');
            // renderIndex(res, {status: 'Green turned on! :D'});
        } else if (req.query.color === 'greenoff') {
            console.log('off');
            // lux.greenOff();
            req.flash('message', 'Green turned off! D:');
            res.redirect('/');
            // renderIndex(res, {status: 'Green turned off! D:'});
        } else if (req.body) {
            console.log(body);
        }
    });

io.on('connection', function(socket) {
    socket.on('color', function(data) {
        console.log(data);
    });
});

server.listen(3000);
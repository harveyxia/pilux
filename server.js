'use strict';

var express = require('express');
var lux = require('./lux.js');

var app = express();

app.engine('html', require('jade').renderFile);

function renderIndex(res, locals) {
    res.render('index.jade', locals, function(err, html) {
        if (err) {
            console.log(err);
        } else {
            res.send(html);
        }
    });
}

app.route('/')
    .get(function(req, res) {
        renderIndex(res, {});
    })
    .post(function(req, res) {
        console.log(req.query);
        if (req.query.color === 'greenon') {
            console.log('on');
            lux.greenOn();
            renderIndex(res, {status: 'Green turned on! :D'});
            // res.send('Green turned on!');
        } else if (req.query.color === 'greenoff') {
            console.log('off');
            lux.greenOff();
            renderIndex(res, {status: 'Green turned off! D:'});
        }
    });

app.listen(3000);
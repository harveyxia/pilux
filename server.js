'use strict';

var express = require('express');

var app = express();

app.engine('html', require('jade').renderFile);

app.route('/')
    .get(function(req, res) {
        res.render('index.jade', {}, function(err, html) {
            console.log(err);
            res.send(html);
        });
    });

app.listen(3000);
var gpio = require('pi-gpio');
var express = require('express');

var app = express();

app.engine('html', require('jade').renderFile);

app.route('/')
    .get(function(req, res) {
        res.render('views/index.html', function(err, html) {

        });
    });

app.listen(8000);
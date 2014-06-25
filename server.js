var gpio = require('pi-gpio');
var express = require('express');

var app = express();

app.engine('html', require('jade').renderFile);

app.route('/')
    .get(function(req, res) {
        // res.send('poop');
        res.render('index.jade', function(err, html) {
            console.log(err);
            res.send(html);
        });
    });

app.listen(3000);
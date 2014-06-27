var gpio = require('pi-gpio');

function emit(rgb) {

}

function mapHex(hex) {

}

module.exports = {
    greenOn: function() {
        gpio.open(12, 'output', function(err){
            if (err) {
                console.log(err);
            } else {
                gpio.write(12, 1, function() {
                    gpio.close(12);
                });
            }
        })
    },
    greenOff: function() {
        gpio.open(12, 'output', function(err){
            if (err) {
                console.log(err);
            } else {
                gpio.write(12, 0, function() {
                    gpio.close(12);
                });
            }
        })
    }
};
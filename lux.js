// var gpio = require('pi-gpio');
var piblaster = require('pi-blaster.js');

// GPIO numbers for RGB wiring
var RED = 18,
    GREEN = 23,
    BLUE = 24;

// 0 <= pwm <= 1
function redOn(pwm) {
    piblaster.setPwm(RED, pwm/100);
    // piblaster.releasePin(RED);
}

function greenOn(pwm) {
    piblaster.setPwm(GREEN, pwm/100);
    // piblaster.releasePin(GREEN);
}

function blueOn(pwm) {
    piblaster.setPwm(BLUE, pwm/100);
    // piblaster.releasePin(BLUE);
}

function light(r,g,b) {
    redOn(r);
    greenOn(g);
    blueOn(b);
}

function transition(i, j, k) {
    console.log([i, j, k].join(','));
    if (k !== 100) {
        setTimeout(function() {
            light(i,j,k);
            transition(i,j,k+1);
        }, 1);
    } else {
        setTimeout(function() {
            light(i,j,k);
            transition(i,j+1,0);
        }, 1);
    }
    // if (i != 100) {
    //     setTimeout(function() {
    //         greenOn(i/100);
    //         blueOn(j/100);
    //         transition(i+1, 100-(i+1), 1);
    //     }, 50);
    // }
}
transition(1, 1, 1);

// rgb is hexademical representation
function emit(rgb) {

}


module.exports = {

}

// module.exports = {
//     greenOn: function() {
        // gpio.open(12, 'output', function(err){
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         gpio.write(12, 1, function() {
        //             gpio.close(12);
        //         });
        //     }
        // });
//     },
//     greenOff: function() {
        // gpio.open(12, 'output', function(err){
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         gpio.write(12, 0, function() {
        //             gpio.close(12);
        //         });
        //     }
        // });
//     }
// };
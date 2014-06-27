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

var ledHandle = {
    'r': redOn,
    'g': greenOn,
    'b': blueOn
}

function light(r,g,b) {
    ledHandle.r(r);
    ledHandle.g(g);
    ledHandle.b(b);
}

// fades one color up or down, starting from state and ending at 0 | 100
function fade(color, state, up, delay, next) {
    console.log('Color=  ' + color + '\n' +
                'State=  ' + state + '\n' +
                'Up=   ' + up  + '\n' +
                'Delay=  ' + delay + '\n'
                );
    if (up) {
        setTimeout(function() {
            ledHandle[color](state + 1);
            if (state !== 100) {
                fade(color, state + 1, 1, delay);
            } else {
                if (next) {
                    console.log('==========NEXT==========');
                    fade(next.color, next.state, next.up, next.delay, next.next);
                }
            }
        }, delay);
    } else {
        setTimeout(function() {
            ledHandle[color](state - 1);
            if (state !== 0) {
                fade(color, state - 1, 0, delay);
            } else {
                if (next) {
                    console.log('==========NEXT==========');
                    fade(next.color, next.state, next.up, next.delay, next.next);
                }
            }
        }, delay);
    }
}

// function transitionHelper(r, g, b, down, up) {
//     var delay = 50;
//     console.log([r, g, b].join(','));
//     var red = fade('r', r, 0, delay);
    // if (r != 100) {
    //     setTimeout(function() {
    //         light(r,g,b);
    //         transitionHelper(r+1, Math.min(g - 1. 0), b);
    //     }, 50);
    // }
// }
// transition(1, 1, 1);
 
function transition(delay) {
    var phase1 = { color: 'g', state: 0, up: 1, delay: delay, next: phase2};
    var phase2 = { color: 'r', state: 100, up: 0, delay: delay, next: phase3};
    var phase3 = { color: 'b', state: 0, up: 1, delay: delay, next: phase4};
    var phase4 = { color: 'g', state: 100, up: 0, delay: delay, next: phase5};
    var phase5 = { color: 'r', state: 0, up: 1, delay: delay, next: phase6};
    var phase6 = { color: 'g', state: 0, up: 1, delay: delay, next: null};
    fade('r', 0, 1, delay, phase1);
}

module.exports = {

}
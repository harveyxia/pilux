'use strict';

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

function turnOff() {
    redOn(0);
    blueOn(0);
    greenOn(0);
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
    // console.log('Color = ' + color + '\n' +
    //             'State = ' + state + '\n' +
    //             'Up    =  ' + up  + '\n' +
    //             'Delay = ' + delay + '\n'
    //             );
    if (up) {
        setTimeout(function() {
            if (state !== 100) {
                ledHandle[color](state + 1);
                fade(color, state + 1, 1, delay, next);
            } else {
                if (next) {
                    fade(next.color, next.state, next.up, next.delay, next.next);
                }
            }
        }, delay);
    } else {
        setTimeout(function() {
            if (state !== 0) {
                ledHandle[color](state - 1);
                fade(color, state - 1, 0, delay, next);
            } else {
                if (next) {
                    fade(next.color, next.state, next.up, next.delay, next.next);
                }
            }
        }, delay);
    }
}
 
function transition(delay) {
    var phase6 = { color: 'g', state: 0, up: 1, delay: delay, next: null};
    var phase5 = { color: 'r', state: 0, up: 1, delay: delay, next: phase6};
    var phase4 = { color: 'g', state: 100, up: 0, delay: delay, next: phase5};
    var phase3 = { color: 'b', state: 0, up: 1, delay: delay, next: phase4};
    var phase2 = { color: 'r', state: 100, up: 0, delay: delay, next: phase3};
    var phase1 = { color: 'g', state: 0, up: 1, delay: delay, next: phase2};
    fade('r', 0, 1, delay, phase1);
}

function mapColor(i) {
    if ( i <= 100 ) {
        light(100, i, 0);
    } else if ( i <= 200 ) {
        light(200 - i, 100, 0);
    } else if ( i <= 300 ) {
        light(0, 100, i - 200);
    } else {
        light(0, 400 - i, 100);
    }
}

module.exports = {
    greenOn: greenOn,
    mapColor: mapColor,
    turnOff: turnOff,
    transition: transition
}
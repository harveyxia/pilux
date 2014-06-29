'use strict';

var piblaster = require('pi-blaster.js');

// GPIO numbers for RGB wiring
var RED = 18,
    GREEN = 23,
    BLUE = 24;

// 0 <= pwm <= 100
function setRed(pwm) {
    piblaster.setPwm(RED, pwm/100);
    // piblaster.releasePin(RED);
}

function setGreen(pwm) {
    piblaster.setPwm(GREEN, pwm/100);
    // piblaster.releasePin(GREEN);
}

function setBlue(pwm) {
    piblaster.setPwm(BLUE, pwm/100);
    // piblaster.releasePin(BLUE);
}

function turnOff() {
    setRed(0);
    setBlue(0);
    setGreen(0);
}

function setColor(color, pwm) {
    switch(color) {
        case 'r':
            setRed(pwm);
            break;
        case 'g':
            setGreen(pwm);
            break;
        case 'b':
            setBlue(pwm);
            break;
    }
}

function light(r,g,b) {
    setColor('r', r);
    setColor('g', g);
    setColor('b', b);
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
                setColor(color, state + 1);
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
                setColor(color, state - 1);
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
    light: light,
    setGreen: setGreen,
    mapColor: mapColor,
    turnOff: turnOff,
    transition: transition,
    setColor: setColor
}
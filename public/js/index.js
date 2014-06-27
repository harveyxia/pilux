'use strict';

$(document).ready(function() {
    // live updating upon slide
    $('#slider')[0].oninput = function() {
        var val = $(this).val();
        // console.log($(this).val());
    }
});
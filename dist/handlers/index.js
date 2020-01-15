'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var menu = document.getElementById('tog-menu');
var btns = document.getElementsByClassName('central-btn');

menu.addEventListener('click', function (e) {
    [].concat(_toConsumableArray(btns)).forEach(function (btn) {

        if (btn.classList.contains('open')) {
            btn.classList.remove('open');
        } else {
            btn.classList.add('open');
        }
    });
});
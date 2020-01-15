'use strict';

window.addEventListener('load', function () {

    var rap = document.querySelector('.rap');
    fetch('/order').then(function (res) {
        return res.json();
    }).then(function (result) {
        document;
    });
});
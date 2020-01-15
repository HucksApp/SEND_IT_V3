'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var formOne = document.querySelector('.loc');
var formTwo = document.querySelector('.sta');
var btnOne = document.querySelector('.update-location');
var btnTwo = document.querySelector('.status');
var sub_destn = document.querySelector('.sub_destn');
var sub_status = document.querySelector('.sub_status');
var logout = document.getElementById('logout');

btnOne.addEventListener('click', function (e) {
    console.log('here');
    if (formOne.classList.contains('show')) {
        formOne.classList.remove('show');
    } else {
        formOne.classList.add('show');
    }
});

btnTwo.addEventListener('click', function (e) {
    if (formTwo.classList.contains('show')) {
        formTwo.classList.remove('show');
    } else {
        formTwo.classList.add('show');
    }
});

sub_destn.addEventListener('click', function (e) {

    e.preventDefault();

    var userUpdateId = void 0;
    var toUpdateLotn = void 0;
    var toUpdateId = void 0;
    if (formOne.user_id.value == "") {
        window.alert("USER's ID FIELD IS EMPTY!");
    } else {
        userUpdateId = formOne.user_id.value;
    };
    if (formOne.location.value == "") {
        window.alert("ORDER's LOCATION FIELD, TO BE UPDATED IS EMPTY!");
    } else {
        toUpdateLotn = formOne.location.value;
    };
    if (formOne.id.value == "") {
        window.alert("ORDER's ID FIELD IS EMPTY");
    } else {
        toUpdateId = formOne.id.value;
    };

    var data = {
        userUpdateId: userUpdateId,
        toUpdateLotn: toUpdateLotn,
        toUpdateId: toUpdateId
    };

    fetch('/update_location', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        console.log(response);
    });
    console.log(data);

    var all_change = document.querySelectorAll('p.curent-location');
    [].concat(_toConsumableArray(all_change)).forEach(function (change) {
        if (change.classList.contains(userUpdateId) && change.classList.contains(toUpdateId)) {
            change.textContent = toUpdateLotn;
            formOne.user_id.value = "";
            formOne.location.value = "";
            formOne.id.value = "";
        }
    });
});

sub_status.addEventListener('click', function (e) {
    e.preventDefault();

    var userUpdateId = void 0;
    var toUpdateStatus = void 0;
    var toUpdateId = void 0;
    if (formTwo.user_id.value == "") {
        window.alert("USER's ID FIELD IS EMPTY!");
    } else {
        userUpdateId = formTwo.user_id.value;
    };
    if (formTwo.id.value == "") {
        window.alert("ORDER's ID FIELD IS EMPTY");
    } else {
        toUpdateId = formTwo.id.value;
    };
    toUpdateStatus = formTwo.status.value;

    var data = {
        userUpdateId: userUpdateId,
        toUpdateStatus: toUpdateStatus,
        toUpdateId: toUpdateId
    };

    fetch('/update_status', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        console.log(response);
    });
    console.log(data);

    var alls_change = document.querySelectorAll('p.delivery-status');
    [].concat(_toConsumableArray(alls_change)).forEach(function (change) {
        if (change.classList.contains(userUpdateId) && change.classList.contains(toUpdateId)) {
            change.textContent = toUpdateStatus;
            formTwo.user_id.value = "";
            formTwo.id.value = "";
        }
    });
});

logout.addEventListener('click', function (e) {
    e.preventDefault();
    var chk = window.confirm('ARE YOU SURE ? .YOU WANT TO LOG OUT');
    if (chk == false) {
        return;
    } else if (chk == true) {

        fetch('/logout').then(function (res) {
            return res.json();
        }).then(function (message) {
            console.log(message.message);
            window.location.replace('./index.html');
        });
    }
});
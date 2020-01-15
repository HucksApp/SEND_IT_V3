'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var edits = document.getElementsByClassName('edit-btn');
var inputs = document.getElementsByTagName('input');
var containers = document.querySelectorAll('span.value');
var changes = document.getElementsByClassName('change');
var logout = document.getElementById('logout');

[].concat(_toConsumableArray(edits)).forEach(function (edit) {
    edit.addEventListener('click', function (e) {
        if (e.target.classList.contains('user-name')) {
            togBar('user-name', inputs);
        } else if (e.target.classList.contains('house-address')) {

            togBar('house-address', inputs);
        } else if (e.target.classList.contains('phone-number')) {

            togBar('phone-number', inputs);
        } else if (e.target.classList.contains('password')) {

            togBar('password', inputs);
        } else {
            return;
        }
    });
});

Array.from(changes).forEach(function (change) {
    change.addEventListener('click', function (e) {
        Array.from(inputs).forEach(function (input) {
            if (e.target.classList.contains(input.id) && input.value != "") {

                var data = { newVal: input.value, keyToValue: input.id };
                console.log(data);
                fetch('/update_profile', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json, text/plain, */*"
                    },
                    body: JSON.stringify(data)
                }).then(function (response) {
                    console.log(response);
                    input.value = "";
                    input.classList.remove('show');
                    window.alert(' You Just Updated \n Your ' + input.id);
                });
            } else if (change.classList.contains(input.id) && input.value == "") {
                window.alert('NOT A VALID CHANGE \n INPUT FIELD IS EMPTY');
            }
        });
    });
});

[].concat(_toConsumableArray(inputs)).forEach(function (input) {
    input.addEventListener('input', function (e) {
        var val = e.target.value;
        [].concat(_toConsumableArray(containers)).forEach(function (cont) {
            var upd = cont.classList.value.split(' ')[1].toString();
            if (e.target.id == upd) {
                cont.textContent = val;
            }
        });
    });
});

function togBar(identifier, inputs) {
    var identify = identifier;
    [].concat(_toConsumableArray(inputs)).forEach(function (input) {
        if (input.id == identify && !input.classList.contains('show')) {
            input.classList.add('show');
        } else if (input.id == identify && input.classList.contains('show')) {
            input.classList.remove('show');
        }
    });
}

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
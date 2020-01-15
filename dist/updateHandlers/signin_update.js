'use strict';

var formOldUser = document.querySelector('form.user');
var formAdmin = document.querySelector('form.admin');

formOldUser.addEventListener('submit', function (e) {
    e.preventDefault();

    var uData = {
        email: formOldUser.email.value,
        password: formOldUser.password.value
    };

    fetch('/old_user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(uData)
    }).then(function (res) {
        console.log(res);
        return res.json();
    }).then(function (data) {
        console.log(data);
        if (data.valid == false) {
            window.alert(data.message);
        } else if (data.valid == true) {
            window.location.replace('./account.html');
        }
    });
});

formAdmin.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('fired!!!');
    var data = {
        email: formAdmin.email.value,
        password: formAdmin.password.value
    };

    fetch('/admin', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        if (data.valid == false) {
            window.alert(data.message);
        } else if (data.valid == true) {

            window.location.replace('./admin.html');
        }
    });
});
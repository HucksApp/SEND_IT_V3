'use strict';

window.addEventListener('load', function (e) {

    var username1 = document.getElementById('updu');
    var houseAddress = document.getElementById('upda');
    var phoneNumber = document.getElementById('updpn');
    var id = document.getElementById('updi');
    var password = document.getElementById('updp');
    var username2 = document.getElementById('updun');
    var orderCount = document.getElementById('updo');

    fetch('/account', {
        method: "GET",
        headers: {
            "Accept": "text/plain, application/json, */*",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data[0]);
        var _data$ = data[0],
            email = _data$.email,
            phone_number = _data$.phone_number,
            username = _data$.username,
            user_password = _data$.user_password,
            address = _data$.address,
            order_counts = _data$.order_counts;

        username1.textContent = username;
        houseAddress.textContent = address;
        phoneNumber.textContent = phone_number;
        id.textContent = email;
        password.textContent = user_password;
        username2.textContent = username;
        orderCount.textContent = order_counts;
    }).catch(function (err) {
        return console.log(err);
    });
});
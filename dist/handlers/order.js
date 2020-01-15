'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.addEventListener('load', function () {

    var formOne = document.querySelector('form.create-order');
    var formTwo = document.querySelector('form.edit-destination');
    var btnOne = document.getElementById('btn-1');
    var btnTwo = document.getElementById('btn-2');
    var idCount = document.querySelectorAll('.table-data p.id a.id-ach');
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

    formOne.addEventListener('submit', function (e) {
        e.preventDefault();
        var idCount = document.querySelectorAll('.table-data p.id a.id-ach');
        var id = void 0;
        console.log([].concat(_toConsumableArray(idCount))[idCount.length - 1]);
        if ([].concat(_toConsumableArray(idCount))[idCount.length - 1] != undefined) {
            var idLast = [].concat(_toConsumableArray(idCount))[idCount.length - 1].textContent;
            id = parseInt(idLast) + 1;
        } else {
            id = 1;
        };

        var date = Date.now();
        var dateObj = new Date(date);
        var day = dateObj.getDate();
        var month = dateObj.getMonth();
        var year = dateObj.getFullYear();
        var dateString = year + '-' + month + '-' + day;

        var receiverName = formOne.receiver_name.value;
        var destinationAddress = formOne.destination_address.value;
        var pickupAddress = formOne.pickup_address.value;
        var receiverPhoneNumber = formOne.receiver_phone_number.value;

        var data = {
            receiverName: receiverName,
            destinationAddress: destinationAddress,
            pickupAddress: pickupAddress,
            receiverPhoneNumber: receiverPhoneNumber,
            date: date

        };
        console.log(data);

        fetch('/new_order', {
            method: "POST",
            headers: {
                "Accept": "application/json, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (res) {
            console.log(res);
        });
        formOne.receiver_name.value = "";
        formOne.destination_address.value = "";
        formOne.pickup_address.value = "";
        formOne.receiver_phone_number.value = "";

        createOrder(id, receiverName, destinationAddress, pickupAddress, receiverPhoneNumber, dateString);
    });

    formTwo.addEventListener('submit', function (e) {
        e.preventDefault();
        var upDestnAddress = formTwo.destination_address.value;
        var ordId = formTwo.id.value;
        fetch('/update_destination', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ upDestnAddress: upDestnAddress, ordId: ordId })
        }).then(function (result) {
            console.log(result);

            var idCount = document.querySelectorAll('.table-data p.id a.id-ach');
            [].concat(_toConsumableArray(idCount)).forEach(function (idCt) {
                if (idCt.textContent == ordId) {
                    idCt.parentNode.parentNode.children[2].textContent = upDestnAddress;
                    formTwo.destination_address.value = "";
                    formTwo.id.value = "";
                }
            });
        });
    });

    function createOrder(id, name, destination, pickup, mobile, wrtDate) {
        var div = document.createElement('div');
        div.setAttribute('class', 'table-data');

        var idParagraph = document.createElement('p');
        idParagraph.setAttribute('class', 'id');
        idParagraph.setAttribute('title', 'CLICK TO VIEW ORDER LOCATION IN MAP');
        var idAnchor = document.createElement('a');
        idAnchor.setAttribute('class', 'id-ach');
        idAnchor.setAttribute('href', './map.html');
        idAnchor.addEventListener('click', function (e) {
            e.preventDefault();

            window.location.replace('./map.html?id=' + id);
        });

        idAnchor.textContent = id;
        idParagraph.appendChild(idAnchor);

        div.appendChild(idParagraph);

        var recieverNameParagraph = document.createElement('p');
        recieverNameParagraph.setAttribute('class', 'receiver-name');
        recieverNameParagraph.textContent = name;
        div.appendChild(recieverNameParagraph);

        var destinationParagraph = document.createElement('p');
        destinationParagraph.setAttribute('class', 'destination-address');
        destinationParagraph.textContent = destination;
        div.appendChild(destinationParagraph);

        var pickupParagraph = document.createElement('p');
        pickupParagraph.setAttribute('class', 'pick-up-address');
        pickupParagraph.textContent = pickup;
        div.appendChild(pickupParagraph);

        var receiverPhoneNumberParagraph = document.createElement('p');
        receiverPhoneNumberParagraph.setAttribute('class', 'receiver-phone-number');
        receiverPhoneNumberParagraph.textContent = mobile;
        div.appendChild(receiverPhoneNumberParagraph);

        var dateParagraph = document.createElement('p');
        dateParagraph.setAttribute('class', 'date');
        dateParagraph.textContent = wrtDate;
        div.appendChild(dateParagraph);

        var locationParagraph = document.createElement('p');
        locationParagraph.setAttribute('class', 'current-location');
        locationParagraph.textContent = 'Storage';
        div.appendChild(locationParagraph);

        var statusParagraph = document.createElement('p');
        statusParagraph.setAttribute('class', 'delivery-status');
        statusParagraph.textContent = 'intransit';
        div.appendChild(statusParagraph);

        var deleteParagraph = document.createElement('p');
        deleteParagraph.setAttribute('class', 'delete');
        deleteParagraph.setAttribute('title', 'CLICK TO DELETE ORDER');
        deleteParagraph.classList.add(id.toString());

        deleteParagraph.textContent = "x";
        div.appendChild(deleteParagraph);
        deleteParagraph.addEventListener('click', function (e) {

            var result = window.confirm('ARE YOU SURE ?, YOU WANT TO DELETE ORDER ' + id);
            if (result == true) {
                var del = e.target.classList.value.replace(/delete /g, '');

                fetch('/delete_order/' + del, {
                    method: "DELETE"
                }).then(function (response) {
                    console.log(response);
                });
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            } else {

                return;
            }
        });

        var orderList = document.querySelector('div.rap');
        orderList.appendChild(div);
    }

    fetch('/order').then(function (res) {
        return res.json();
    }).then(function (result) {
        result.forEach(function (order) {
            var order_id = order.order_id,
                receiver_name = order.receiver_name,
                destination_address = order.destination_address,
                pickup_address = order.pickup_address,
                receiver_phone_no = order.receiver_phone_no,
                order_date = order.order_date;

            var ordD = order_date.split('T')[0];
            createOrder(order_id, receiver_name, destination_address, pickup_address, receiver_phone_no, ordD);
        });
    });
});
'use strict';

window.addEventListener('load', function () {

    fetch('/admin_orders').then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data);
        var colors = ['#e0a148', '#e04887', '#4887e0', '#48d3e0', '#48e0a1', '#5548e0', '#32dc96', '#87e048'];
        var rap = document.querySelector('div.rap');
        var i = 0;
        data.forEach(function (order) {
            var colorString = colors[i];

            var div = document.createElement('div');
            div.setAttribute('class', 'table-data');
            div.setAttribute('style', 'background-color:' + colorString);
            i++;
            if (colors.length == i + 1) {
                i = 0;
            };

            var h3 = document.createElement('h3');
            h3.textContent = order.user_email;
            div.appendChild(h3);

            var p1 = document.createElement('p');
            p1.setAttribute('class', 'id');
            p1.textContent = order.order_id;
            div.appendChild(p1);

            var p2 = document.createElement('p');
            p2.setAttribute('class', 'destination-address');
            p2.textContent = order['destination_address'];
            div.appendChild(p2);

            var p3 = document.createElement('p');
            p3.setAttribute('class', 'pick-up-address');
            p3.textContent = order['pickup_address'];
            div.appendChild(p3);

            var p4 = document.createElement('p');
            p4.setAttribute('class', 'curent-location');
            console.log(order.order_id);
            p4.classList.add(order.order_id);
            p4.classList.add(order.user_email);
            p4.textContent = order['c_location'];
            div.appendChild(p4);

            var p5 = document.createElement('p');
            p5.setAttribute('class', 'delivery-status');
            p5.classList.add(order.order_id);
            p5.classList.add(order.user_email);
            p5.textContent = order['status'];
            div.appendChild(p5);

            rap.appendChild(div);
        });

        console.log(data);
    });
});
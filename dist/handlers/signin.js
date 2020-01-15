'use strict';

var admin = document.getElementById('admin');
var adminForm = document.querySelector('form.admin');
var userForm = document.querySelector('form.user');

admin.addEventListener('click', function (e) {

        if (adminForm.classList.contains('display')) {
                adminForm.classList.remove('display');
                userForm.classList.remove('remv');
                console.log('admin here');
        } else {
                var chk = window.confirm('RESTRICTED...... ADMIN ONLY !!!!!!!');
                if (chk == true) {
                        adminForm.classList.add('display');
                        userForm.classList.add('remv');
                        console.log('admin here');
                } else {
                        return;
                }
        }
});
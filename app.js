const express = require('express');
const router = require('./router/router');
const cookieSession = require('cookie-session');
const keys = require('./config/keys/.pk/keys.js');


const app = express();



app.use(express.static('dist'));
app.use(cookieSession({
    name:"userSession",
    maxAge:60*60*1000,
    keys:[keys.cookie.cookieSessionKey]
}));
app.use(router);







app.listen(process.env.PORT || 3000, ()=>{console.log('NOW LISTENING TO HUCKSAPP!!!!!!')})





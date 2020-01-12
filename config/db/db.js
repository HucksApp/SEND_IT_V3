const {Pool} = require('pg'); 

 pool = new Pool({
    user:"Ahrabprince",
    host:"localhost",
    database:"hucks",
    password:"pussypie",
    port:5432
});

  module.exports = pool;
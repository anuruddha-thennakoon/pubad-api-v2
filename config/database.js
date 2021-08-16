const mysql = require('mysql');

// Live
module.exports = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user :  'pubaduser',
    password: 'F69#r%H@3Q',
    database: 'pubad'
})

//Local
// module.exports = mysql.createPool({
//     connectionLimit : 100,
//     host : 'localhost',
//     user :  'root',
//     password: '@#123456',
//     database: 'pubad'
// })
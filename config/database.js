const mysql = require('mysql');

// Dev
// module.exports = mysql.createPool({
//     connectionLimit : 100,
//     host : 'localhost',
//     user :  'bismartuser',
//     password: 'bismart123456',
//     database: 'bismart'
// })

// Live
// module.exports = mysql.createPool({
//     connectionLimit : 100,
//     host : 'localhost',
//     user :  'bismartuser',
//     password: 'F69#r%H@3Q',
//     database: 'bismart'
// })

module.exports = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user :  'root',
    password: '123456',
    database: 'pubad'
})



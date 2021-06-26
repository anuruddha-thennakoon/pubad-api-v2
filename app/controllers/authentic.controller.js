var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var authenticController = {
    adminLogin: adminLogin,
    adminRegister: adminRegister
}


function adminLogin(data) {
    var query = 'SELECT admin_users.*,user_roles.* FROM admin_users INNER JOIN user_roles ON admin_users.user_roles_id = user_roles.id WHERE admin_users.email = ' + db.escape(data.email);

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function adminRegister(data) {
    var query = "INSERT INTO admin_users SET ?";

    return new Promise((resolve, reject) => {
        db.query(query, data, (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(results);
            }
        });
    });
}

module.exports = authenticController;




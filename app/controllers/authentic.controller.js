var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var authenticController = {
    adminLogin: adminLogin,
    adminRegister: adminRegister
}


function adminLogin(data) {
    var query = 'SELECT user_accounts.*,user_roles.* FROM user_accounts INNER JOIN user_roles ON user_accounts.user_roles_id = user_roles.id WHERE user_accounts.user_name = ' + db.escape(data.user_name);

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
    var query = "INSERT INTO user_accounts SET ?";

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




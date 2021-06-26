var authenticController = require("../controllers/authentic.controller");
const jwt = require('jsonwebtoken');

var authenticService = {
    adminLogin: adminLogin,
    adminRegister: adminRegister
}

function adminLogin(loginData) {
    return new Promise((resolve, reject) => {
        authenticController.adminLogin(loginData).then((data) => {
            console.log('dataaa ',data);
            if (loginData.password == data[0].password) {
                var jwtData = { "user_id": data[0].id, "fname": data[0].fname, "lname": data[0].lname, "email": data[0].email, "role_id": data[0].user_roles_id }
                token = jwt.sign(jwtData, 'my_secret_key', { expiresIn: 60 * 60 * 24 });

                resolve({
                    "success": true,
                    "session_token": token,
                    "user": { "user_id": data[0].id, "fname": data[0].fname, "lname": data[0].lname, "email": data[0].email, "role_id": data[0].user_roles_id ,"role":data[0].role}
                });
            } else {
                reject({ "success": false, "message": "username or password incorrect" });
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

function adminRegister(data) {
    return new Promise((resolve, reject) => {
        authenticController.adminRegister(data).then((data) => {
            resolve({ "sucess": true, "message": "company created sucessfully", "user_id": data['insertId'] });
        }).catch((err) => {
            reject(err);
        })
    })
}


module.exports = authenticService;


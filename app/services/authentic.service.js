var authenticController = require("../controllers/authentic.controller");
const jwt = require('jsonwebtoken');

var authenticService = {
    adminLogin: adminLogin,
    adminRegister: adminRegister
}

function adminLogin(loginData) {
    return new Promise((resolve, reject) => {
        authenticController.adminLogin(loginData).then((data) => {

            if (data[0].status == 1) {
                if (loginData.password == data[0].password) {
                    var jwtData = { "user_id": data[0].id, "email": data[0].email, "nic": data[0].nic, "user_category": data[0].user_category, "role_id": data[0].user_roles_id }
                    token = jwt.sign(jwtData, 'my_secret_key', { expiresIn: 60 * 60 * 24 });

                    resolve({
                        "success": true,
                        "session_token": token,
                        "user": {
                            "user_id": data[0].id,
                            "full_name": data[0].full_name,
                            "nic": data[0].nic,
                            "email": data[0].email,
                            "mobile": data[0].mobile,
                            "institutes_id": data[0].institutes_id,
                            "designation": data[0].designation,
                            "user_category": data[0].user_category,
                            "role_id": data[0].user_roles_id,
                            "role": data[0].role
                        }
                    });
                } else {
                    resolve({ "success": false, "message": "username or password incorrect" });
                }

            } else {
                resolve({ "success": false, "message": "Your account not activated. Please contact Ministry of Public Administration" });
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


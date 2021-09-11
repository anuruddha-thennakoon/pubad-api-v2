var actionsController = require("../controllers/actions.controller");
var constants = require('../../config/constants');

var actionsService = {
    addOfficer: addOfficer,
    getAllOfficers: getAllOfficers,
    addInstitute: addInstitute,
    getAllInstitutes: getAllInstitutes,
    getInstitutes: getInstitutes,
    getInstituteTypes: getInstituteTypes,
    getMinistries: getMinistries,
    searchOfficer: searchOfficer,
    attachOfficer: attachOfficer,
    getGrades: getGrades,
    addCadrePosition: addCadrePosition,
    getDesignations: getDesignations,
    searchOfficerById: searchOfficerById,
    searchDesigByInstitute: searchDesigByInstitute,
    addDesignation: addDesignation,
    editDesignation: editDesignation,
    getDesignationVacancies: getDesignationVacancies,
    getCadrePositions: getCadrePositions,
    getGradeVacancies: getGradeVacancies,
    getGradeVacanciesCount: getGradeVacanciesCount,
    retireOfficer: retireOfficer,
    gradeVacanyDetails: gradeVacanyDetails,
    addApplication: addApplication,
    getApplicationsCount: getApplicationsCount,
    updateApplication: updateApplication,
    viewOfficerById: viewOfficerById,
    updateOfficer: updateOfficer,
    getAllOfficersReport: getAllOfficersReport,
    getCurrentAllOfficers: getCurrentAllOfficers,
    createUserAccount: createUserAccount,
    getApplications: getApplications,
    approveApplication: approveApplication,
    getAllUsers: getAllUsers,
    approveUser: approveUser,
    getCadres: getCadres
}

function addOfficer(inData) {
    return new Promise((resolve, reject) => {

        var officerData = {
            name: inData.name,
            nic: inData.nic,
            gender: inData.gender,
            address: inData.address,
            dob: inData.dob,
            mobile: inData.mobile,
            email: inData.email,
            appointment_date: inData.appointment_date,
            service_confirmed: inData.service_confirmed,
            grade_iii_entry: inData.grade_iii_entry,
            grade_ii_promoted: inData.grade_ii_promoted,
            grade_i_promoted: inData.grade_i_promoted,
            special_grade_promoted: inData.special_grade_promoted,
            al_stream: inData.al_stream,
            basic_degree: inData.basic_degree,
            master_degree: inData.master_degree
        }

        actionsController.addOfficer(officerData).then((data1) => {

            if (inData.service_history.length != 0) {
                let promises = [];

                for (let index = 0; index < inData.service_history.length; index++) {
                    var temp = {
                        officers_id: data1['insertId'],
                        institutes_id: inData.service_history[index].institute,
                        start_date: inData.service_history[index].start_date,
                        end_date: inData.service_history[index].end_date,
                        cadre_positions_id: inData.service_history[index].cadre_positions_id,
                        status: inData.service_history[index].status
                    }

                    promises[index] = actionsController.addServiceHistory(temp)
                }

                Promise.all(promises).then(data2 => {
                    if (data2.length == 0) {
                        resolve({ "success": false, "message": "Something went wrong" });
                    } else {
                        resolve({ "success": true, "message": "Officer added successfully" });
                    }
                }).catch(err => {
                    reject(err);
                })

            } else {
                if (data1.length == 0) {
                    resolve({ "success": false, "message": "Something went wrong" });
                } else {
                    resolve({ "success": true, "message": "Officer added successfully" });
                }
            }

        }).catch((err) => {
            reject(err);
        })

    })
}

function getAllOfficers() {
    return new Promise((resolve, reject) => {

        actionsController.getAllOfficers().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function addInstitute(inData) {
    return new Promise((resolve, reject) => {

        actionsController.addInstitute(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Institute added successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function getAllInstitutes() {
    return new Promise((resolve, reject) => {

        actionsController.getAllInstitutes().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function getInstitutes() {
    return new Promise((resolve, reject) => {

        actionsController.getInstitutes().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function getInstituteTypes() {
    return new Promise((resolve, reject) => {

        actionsController.getInstituteTypes().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function getMinistries() {
    return new Promise((resolve, reject) => {

        actionsController.getMinistries().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function searchOfficer(inData) {
    return new Promise((resolve, reject) => {

        actionsController.searchOfficer(inData).then((data1) => {
            if (data1.length != 0) {
                actionsController.getServiceHistory(data1[0].id).then((data2) => {
                    var temp = {
                        id: data1[0].id,
                        name: data1[0].name,
                        nic: data1[0].nic,
                        profile: data1[0],
                        service_history: data2
                    }
                    resolve({ "success": true, "message": "Get data successfully", "data": temp });
                }).catch((err) => {
                    reject(err);
                })
            } else {
                resolve({ "success": true, "message": "Get data successfully", "data": null });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function attachOfficer(inData) {
    return new Promise((resolve, reject) => {

        if (inData.nature_of_attachment == 'SLAS - PSC Acting') {

            var data = {
                officers_id: inData.officers_id,
                institutes_id: inData.institutes_id,
                start_date: inData.start_date,
                end_date: null,
                cadre_positions_id: inData.cadre_positions_id,
                nature_of_attachment: inData.nature_of_attachment,
                status: 3,
                current_status: 1
            }

            actionsController.addServiceHistory(data).then((data2) => {
                if (data2.length == 0) {
                    resolve({ "success": false, "message": "Something went wrong" });
                } else {
                    resolve({ "success": true, "message": "Officer attached successfully" });
                }
            }).catch((err) => {
                reject(err);
            })

        } else {
            var temp = {
                officers_id: inData.officers_id,
                institutes_id: inData.institutes_id,
                start_date: inData.start_date,
                end_date: null,
                cadre_positions_id: inData.cadre_positions_id,
                nature_of_attachment: inData.nature_of_attachment,
                status: 1,
                current_status: 1
            }

            actionsController.checkEligibleForAttach(temp).then((data0) => {

                if ((data0[0].no_of_cadre - data0[0].occupied) > 0) {
                    actionsController.updateServiceHistory(temp).then((data1) => {
                        actionsController.addServiceHistory(temp).then((data2) => {
                            if (data2.length == 0) {
                                resolve({ "success": false, "message": "Something went wrong" });
                            } else {
                                resolve({ "success": true, "message": "Officer attached successfully" });
                            }
                        }).catch((err) => {
                            reject(err);
                        })
                    }).catch((err) => {
                        reject(err);
                    })
                } else {
                    resolve({ "success": false, "message": "No vacancies for the position" });
                }

            }).catch((err) => {
                reject(err);
            })
        }

    })
}

function getGrades() {
    return new Promise((resolve, reject) => {

        actionsController.getGrades().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function addCadrePosition(inData) {
    return new Promise((resolve, reject) => {

        actionsController.addCadrePosition(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Cadre position added successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function getDesignations() {
    return new Promise((resolve, reject) => {

        actionsController.getDesignations().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function searchOfficerById(inData) {
    return new Promise((resolve, reject) => {

        actionsController.searchOfficerById(inData).then((data1) => {

            actionsController.getServiceHistory(data1[0].id).then((data2) => {
                var temp = {
                    id: data1[0].id,
                    name: data1[0].name,
                    nic: data1[0].nic,
                    service_history: data2
                }
                resolve({ "success": true, "message": "Get data successfully", "data": temp });
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        })

    })
}

function searchDesigByInstitute(data) {
    return new Promise((resolve, reject) => {

        actionsController.searchDesigByInstitute(data).then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function addDesignation(inData) {
    return new Promise((resolve, reject) => {

        actionsController.addDesignation(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Designation added successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function editDesignation(inData) {
    return new Promise((resolve, reject) => {

        actionsController.editDesignation(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Designation updated successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function getDesignationVacancies(data) {
    return new Promise((resolve, reject) => {

        actionsController.getDesignationVacancies(data).then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function getCadrePositions() {
    return new Promise((resolve, reject) => {

        actionsController.getCadrePositions().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function getGradeVacancies() {
    return new Promise((resolve, reject) => {

        actionsController.getGradeVacancies().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function getGradeVacanciesCount() {
    return new Promise((resolve, reject) => {

        actionsController.getGradeVacanciesCount().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function retireOfficer(inData) {
    return new Promise((resolve, reject) => {

        var temp = {
            officers_id: inData.officers_id,
            retired_date: inData.retired_date
        }

        actionsController.updateServiceHistory(temp).then((data1) => {
            actionsController.retireOfficer(temp).then((data2) => {
                if (data2.length == 0) {
                    resolve({ "success": false, "message": "Something went wrong" });
                } else {
                    resolve({ "success": true, "message": "Officer retire successfully" });
                }
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        })

    })
}

function gradeVacanyDetails(data) {
    return new Promise((resolve, reject) => {

        actionsController.gradeVacanyDetails(data).then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function addApplication(inData) {
    return new Promise((resolve, reject) => {

        actionsController.addApplication(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Application added successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function getApplicationsCount(data) {
    return new Promise((resolve, reject) => {
        let promises = [];

        switch (data.user_role) {
            case '1':
                //admin
                break;

            case '2':
                //pubad_user
                switch (data.application_type) {
                    case 1:
                        //Acting Appointment
                        break;

                    case 2:
                        //Class II Promotion
                        // promises[0] = actionsController.getApplicationsCount('Pending', 100, data);
                        // promises[1] = actionsController.getApplicationsCount('Approved', 400, data);
                        // promises[2] = actionsController.getApplicationsCount('Returned', 101, data);

                        break;

                    case 3:
                        //Confirmation
                        promises[0] = actionsController.getApplicationsCount('Pending', 100, data);
                        promises[1] = actionsController.getApplicationsCount('Recommended to PSC', 200, data);
                        promises[2] = actionsController.getApplicationsCount('Submitted to Commission', 300, data);
                        promises[3] = actionsController.getApplicationsCount('Order Convey by PSC', 400, data);
                        promises[4] = actionsController.getApplicationsCount('Returned by PSC', 201, data);
                        promises[5] = actionsController.getApplicationsCount('Returned to Institute', 101, data);

                        break;

                    case 4:
                        //Re-employment
                        break;

                    case 5:
                        //Releases
                        break;

                    case 6:
                        //Retirement
                        break;

                    case 7:
                        //Transfer
                        promises[0] = actionsController.getApplicationsCount('Pending', 100, data);
                        promises[1] = actionsController.getApplicationsCount('Approved', 400, data);
                        promises[2] = actionsController.getApplicationsCount('Returned', 101, data);

                        break;

                    case 8:
                        //Appointment
                        promises[0] = actionsController.getApplicationsCount('Pending', 100, data);
                        promises[1] = actionsController.getApplicationsCount('Approved', 400, data);
                        promises[2] = actionsController.getApplicationsCount('Returned', 101, data);

                        break;
                }
                break;

            case '3':
                //psc_user
                switch (data.application_type) {
                    case 1:
                        //Acting Appointment
                        break;

                    case 2:
                        //Class II Promotion
                        break;

                    case 3:
                        //Confirmation
                        promises[0] = actionsController.getApplicationsCount('Pending', 200, data);
                        promises[1] = actionsController.getApplicationsCount('Returned to PUBAD', 201, data);
                        promises[2] = actionsController.getApplicationsCount('Submitted to Commission', 300, data);
                        promises[3] = actionsController.getApplicationsCount('Order Convey by PSC', 400, data);

                        break;

                    case 4:
                        //Re-employment
                        break;

                    case 5:
                        //Releases
                        break;

                    case 6:
                        //Retirement
                        break;

                    case 7:
                        //Transfer
                        break;

                    case 8:
                        //Appointment
                        break;
                }
                break;

            case '4':
                //institute_user
                switch (data.application_type) {
                    case 1:
                        //Acting Appointment
                        break;

                    case 2:
                        //Class II Promotion
                        promises[0] = actionsController.getApplicationsCount('Submitted to PUBAD', 100, data);
                        promises[1] = actionsController.getApplicationsCount('Returned by PUBAD', 101, data);
                        promises[2] = actionsController.getApplicationsCount('Approved', 400, data);

                        break;

                    case 3:
                        //Confirmation
                        promises[0] = actionsController.getApplicationsCount('Submitted to PUBAD', 100, data);
                        promises[1] = actionsController.getApplicationsCount('Returned by PUBAD', 101, data);
                        promises[2] = actionsController.getApplicationsCount('Recommended to PSC', 200, data);
                        promises[3] = actionsController.getApplicationsCount('Submitted to Commission', 300, data);
                        promises[4] = actionsController.getApplicationsCount('Order Convey by PSC', 400, data);

                        break;

                    case 4:
                        //Re-employment
                        break;

                    case 5:
                        //Releases
                        break;

                    case 6:
                        //Retirement
                        break;

                    case 7:
                        //Transfer
                        promises[0] = actionsController.getApplicationsCount('Submitted to PUBAD', 100, data);
                        promises[1] = actionsController.getApplicationsCount('Returned by PUBAD', 101, data);
                        promises[2] = actionsController.getApplicationsCount('Approved', 400, data);

                        break;

                    case 8:
                        //Appointment
                        promises[0] = actionsController.getApplicationsCount('Submitted to PUBAD', 100, data);
                        promises[1] = actionsController.getApplicationsCount('Returned by PUBAD', 101, data);
                        promises[2] = actionsController.getApplicationsCount('Approved', 400, data);

                        break;
                }
                break;

            case '5':
                //slas_officer
                break;
        }

        Promise.all(promises).then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    });
}

function getApplications(data) {
    return new Promise((resolve, reject) => {

        actionsController.getApplications(data).then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    });
}

function approveApplication(data) {
    return new Promise((resolve, reject) => {

        switch (data.application_type) {
            case 1:
                //Acting Appointment
                break;

            case 2:
                //Class II Promotion
                if (data.approved === 1) {
                    data.status = 400;
                } else {
                    data.status = 101;
                }
                break;

            case 3:
                //Confirmation
                if (data.approved === 1) {
                    if (data.status % 2 == 0) {
                        data.status = data.status + 100;
                    } else {
                        data.status = data.status + 100 - 1;
                    }
                } else {
                    if (data.status % 2 == 0) {
                        data.status = data.status + 1;
                    } else {
                        data.status = data.status - 100;
                    }
                }
                break;

            case 4:
                //Re-employment
                break;

            case 5:
                //Releases
                break;

            case 6:
                //Retirement
                break;

            case 7:
                //Transfer
                if (data.approved === 1) {
                    data.status = 400;
                } else {
                    data.status = 101;
                }
                break;

            case 8:
                //Appointment
                if (data.approved === 1) {
                    data.status = 400;
                } else {
                    data.status = 101;
                }
                break;
        }

        actionsController.approveApplication(data).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Application approved successfully" });
            }
        }).catch((err) => {
            reject(err);
        });

    });
}

function updateApplication(inData) {
    return new Promise((resolve, reject) => {

        actionsController.updateApplication(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Application updated successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function viewOfficerById(data) {
    return new Promise((resolve, reject) => {

        actionsController.viewOfficerById(data).then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function updateOfficer(inData) {
    return new Promise((resolve, reject) => {

        actionsController.updateOfficer(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Officer updated successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function getAllOfficersReport() {
    return new Promise((resolve, reject) => {

        actionsController.getAllOfficersReport().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function getCurrentAllOfficers() {
    return new Promise((resolve, reject) => {

        actionsController.getCurrentAllOfficers().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function createUserAccount(inData) {
    return new Promise((resolve, reject) => {

        actionsController.createUserAccount(inData).then((data) => {
            if (data.length == 0) {
                resolve({ "success": false, "message": "Something went wrong" });
            } else {
                resolve({ "success": true, "message": "Designation added successfully" });
            }
        }).catch((err) => {
            reject(err);
        })

    })
}

function getAllUsers() {
    return new Promise((resolve, reject) => {

        actionsController.getAllUsers().then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

function approveUser(data) {
    return new Promise((resolve, reject) => {

        actionsController.approveUser(data).then((data) => {
            resolve({ "success": true, "message": "Get data successfully" });
        }).catch((err) => {
            reject(err);
        })

    });
}

function getCadres(data) {
    return new Promise((resolve, reject) => {

        actionsController.getCadres(data).then((data) => {
            resolve({ "success": true, "message": "Get data successfully", "data": data });
        }).catch((err) => {
            reject(err);
        })

    })
}

module.exports = actionsService;


var db = require('../../config/database');
var dbFunc = require('../../config/db-function');

var actionsController = {
    addOfficer: addOfficer,
    getAllOfficers: getAllOfficers,
    addInstitute: addInstitute,
    getAllInstitutes: getAllInstitutes,
    addServiceHistory: addServiceHistory,
    getInstituteTypes: getInstituteTypes,
    getMinistries: getMinistries,
    searchOfficer: searchOfficer,
    getServiceHistory: getServiceHistory,
    updateServiceHistory: updateServiceHistory,
    getGrades: getGrades,
    addCadrePosition: addCadrePosition,
    getDesignations: getDesignations,
    getInstitutes: getInstitutes,
    searchOfficerById: searchOfficerById,
    searchDesigByInstitute: searchDesigByInstitute,
    addDesignation: addDesignation,
    editDesignation: editDesignation,
    getDesignationVacancies: getDesignationVacancies,
    getCadrePositions: getCadrePositions,
    checkEligibleForAttach: checkEligibleForAttach,
    getGradeVacancies: getGradeVacancies,
    getGradeVacanciesCount: getGradeVacanciesCount,
    retireOfficer: retireOfficer,
    gradeVacanyDetails: gradeVacanyDetails,
    addApplication: addApplication,
    getActinApplications: getActinApplications,
    updateApplication: updateApplication,
    viewOfficerById: viewOfficerById,
    updateOfficer: updateOfficer,
    getAllOfficersReport: getAllOfficersReport,
    getCurrentAllOfficers: getCurrentAllOfficers,
    createUserAccount: createUserAccount
}

function addOfficer(data) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO officers SET ?";

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

function getAllOfficers() {
    var query = 'SELECT * FROM officers LEFT JOIN (SELECT designations.designation,institutes.name AS institute_name,service_history.officers_id,service_history.nature_of_attachment,grades.id AS pgrades_id,grades.grade_name FROM service_history INNER JOIN cadre_positions ON service_history.cadre_positions_id = cadre_positions.id INNER JOIN designations ON designations.id = cadre_positions.designations_id INNER JOIN grades ON grades.id = cadre_positions.grades_id INNER JOIN institutes ON institutes.id = cadre_positions.institutes_id WHERE service_history.status = 1) AS ser_history ON ser_history.officers_id = officers.id';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function getCurrentAllOfficers() {
    var query = 'SELECT * FROM officers LEFT JOIN (SELECT designations.designation,institutes.name AS institute_name,service_history.officers_id,service_history.nature_of_attachment,grades.id AS pgrades_id,grades.grade_name,service_history.current_status AS current_status FROM service_history INNER JOIN cadre_positions ON service_history.cadre_positions_id = cadre_positions.id INNER JOIN designations ON designations.id = cadre_positions.designations_id INNER JOIN grades ON grades.id = cadre_positions.grades_id INNER JOIN institutes ON institutes.id = cadre_positions.institutes_id) AS ser_history ON ser_history.officers_id = officers.id';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function addInstitute(data) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO institutes SET ?";

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

function getAllInstitutes() {
    var query = 'SELECT *,IF(status != 0, "Active", "Inactive") AS status,institutes.id AS id FROM institutes INNER JOIN institute_types ON institutes.institute_types_id = institute_types.id';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function getInstitutes() {
    var query = 'SELECT * FROM institutes';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function addServiceHistory(data) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO service_history SET ?";

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

function getInstituteTypes() {
    var query = 'SELECT * FROM institute_types';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function getMinistries() {
    var query = 'SELECT * FROM ministries';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function searchOfficer(data) {
    return new Promise((resolve, reject) => {

        var query = 'SELECT * FROM officers WHERE nic = ' + db.escape(data.nic);

        db.query(query, (error, results, fields) => {
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

function getServiceHistory(id) {
    return new Promise((resolve, reject) => {

        var query = 'SELECT institutes.name,designations.designation,service_history.start_date,service_history.end_date,IF(service_history.status != 0, "Current", "Past") AS status FROM service_history INNER JOIN cadre_positions ON service_history.cadre_positions_id = cadre_positions.id INNER JOIN designations ON cadre_positions.designations_id = designations.id INNER JOIN institutes ON cadre_positions.institutes_id = institutes.id WHERE service_history.officers_id = ' + db.escape(id);

        db.query(query, (error, results, fields) => {
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

function updateServiceHistory(data) {
    var query = 'UPDATE service_history SET status = 0 , current_status = 0 WHERE officers_id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [data.officers_id], (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getGrades() {
    var query = 'SELECT * FROM grades';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function addCadrePosition(data) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO cadre_positions SET ?";

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

function getDesignations() {
    var query = 'SELECT * FROM designations';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function searchOfficerById(data) {
    return new Promise((resolve, reject) => {

        var query = 'SELECT * FROM officers WHERE id =' + db.escape(data.id);

        db.query(query, (error, results, fields) => {
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

function searchDesigByInstitute(data) {
    return new Promise((resolve, reject) => {

        var query = 'SELECT *,cadre_positions.id AS id FROM cadre_positions INNER JOIN designations ON cadre_positions.designations_id = designations.id AND  cadre_positions.institutes_id = ' + db.escape(data.id);

        db.query(query, (error, results, fields) => {
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

function addDesignation(data) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO designations SET ?";

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

function editDesignation(data) {
    var query = 'UPDATE designations SET designation = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [data.designation, data.id], (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getDesignationVacancies(data) {
    return new Promise((resolve, reject) => {

        if (data.institutes_id == null && data.grades_id == null) {
            var query = 'SELECT *,(SELECT COUNT(id) FROM service_history WHERE service_history.cadre_positions_id = cadre_positions.id AND service_history.status=1) AS occupied FROM cadre_positions INNER JOIN designations ON cadre_positions.designations_id = designations.id INNER JOIN institutes ON institutes.id = cadre_positions.institutes_id';
        } else if (data.institutes_id == null) {
            var query = 'SELECT *,(SELECT COUNT(id) FROM service_history WHERE service_history.cadre_positions_id = cadre_positions.id AND service_history.status=1) AS occupied FROM cadre_positions INNER JOIN designations ON cadre_positions.designations_id = designations.id INNER JOIN institutes ON institutes.id = cadre_positions.institutes_id WHERE grades_id = ' + db.escape(data.grades_id);
        } else if (data.grades_id == null) {
            var query = 'SELECT *,(SELECT COUNT(id) FROM service_history WHERE service_history.cadre_positions_id = cadre_positions.id AND service_history.status=1) AS occupied FROM cadre_positions INNER JOIN designations ON cadre_positions.designations_id = designations.id INNER JOIN institutes ON institutes.id = cadre_positions.institutes_id WHERE institutes_id = ' + db.escape(data.institutes_id);
        } else {
            var query = 'SELECT *,(SELECT COUNT(id) FROM service_history WHERE service_history.cadre_positions_id = cadre_positions.id AND service_history.status=1) AS occupied FROM cadre_positions INNER JOIN designations ON cadre_positions.designations_id = designations.id INNER JOIN institutes ON institutes.id = cadre_positions.institutes_id WHERE institutes_id = ' + db.escape(data.institutes_id) + ' AND grades_id = ' + db.escape(data.grades_id);
        }

        db.query(query, (error, results, fields) => {
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

function getCadrePositions() {
    return new Promise((resolve, reject) => {

        var query = 'SELECT *,cadre_positions.id AS id FROM cadre_positions INNER JOIN designations ON cadre_positions.designations_id = designations.id INNER JOIN institutes ON cadre_positions.institutes_id = institutes.id INNER JOIN grades ON grades.id = cadre_positions.grades_id';

        db.query(query, (error, results, fields) => {
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

function checkEligibleForAttach(data) {
    return new Promise((resolve, reject) => {

        var query = 'SELECT *,(SELECT COUNT(id) FROM service_history WHERE service_history.cadre_positions_id = cadre_positions.id AND service_history.status=1) AS occupied FROM cadre_positions WHERE cadre_positions.id =' + db.escape(data.cadre_positions_id);

        db.query(query, (error, results, fields) => {
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

function getGradeVacancies() {
    return new Promise((resolve, reject) => {

        var query = 'SELECT institutes.id,institutes.name, (SELECT COALESCE(SUM(cadre_positions.no_of_cadre),0) FROM cadre_positions  WHERE cadre_positions.institutes_id = institutes.id AND cadre_positions.grades_id = 1) AS SPECIAL_GRADE_AVAILABLE, (SELECT COUNT(service_history.id) FROM service_history JOIN cadre_positions ON cadre_positions.id = service_history.cadre_positions_id WHERE cadre_positions.grades_id = 1 AND service_history.institutes_id = institutes.id AND service_history.status = 1) AS SPECIAL_GRADE_OCCUPIED, (SELECT COALESCE(SUM(cadre_positions.no_of_cadre),0) FROM cadre_positions  WHERE cadre_positions.institutes_id = institutes.id AND cadre_positions.grades_id = 2) AS GRADE_1_AVAILABLE, (SELECT COUNT(service_history.id) FROM service_history JOIN cadre_positions ON cadre_positions.id = service_history.cadre_positions_id WHERE cadre_positions.grades_id = 2 AND service_history.institutes_id = institutes.id AND service_history.status = 1) AS GRADE_1_OCCUPIED, (SELECT COALESCE(SUM(cadre_positions.no_of_cadre),0) FROM cadre_positions  WHERE cadre_positions.institutes_id = institutes.id AND (cadre_positions.grades_id = 3 OR cadre_positions.grades_id = 4)) AS GRADE_2_3_AVAILABLE, (SELECT COUNT(service_history.id) FROM service_history JOIN cadre_positions ON cadre_positions.id = service_history.cadre_positions_id WHERE cadre_positions.grades_id = 3 OR cadre_positions.grades_id = 4 AND service_history.institutes_id = institutes.id AND service_history.status = 1) AS GRADE_2_3_OCCUPIED FROM institutes';

        db.query(query, (error, results, fields) => {
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

function getGradeVacanciesCount() {
    return new Promise((resolve, reject) => {

        var query = 'SELECT DISTINCT (SELECT COALESCE(SUM(cadre_positions.no_of_cadre),0) FROM cadre_positions WHERE cadre_positions.grades_id = 1) AS SPECIAL_GRADE_AVAILABLE, (SELECT COUNT(service_history.id) FROM service_history JOIN cadre_positions ON service_history.cadre_positions_id = cadre_positions.id WHERE cadre_positions.grades_id = 1 AND service_history.status = 1) AS SPECIAL_GRADE_OCCUPIED, (SELECT COALESCE(SUM(cadre_positions.no_of_cadre),0) FROM cadre_positions WHERE cadre_positions.grades_id = 2) AS GRADE_1_AVAILABLE, (SELECT COUNT(service_history.id) FROM service_history JOIN cadre_positions ON service_history.cadre_positions_id = cadre_positions.id WHERE cadre_positions.grades_id = 2 AND service_history.status = 1) AS GRADE_1_OCCUPIED, (SELECT COALESCE(SUM(cadre_positions.no_of_cadre),0) FROM cadre_positions WHERE cadre_positions.grades_id = 3 OR cadre_positions.grades_id = 4) AS GRADE_11_AVAILABLE, (SELECT COUNT(service_history.id) FROM service_history JOIN cadre_positions ON service_history.cadre_positions_id = cadre_positions.id WHERE cadre_positions.grades_id = 3 OR cadre_positions.grades_id = 4 AND service_history.status = 1) AS GRADE_11_OCCUPIED FROM cadre_positions';

        db.query(query, (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(results[0]);
            }
        });
    });
}

function retireOfficer(data) {
    var query = 'UPDATE officers SET status = 2 ,retired_date = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [data.retired_date, data.officers_id], (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function gradeVacanyDetails(data) {
    return new Promise((resolve, reject) => {

        var query = 'SELECT * FROM pubad.cadre_positions inner join service_history on cadre_positions.id = service_history.cadre_positions_id AND service_history.status = 1 inner join officers on service_history.officers_id = officers.id inner join grades on cadre_positions.grades_id = grades.id inner join designations on cadre_positions.designations_id = designations.id where cadre_positions.institutes_id = ' + db.escape(data.id);

        db.query(query, (error, results, fields) => {
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

function addApplication(data) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO application SET ?"

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

function getActinApplications() {
    return new Promise((resolve, reject) => {

        var query = 'SELECT application.*,officers.name,officers.nic FROM application INNER JOIN officers ON application.officers_id = officers.id';

        db.query(query, (error, results, fields) => {
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

function updateApplication(data) {
    var query = 'UPDATE application SET status = ?,reject_reason = ?,psc_documents=?,pbad_documents=? WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [data.status, data.reject_reason, data.psc_documents, data.pbad_documents, data.id], (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function viewOfficerById(data) {
    return new Promise((resolve, reject) => {

        var query = 'SELECT * FROM officers WHERE id =' + db.escape(data.id);

        db.query(query, (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(results[0]);
            }
        });
    });
}

function updateOfficer(data) {
    var query = 'UPDATE officers SET seniority_no = ?,service_confirmed = ?,gender = ?,address = ?,mobile = ?,email = ?,grade_iii_entry = ?,grade_ii_promoted = ?,grade_i_promoted = ?,special_grade_promoted = ?,dob = ?,grades_id = ?,service_confirmed_status = ?,grade_i_promoted_status = ?,grade_ii_promoted_status = ?,special_grade_promoted_status = ?,slas_batch = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [
            data.seniority_no,
            data.service_confirmed,
            data.gender,
            data.address,
            data.mobile,
            data.email,
            data.grade_iii_entry,
            data.grade_ii_promoted,
            data.grade_i_promoted,
            data.special_grade_promoted,
            data.dob,
            data.grades_id,
            data.service_confirmed_status,
            data.grade_i_promoted_status,
            data.grade_ii_promoted_status,
            data.special_grade_promoted_status,
            data.slas_batch,
            data.id
        ], (error, results, fields) => {
            if (!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getAllOfficersReport() {
    var query = 'SELECT officers.name,designations.designation,institutes.name AS institute_name,cadre_positions.grades_id AS position_grade,officers.grades_id AS officer_grade,service_history.nature_of_attachment FROM officers INNER JOIN service_history ON officers.id = service_history.officers_id INNER JOIN cadre_positions ON service_history.cadre_positions_id = cadre_positions.id INNER JOIN institutes ON institutes.id = cadre_positions.institutes_id INNER JOIN designations ON designations.id = cadre_positions.designations_id WHERE service_history.current_status = 1';

    return new Promise((resolve, reject) => {
        db.query(query, (error, results, fields) => {
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

function createUserAccount(data) {
    return new Promise((resolve, reject) => {

        var query = "INSERT INTO user_accounts SET ?";

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

module.exports = actionsController;
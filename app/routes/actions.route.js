const actionsService = require('../services/actions.service');
var schema = require('../schema/loginValidationSchema.json');
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('../../common/mailer.js');

function init(router) {
    router.route('/send-user-message')
        .post(sendUserMessage)
    router.route('/add-officer')
        .post(addOfficer)
    router.route('/get-officers')
        .get(getAllOfficers)
    router.route('/add-institute')
        .post(addInstitute)
    router.route('/get-institutes')
        .get(getInstitutes)
    router.route('/get-institute-types')
        .get(getInstituteTypes)
    router.route('/get-ministries')
        .get(getMinistries)
    router.route('/search-officer')
        .post(searchOfficer)
    router.route('/attach-officer')
        .post(attachOfficer)
    router.route('/get-grades')
        .get(getGrades)
    router.route('/add-cadre-position')
        .post(addCadrePosition)
    router.route('/get-designations')
        .get(getDesignations)
    router.route('/get-all-institutes')
        .get(getAllInstitutes)
    router.route('/search-officer-by-id')
        .post(searchOfficerById)
    router.route('/search-designation-by-iid')
        .post(searchDesigByInstitute)
    router.route('/add-designation')
        .post(addDesignation)
    router.route('/edit-designation')
        .post(editDesignation)
    router.route('/designation-vacancies')
        .post(getDesignationVacancies)
    router.route('/cadre-positions')
        .post(getCadrePositions)
    router.route('/grade-vacancies')
        .get(getGradeVacancies)
    router.route('/grade-vacancies-count')
        .get(getGradeVacanciesCount)
    router.route('/retire-officer')
        .post(retireOfficer)
    router.route('/grade-vacancies-details')
        .post(gradeVacanyDetails)
    router.route('/add-application')
        .post(addApplication)
    router.route('/get-applications-count')
        .post(getApplicationsCount)
    router.route('/get-applications')
        .post(getApplications)
    router.route('/update-application')
        .post(updateApplication)
    router.route('/view-officer')
        .post(viewOfficerById)
    router.route('/update-officer')
        .post(updateOfficer)
    router.route('/get-officers-report')
        .get(getAllOfficersReport)
    router.route('/get-all-officers-current')
        .get(getCurrentAllOfficers)
    router.route('/register-officer')
        .post(createUserAccount)
    router.route('/approve-application')
        .post(approveApplication)
    router.route('/all-users')
        .get(getAllUsers)
    router.route('/approve-user')
        .post(approveUser)
    router.route('/cadres')
        .post(getCadres)
    router.route('/edit-cadre')
        .post(updateCadre)
}

function sendUserMessage(req, res) {

    let data = req.body;

    let spawn = require('child_process').spawn;
    let process = spawn('php', ["../sms/index.php", data.message, data.number]);

    process.stdout.on('data', function (data) {
        console.log('data received from PHP Script ::' + data.toString());
        res.send(data.toString());
    });
}

function addOfficer(req, res) {

    let data = req.body;

    actionsService.addOfficer(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getAllOfficers(req, res) {

    actionsService.getAllOfficers().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function addInstitute(req, res) {

    let data = req.body;

    actionsService.addInstitute(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getAllInstitutes(req, res) {

    actionsService.getAllInstitutes().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getInstitutes(req, res) {

    actionsService.getInstitutes().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getInstituteTypes(req, res) {

    actionsService.getInstituteTypes().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getMinistries(req, res) {

    actionsService.getMinistries().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function searchOfficer(req, res) {

    let data = req.body;

    actionsService.searchOfficer(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function attachOfficer(req, res) {

    let data = req.body;

    actionsService.attachOfficer(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getGrades(req, res) {

    actionsService.getGrades().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function addCadrePosition(req, res) {

    let data = req.body;

    actionsService.addCadrePosition(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getDesignations(req, res) {

    actionsService.getDesignations().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function searchOfficerById(req, res) {

    let data = req.body;

    actionsService.searchOfficerById(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function searchDesigByInstitute(req, res) {

    let data = req.body;

    actionsService.searchDesigByInstitute(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function addDesignation(req, res) {

    let data = req.body;

    actionsService.addDesignation(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function editDesignation(req, res) {

    let data = req.body;

    actionsService.editDesignation(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getDesignationVacancies(req, res) {

    let data = req.body;

    actionsService.getDesignationVacancies(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getCadrePositions(req, res) {

    let data = req.body;

    actionsService.getCadrePositions(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getGradeVacancies(req, res) {

    actionsService.getGradeVacancies().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getGradeVacanciesCount(req, res) {

    actionsService.getGradeVacanciesCount().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function retireOfficer(req, res) {

    let data = req.body;

    actionsService.retireOfficer(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function gradeVacanyDetails(req, res) {

    let data = req.body;

    actionsService.gradeVacanyDetails(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function addApplication(req, res) {
    let data = req.body;

    actionsService.addApplication(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getApplicationsCount(req, res) {
    let data = req.body;

    actionsService.getApplicationsCount(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getApplications(req, res) {
    let data = req.body;

    actionsService.getApplications(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function updateApplication(req, res) {

    let data = req.body;

    actionsService.updateApplication(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function viewOfficerById(req, res) {

    let data = req.body;

    actionsService.viewOfficerById(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function updateOfficer(req, res) {

    let data = req.body;

    actionsService.updateOfficer(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getAllOfficersReport(req, res) {

    actionsService.getAllOfficersReport().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getCurrentAllOfficers(req, res) {

    actionsService.getCurrentAllOfficers().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function createUserAccount(req, res) {

    let data = req.body;

    actionsService.createUserAccount(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function approveApplication(req, res) {

    let data = req.body;

    actionsService.approveApplication(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getAllUsers(req, res) {

    actionsService.getAllUsers().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function approveUser(req, res) {

    let data = req.body;

    actionsService.approveUser(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function getCadres(req, res) {

    let data = req.body;

    actionsService.getCadres(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

function updateCadre(req, res) {

    let data = req.body;

    actionsService.updateCadre(data).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
    });
}

module.exports.init = init;




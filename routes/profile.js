var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');


router.get('/', function (req, res, next) {
    if (login.loginID != 0) {
        var query;
        if (login.page == 'doc')
            query = "select * from doctors where doctor_id=" + login.loginID + " ";

        if (login.page == 'nurse')
            query = "select * from nurse where nurse_id=" + login.loginID + " select * from nurse where nurse_id=" + login.loginID + " select * from patients where nurse_id=" + login.loginID + " select * from history where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID + ") select * from rooms where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID + " ";

        if (login.page == 'admin')
            query = "select * from admin where admin_id = " + login.loginID + "";

        if (login.page == 'patient')
            query = "select * from patients where patient_id=" + login.loginID + " select * from history where patient_id=" + login.loginID + " ";

        ser.connection(query, function (data) {
            res.render(login.page, {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
    else {
        res.render('login', {
            validation: 0,
            id: loginID
        });
    }
})

router.get('/myPatients', function (req, res, next) {
    if (login.page == 'doc') {
        var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where doctor_id=" + login.loginID + " select * from history where patient_id = any (select patient_id from patients where doctor_id=" + login.loginID + ")";
        ser.connection(query, function (data) {
            res.render('doctorPatients', {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Doctor"
        });
    }
})

router.get('/myHistory', function (req, res, next) {
    if (login.page == 'patient') {
        var query = "select * from patients where patient_id=" + login.loginID + " select * from history where patient_id=" + login.loginID + " ";
        ser.connection(query, function (data) {
            res.render('patientHistory', {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Patient"
        });
    }
})


router.get('/doctors', function (req, res, next) {
    if (login.page == 'admin') {
        var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
        ser.connection(query, function (data) {
            res.render('adminDoctor', {
                data: data,
                id: login.loginID,
                page: login.page
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});

router.post('/add_doctor', function (req, res) {
    if (login.page == 'admin') {
        var docData = "select * from doctors";
        ser.connection(docData, function (oldDoc) {

            var docId = oldDoc.recordset.length + 1;
            var insertDoc = "insert into doctors (doctor_id,first_name,last_name,spc,phone,address) values (" + docId + ",'" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.docSpec + "','" + req.body.phoneNumber + "','" + req.body.address + "')";
            ser.connection(insertDoc, function (noData) {

                var insertUser = "insert into users (name,password,e_mail,doctor_id) values ('" + req.body.firstName + "','" + req.body.Pass + "','" + req.body.Mail + "'," + docId + ")";
                ser.connection(insertUser, function (noData) {

                    var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
                    ser.connection(query, function (data) {

                        res.render('adminDoctor', {
                            data: data,
                            id: login.loginID,
                            page: login.page
                        });
                    });
                });
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});


router.post('/rmv_doctor', function (req, res) {
    if (login.page == 'admin') {
        var deleteUser = "delete from users where doctor_id = " + req.body.dell;
        ser.connection(deleteUser, function (noData) {

            var deleteDoc = "delete from doctors where doctor_id = " + req.body.dell;
            ser.connection(deleteDoc, function (noData) {

                var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
                ser.connection(query, function (data) {

                    res.render('adminDoctor', {
                        data: data,
                        id: login.loginID,
                        page: login.page
                    });
                });
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});



module.exports = router;
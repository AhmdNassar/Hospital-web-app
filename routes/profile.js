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
        
        if(req.query.s != undefined){
            if(req.query.s === '')
                req.query.s = '?';
            var query = "select * from patients where doctor_id=" + login.loginID + " and concat(concat(first_name, ' '),  last_name) like '" + req.query.s + "%'";
            ser.connection(query, function (data) {
                console.log(data);
                res.send({data: data});
            })
        }
        
        else if(req.query.p === undefined){
            var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where doctor_id=" + login.loginID + " select * from history where patient_id = any (select patient_id from patients where doctor_id=" + login.loginID + ")";
            ser.connection(query, function (data) {
                res.render('doctorPatients', {
                    p: 0,
                    data: data,
                    id: login.loginID,
                    page: login.page
                })
            })    
        }

        else{
            var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where patient_id=" + req.query.p + " select * from history where patient_id=" + req.query.p + " ";
            ser.connection(query, function (data) {
                console.log(data);
                res.render('doctorPatients', {
                    p: 1,
                    data: data,
                    id: login.loginID,
                    page: login.page
                })
            })    
        }

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

        var insertDoc = "insert into doctors (first_name,last_name,spc,phone,address) values ('" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.docSpec + "','" + req.body.phoneNumber + "','" + req.body.address + "') select doctor_id from doctors where first_name ='" + req.body.firstName + "'";
        ser.connection(insertDoc, function (tmpData) {

            var insertUser = "insert into users (name,password,e_mail,doctor_id) values ('" + req.body.firstName + "','" + req.body.Pass + "','" + req.body.Mail + "'," + tmpData.recordset[0].doctor_id + ")";
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
var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');


router.get('/', function (req, res, next) {
    var query = "select * from admin where admin_id = " + login.loginID + "";
    ser.connection(query, ty = 1, function (data) {
        res.render('admin', {
            data: data,
            id: login.loginID,
            page: login.page
        });
    })
});

router.get('/doctors', function (req, res, next) {
    var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
    ser.connection(query, ty = 1, function (data) {
        res.render('adminDoctor', {
            data: data,
            id: login.loginID,
            page: login.page
        });
    });
});

router.post('/add_doctor', function (req, res, next) {
    var dataQuery = "select * from doctors";
    ser.connection(dataQuery, ty = 1, function (oldData) {

        var new_id = oldData.recordset.length + 1;
        var insertQuery = "insert into doctors (doctor_id,first_name,last_name,spc,phone,address) values ("+ new_id +",'" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.docSpec + "','" + req.body.phoneNumber + "','" + req.body.address + "')";
        ser.connection(insertQuery, ty = 1, function (noData) {
        
            var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, ty = 1, function (data) {
        
                res.render('adminDoctor', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
    });
});


router.post('/doctors', (req, res, next) => {
    console.log(req.body.dell)
    console.log("okokoko");
    ser.connection(quiry = "delete from doctors where doctor_id = " + req.body.dell, ty = 0);

    setTimeout(function () {
        ser.connection(quiry = "select * from doctors", ty = 1, (recordset) => {
            console.log(recordset);
            res.render('adminDoctor', {
                data: recordset,
                id: login.loginID,
                page: login.page
            });
        });
    }, 1000)

});




module.exports = router;
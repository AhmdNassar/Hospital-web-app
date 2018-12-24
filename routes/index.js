var express = require('express');
var router = express.Router();
var login = require('./login');
var ser = require('../server');


router.get('/', function (req, res) {
    var query = "select * from doctors where spc='Heart disease' select * from doctors where spc='Hepatology' select * from doctors where spc='Huntington' select * from doctors where spc='Dental' select * from doctors where spc='Ophthalmology' select * from doctors where spc='Otology'";
    ser.connection(query, function (data) {
        res.render('index', {
            data: data,
            id: login.loginID,
            page: login.page
        })
    })
})


module.exports = router;
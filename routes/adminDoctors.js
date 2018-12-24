var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');

router.get('/', function (req, res, next) {
    console.log("");
    var query = "select * from doctors";
    ser.connection(query, function (data) {
        console.log(data);
        res.render('adminDoctor', {
            data: data
        });
    });

})
module.exports = router;


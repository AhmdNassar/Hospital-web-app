var express = require('express');
var router = express.Router();
var login = require('./login');


router.get('/', function (req, res, next) {
    res.render('about', {
        id: login.loginID,
        page: login.page
    });

})
module.exports = router;


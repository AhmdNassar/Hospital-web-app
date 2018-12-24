var express = require('express');
var router = express.Router();
var login = require('./login');

router.get('/', function (req, res, next) {
    console.log(id);
    res.render('header', {
        data: login.page,
        id: login.loginID
    });

})
module.exports = router;
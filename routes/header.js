var express = require('express');
var router = express.Router();
var login = require('./login');

var page=login.page;
var id=login.loginID;
console.log(page);
router.get('/',function(req,res,next){
    console.log(id);
    res.render ('header',{
        data:page,
        id:id
    });
   
})
module.exports = router;
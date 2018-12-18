var express = require('express');
var router = express.Router();

var ser = require('../server');
var login = require('./login');
const sql =  require('../server');
require('mssql')


        router.get('/', function(req,res){
            //var id=req.query.p 
            ser.connection(query="select * from nurse where nurse_id=" + login.loginID +" select * from patients where nurse_id=" + login.loginID +" select * from history where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID +") select * from rooms where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID +" ",ty=1,function(data){
                res.render('nurse',{
                    data:data,
                    loginID: login.loginID

                })
            })        
    }) 


module.exports = router;
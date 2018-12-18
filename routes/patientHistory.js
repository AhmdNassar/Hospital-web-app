var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');
const sql =  require('../server');
require('mssql')


        router.get('/', function(req,res){
            //var id=req.query.p 
            ser.connection(query="select * from patients where patient_id=" + login.loginID +" select * from history where patient_id=" + login.loginID +" " ,ty=1,function(data){
                res.render('patientHistory',{
                    data:data,
                    id: login.loginID,
                    page: login.page
                })
            })        
    }) 


module.exports = router;
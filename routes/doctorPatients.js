var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');
const sql =  require('../server');

require('mssql')

    
    router.get('/', function(req,res){
        //var id=req.query.p 
        // console.log('doc' + login.loginID);
        if(login.loginID!=0){
        ser.connection(query="select * from doctors where doctor_id=" + login.loginID +" select * from patients where doctor_id=" + login.loginID +" select * from history where patient_id = any (select patient_id from patients where doctor_id=" + login.loginID +")",ty=1,function(data){
            console.log(data)
            res.render('doctorPatients',{
                data:data,
                id: login.loginID,
                page: login.page
            })
        })}        
}) 




module.exports = router;
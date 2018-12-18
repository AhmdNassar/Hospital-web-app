var express = require('express');
var router = express.Router();
var ser = require('../server');
var bodyParser = require('body-parser');
var urlenco = bodyParser.urlencoded({extended:false});
var login = require('./login');


router.get('/',function(req,res,next){
     ser.connection(query = "select * from admin where admin_id = " + login.loginID + "" ,ty=1, (recordset)=>{
        console.log(recordset);
        res.render ('admin',{
             data:recordset,
             id: login.loginID,
             page: login.page
         });
    })
  
   
});

router.get('/doctors',function(req,res,next){
    ser.connection(query = "select * from doctors select * from admin where admin_id = " + login.loginID + "",ty=1, (recordset)=>{
       console.log(recordset);
       res.render ('adminDoctor',{
            data:recordset,
            id: login.loginID,
            page: login.page
        });
   });
});
router.post('/insert',urlenco,(req,res,next)=>{
    console.log("we are here")
    console.log(req.body);
    ser.connection(quiry="insert into doctors (doctor_id,first_name,last_name,spc,phone,address) values ('5','"+req.body.firstName+"','"+ req.body.lastName+"','"+req.body.docSpec+"','"+req.body.phoneNumber+"','"+req.body.address+"')");
    setTimeout(function(){
        ser.connection(quiry = "select * from doctors",ty=1, (recordset)=>{
            console.log(recordset);
            res.render ('adminDoctor',{
                 data:recordset
             });
        });
           },1000)

        });

router.post('/doctors',urlenco,(req,res,next)=>{
    console.log(req.body.dell)
    console.log("okokoko");
    ser.connection(quiry = "delete from doctors where doctor_id = "+req.body.dell,ty=0);   
   
   setTimeout(function(){
    ser.connection(quiry = "select * from doctors",ty=1, (recordset)=>{
        console.log(recordset);
        res.render ('adminDoctor',{
             data:recordset,
             id: login.loginID,
             page: login.page
         });
    });
       },1000)
 
});
// handel patient table
router.get('/patients',(req,res,next)=>{
    ser.connection("select * from patients",ty=1,(recordset)=>{
        console.log(recordset);
    });
});

// handel doctors table


// handel nurses table
router.get('/nurses',(req,res,next)=>{
    ser.connection("select * from nurses",ty=1,(recordset)=>{
        console.log(recordset);
    });
});




module.exports = router;
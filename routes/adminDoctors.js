var express = require('express');
var router = express.Router();
var ser = require('../server');

router.get('/',function(req,res,next){
    console.log("");
    ser.connection(query = "select * from doctors",ty=1, (recordset)=>{
        console.log(recordset);
        res.render ('adminDoctor',{
             data:recordset
         });
    });
   
})
module.exports = router;


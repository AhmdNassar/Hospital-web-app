var express = require('express');
var app = express();
var path = require('path');
var sql = require("mssql");
var login = require("./routes/login");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.locals.id = login.loginID;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var routes = require('./routes/index');
app.use('/', routes);
var about = require('./routes/about');
app.use('/about', about);
var appointment = require('./routes/appointment');
app.use('/appointment', appointment);
var blog = require('./routes/blog');
app.use('/blog', blog);
var department = require('./routes/department');
app.use('/department', department);
var doctor = require('./routes/doctor');
app.use('/doctors', doctor);
var services = require('./routes/services');
app.use('/services', services);
var login = require('./routes/login').router;
app.use('/login', login);
var doc = require('./routes/doc');
app.use('/doc', doc);
var nurse = require('./routes/nurse');
app.use('/nurse', nurse);
var patient = require('./routes/patient');
app.use('/patient', patient);
var admin = require('./routes/admin');
app.use('/admin', admin);
var header = require('./routes/header');
app.use('/about', header);
var doctorPatients = require('./routes/doctorPatients');
app.use('/doctorPatients', doctorPatients);
var patientHistory = require('./routes/patientHistory');
app.use('/patientHistory', patientHistory);
var adminDoctors = require('./routes/adminDoctors');
app.use('/adminDoctors', adminDoctors);


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// config for your database
var config = {
    user: 'sa',
    password: '123',
    server: 'localhost\\Hospital',
    database: 'Hospital',
    port: 5050,
    dialect: 'mssql'
};


function connection(query, ty = 1, callback) {
    var conn = new sql.ConnectionPool(config);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) console.log(err);

        // create Request object
        req.query(query, function (err, recordset) {
            if (err) { 
                console.log(err); 
                return; 
            }
            if (ty === 1) callback(recordset);

            conn.close();
        });
    });
}

var server = app.listen(5050, function () {
    console.log('Server is running..');
});


module.exports.connection = connection;

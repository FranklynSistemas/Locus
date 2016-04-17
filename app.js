var cons 	= require("consolidate");
var	bodyParser 	= require('body-parser');
var express = require("express");
var	app		= express();
var argv = require('optimist').argv;


//Rutas	
var routes = require('./routes/rutas');
var control = require('./controller/controller');

app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', routes);


app.listen(3000,argv.fe_ip);
console.log('Escuchando por el puerto 3000');
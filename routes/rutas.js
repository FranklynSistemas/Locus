var express = require('express');
var router = express.Router();

// Esquemas BD
var Resultados = require('../schemas/resultados');
var Preguntas = require('../schemas/preguntas');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { titulo: 'UDEC' });
});

router.get('/VerResultados', function(req, res, next) {
  res.render('resultados', { titulo: 'UDEC' });
});

//Trae preguntas
router.get('/TraePreguntas', function(req, res, next) {
  Preguntas.find({},function(err,data){
  	if(data){
  		res.json(data);
  	}else{
  		res.json({status: false});
  	}

  })


});

//Guarda Resultados del test
router.post("/GuardaResultado", function(req, res){
   	var datos = req.body;
   	console.log(datos);
	Resultados.count(function(err, cont){
	      
	    	var datosAux = datos;
	   		datosAux.id = cont++;
	   		resultados =  new Resultados(datosAux);
	   		resultados.save(function (err, obj) {
	            if (!err) {
	           	  res.json({status: true});
	            }else{
	              res.json({status: false});
	            }
	               
	            });
	            
	});   
  
});  

//Muestra Resultados
router.get('/MuestraResultados', function(req, res, next) {
  Resultados.find({},function(err,data){
  	if(data){
  		res.json(data);
  	}else{
  		res.json({status: false});
  	}

  })
});




router.get("*", function(req, res){
	
	res.status(404).send("Página no encontrada :( en el momento");

});


module.exports = router;
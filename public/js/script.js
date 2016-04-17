$(function()
{

var Preguntas = {};
var segundos = 40,
    tiempo = 1000,
    Nombre = '';

var nomServicios = [
              {
                servicio  :   "Trae Preguntas", 
                urlServicio :   "/TraePreguntas", 
                metodo    :   "GET"
              }, 
              {
                servicio  :   "Guarda Resultado", 
                urlServicio :  "/GuardaResultado",
                metodo    :   "POST"
              },
              {
                servicio  :   "Muestra Resultados", 
                urlServicio :  "/MuestraResultados",
                metodo    :   "POST"
              }
              ];


var consumeServicios = function(tipo, val)
{
        var servicio = {
            url   : nomServicios[tipo - 1].urlServicio, 
            metodo  : nomServicios[tipo - 1].metodo, 
            datos   : ""
          };
    
    servicio.datos = val !== "" ? JSON.stringify(val) : "";
    
    $.ajax(
    {
      url     : servicio.url,
      type    : servicio.metodo, 
      data    : servicio.datos, 
      dataType  : "json",
      contentType: "application/json; charset=utf-8"
    }).done(function(data)
    {          
     switch(tipo)
     {
        case 1:
          Preguntas = data;
          imprimePreguntas(-1);
        break;
        case 2:
          console.log(data.status);
          if(data.status){
            $("#finish").hide();
            $("#Cuestionario").html("<b>Su Locus Interno tiene un valor de: </b> <h3>"+RespuestaUserA+"</h3><b> Y su Locus Externo tiene un valor de: </b><h3>"+RespuestaUserB+"</h3>");
          }
        break;
        case 3:
          imprimeResultados(data);
        break;

     } 
});

};
consumeServicios(1, "");

var Pregunta = 1;
var RespuestaUserA = 0;
var RespuestaUserB = 0;


function imprimePreguntas(Num){
  console.log("entre");
  if(Num === -1){

    $("#Cronometro").hide();
    $("#next").hide();
     $("#finish").hide();

    var html = "<p align='justify'>Este es un cuestionario para determinar cómo ciertos acontecimientos en nuestra sociedad afectan a distintas personas. Cada ítem consiste de dos oraciones denominadas a y b, escoja entre las alternativas, la que más fuertemente usted crea (en su opinión) que describe la situación expuesta. Marque la alternativa (a o b) que indique su opinión en la hoja de respuestas. Cerciórese de escoger la alternativa en que verdaderamente crea, en vez de la que piensa que deba escoger o la que quisiera que fuese verdad. El presente cuestionario es una medida de las creencias personales y por lo tanto, no hay respuestas correctas o incorrectas.</p> <p align='justify'>Por favor conteste con cuidado pero sin detenerse particularmente en ningún ítem, tal vez descubra que en algunos casos usted crea en ambas alternativas o que no crea en ninguna de las dos. En esos casos escoja la alternativa que más se acerque a lo que usted cree y en lo que a usted respecta. Trate de contestar a cada ítem independientemente al hacer su selección, no se deje afectar por las selecciones anteriores.</p><p><b>Recuerde:</b>"
                +"Escoja la alternativa que usted personalmente crea que sea la más verdadera.</p><br><b>Nombre: </b><input id='inputNombre' type='text' id='Nombre' placeholder='Escriba su Nombre'><br>";

    $("#Cuestionario").html(html);

  $("#Start").click(function(event)
  {
    if($("#inputNombre").val().length!=0){
      Nombre = $("#inputNombre").val();
      timer();
      imprimePreguntas(0);
      $("#Mensajes").html("");
    }else{
      $("#Mensajes").html("<p style='color:red'> Debe ingresar su nombre</p>");
    }
    
  });
  }else{
  imprimePregunta(0);
  $("#Cronometro").show();
  $("#next").show();

  }
};

var imprimePregunta = function(Num){
  $("#Cronometro").show();
  $("#next").show();
  $("#Start").hide();
  var html =  '<p><b>Pregunta Numero: '+Preguntas[Num].id +'</b></p>'
              +'<div class="radio"><label><input id="a" class="radioB" type="radio" name="group1" value='+Preguntas[Num].Interno+'>'+Preguntas[Num].A +'</label><br>'
              +'<label><input id="b" class="radioB" type="radio" name="group1" value='+Preguntas[Num].Externo+'>'+Preguntas[Num].B +'</label></div>';

  $("#Cuestionario").html(html);
}

 $("#next").click(function(event)
  {
    if(!$("#a").prop("checked") && !$("#b").prop("checked")){
      $("#Mensajes").html("<p style='color:red'> Debe marcar alguna opción</p>");
    }else{
      $("#Mensajes").html("");
      console.log(Pregunta);
      if(Pregunta <= 22 && segundos > 0){
        segundos = 40;
        $("#a").prop("checked") ? RespuestaUserA += parseInt($("#a").val()) : RespuestaUserB += parseInt($("#b").val());
        console.log(RespuestaUserA , RespuestaUserB);
        imprimePregunta(Pregunta++);
      }else{
        $("#a").prop("checked") ? RespuestaUserA += parseInt($("#a").val()) : RespuestaUserB += parseInt($("#b").val());
        console.log(RespuestaUserA , RespuestaUserB);
        $("#next").hide();
        $("#Cronometro").hide();
        $("#Mensajes").hide();
        $("#Cuestionario").html("<h1 style='color:green'>Gracias por participar, por favor de clic en Finalizar</h1>");
        $("#finish").show();
      }
    }
  });

$("#finish").click(function(event)
  {
    var datos = {
                  Nombre: Nombre,
                  Interno : RespuestaUserA,
                  Externo : RespuestaUserB
                }
    consumeServicios(2, datos);
  });
 function timer(){
  segundos--;
  if(segundos>=0){
    $("#Cronometro").html(00+":"+segundos);
    setTimeout(function(){timer()},tiempo);
  }else{
    segundos < 40 ? $("#Mensajes").html("<p style='color:red'>Se termino el tiempo</p>") : $("#Cronometro").html(00+":"+segundos);
  
  }
}

  var  imprimeResultados = function(data){
    var htmlTabla = '';
    
    for(registros in data.results){
       htmlTabla += '<tr>';
            htmlTabla += '<td>'+registros+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].numProceso+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].tipoProceso+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Estado+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Entidad+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Objeto+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].DepMun+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Cuantia+'</td>'; 
            htmlTabla += '<td>'+data.results[registros].Fecha+'</td>';
            htmlTabla += '<td><a href="'+data.results[registros].URL+'">Ver Más</a></td>';
       htmlTabla += '</tr>';

       
      }

       $("#Muestradatos").html(htmlTabla);
        //$("#Muestradatos").html(htmlTabla);
        $("#MyTable").DataTable();
        $("#MyTable").footable();
        //setTimeout(function(){$("#MyTable").DataTable()},1000);
        

  };
  consumeServicios(5, "");

});
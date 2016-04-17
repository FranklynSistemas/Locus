$(function()
{

var Preguntas = {};
var segundos = 40,
    tiempo = 1000,
    Nombre = '';

var nomServicios = [
              {
                servicio  :   "Muestra Resultados", 
                urlServicio :  "/MuestraResultados",
                metodo    :   "GET"
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
          imprimeResultados(data);
        break;

     } 
});

};
consumeServicios(1, "");

var GeneralInterno = 0,
    GeneralExterno = 0;

  var  imprimeResultados = function(data){
    var htmlTabla = '';
    
    for(registros in data){
      GeneralInterno += data[registros].Interno;
      GeneralExterno += data[registros].Externo;
      var Color = (registros % 2) === 0 ? "success" : "info";
       htmlTabla += '<tr class="'+Color+'"">';
            htmlTabla += '<td><b>'+data[registros].id+'</b></td>'; 
            htmlTabla += '<td><b>'+data[registros].Nombre+'</b></td>'; 
            htmlTabla += '<td><b>'+data[registros].Interno+'</b></td>'; 
            htmlTabla += '<td><b>'+data[registros].Externo+'</b></td>'; 
       htmlTabla += '</tr>';
       
      }

       $("#Muestradatos").html(htmlTabla);
        //$("#Muestradatos").html(htmlTabla);
        $("#MyTable").DataTable();
        $("#MyTable").footable();
        //setTimeout(function(){$("#MyTable").DataTable()},1000);

        var TablaFinal = "<table id='TabFinal' class='table table-bordered'>"
                          +"<thead><tr>"
                          +"<th>Locus Interno del Curso</th>"
                          +"<th>Locus Externo del Curso</th>"
                          +"</tr></thead><tbody>"
                          +"<tr><td class='success'><b>"+GeneralInterno+"</b></td>"
                          +"<td class='info'><b>"+GeneralExterno+"</b></td>"
                          +"</tr></tbody>"
                          +"</table>";

        $("#Conclusion").html(TablaFinal);
        

  };
  

});
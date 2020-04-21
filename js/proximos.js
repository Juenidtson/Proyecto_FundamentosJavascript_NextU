/*
  Carga de datos desde archivo info.json
*/

//variables
var fechaActual;
var pasados;
var proximos;
var eventos;

//Funcion para convertir fecha de String a Date
function convertirFecha(fecha){
  var year = (fecha.split("-"))[0];
  var month = (fecha.split("-"))[1];
  var day = (fecha.split("-"))[2];
  var formatoFecha = new Date(year, month, day);
  return formatoFecha;
}

//Funcion para ordenar un arreglo por fecha
Array.prototype.orderByDate = function(property,sortOrder){
  if (sortOrder != -1 && sortOrder != 1) sortOrder = 1;
  this.sort(function(a,b){
    var dateA = new Date(convertirFecha(a[property])), dateB = new Date(convertirFecha(b[property]));
    return (dateA - dateB) * sortOrder;
  })
}

$(document).ready(function () {


  //Funcion ajax
  $.ajax({
    url: "info.json"
  }).done(function(response) {

    //Guarda el resultado en variables
    fechaActual = response.fechaActual;
    eventos = response.eventos;

    //Clasifica los eventos segun la fecha actual del JSON
    pasados = eventos.filter(function(x){
      return convertirFecha(x.fecha) < convertirFecha(fechaActual);
    })
    proximos = eventos.filter(function(x){
      return convertirFecha(x.fecha) > convertirFecha(fechaActual);
    })

    //Ordena los eventos segun la fecha (los mas cercanos primero)
    pasados.orderByDate('fecha',1);
    proximos.orderByDate('fecha',1);


    //Modifica el DOM agregando el html
    for (var i=0; i < pasados.length; i++){
    $("#proximos").append("<div class='col-md-8 bg-white mb-5'>"
                          + "<h2 class='text-primary'>" + proximos[i].nombre + "</h2>"
                          + "<p class='text-secondary'>" + proximos[i].fecha + "</p>"
                          + "<p>"+ proximos[i].descripcion + "</p>" +
                          "</div>"
                          );
    }

  });

});

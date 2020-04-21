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

    //Extrae solo dos eventos
    var pasado1 = pasados[0];
    var pasado2 = pasados[1];
    var proximo1 = proximos[0];
    var proximo2 = proximos[1];

    //Modifica el DOM agregando el html
    $("#proximos").append("<div class='col-md-4 bg-white'>"
                          + "<h2 class='text-primary'>" + proximo1.nombre + "</h2>"
                          + "<p class='text-secondary'>" + proximo1.fecha + "</p>"
                          + "<p>"+ proximo1.descripcion + "</p>" +
                          "</div>" +
                          "<div class='col-md-1 d-none d-md-block'> </div>" +
                          "<div class='col-md-4 bg-white'>"
                          + "<h2 class='text-primary'>" + proximo2.nombre + "</h2>"
                          + "<p class='text-secondary'>" + proximo2.fecha + "</p>"
                          + "<p>"+ proximo2.descripcion + "</p>" +
                          "</div>"
                          );
    //Modifica el DOM agregando el html
    $("#pasados").append("<div class='col-md-4 bg-white'>"
                          + "<h2 class='text-primary'>" + pasado1.nombre + "</h2>"
                          + "<p class='text-secondary'>" + pasado1.fecha + "</p>"
                          + "<p>"+ pasado1.descripcion + "</p>" +
                          "</div>" +
                          "<div class='col-md-1 d-none d-md-block'> </div>" +
                          "<div class='col-md-4 bg-white'>"
                          + "<h2 class='text-primary'>" + pasado2.nombre + "</h2>"
                          + "<p class='text-secondary'>" + pasado2.fecha + "</p>"
                          + "<p>"+ pasado2.descripcion + "</p>" +
                          "</div>"
                          );

  });

});

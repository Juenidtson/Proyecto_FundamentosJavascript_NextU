/*
  Validacion de formulario
*/

function validar(formulario) {

  //Validacion del nombre completo
  if (formulario.nombres.value.trim().length == 0) {
    $('#errornombres').text("Nombre obligatorio");
    return false;
  }

  //Validacion del email
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formulario.email.value)) {
    $('#errorEmail').text("Email inválido");
    return false;
  }

  //Validacion de la contrasena
  if (formulario.contrasena.value.trim().length == 0) {
    $('#errorContrasena').text("Contraseña obligatorio");
    return false;
  }

  //Validacion de la confirmacion de la contrasena
  if (formulario.contrasena.value != formulario.confirmacion.value) {
    $('#errorConfirmacion').text("Confirmación no coincide");
    return false;
  }

  //Validacion del tipo de usuario
  if (formulario.tipo.value == "-1") {
    $('#errorTipo').text("Género es obligatorio");
    return false;
  }

  //Validacion de los terminos y condiciones
  if (!formulario.acepto.checked) {
    $('#errorAcepto').text("Debe aceptar los términos y condiciones");
    return false;
  }

  return true;

}

const formContact = document.getElementById("form-contact");
const formContactMessage = formContact.querySelector("#form-contact-message");
const errorMsgElem = document.getElementById("error-message");

const blank = " ";
const doubleBlank = "  ";

// contador de chars del mensaje
formContactMessage.addEventListener("keyup", () => {
  let msg = formContactMessage.value;

  // no contar 'leading blanks'
  while (msg.indexOf(blank) === 0) {
    msg = msg.replace(blank, "");
  }
  // mostrar contador a partir de 2 chars
  const charNum = msg.length;
  if (charNum > 1) {
    errorMsgElem.style.color = "#292e47";
    errorMsgElem.innerHTML = charNum + " characters";
  } else {
    errorMsgElem.style.color = "";
    errorMsgElem.innerHTML = "";
  }
});

// validación de formulario
formContact.addEventListener("submit", (e) => {
  e.preventDefault();

  // elimina posibles mensajes de error anteriores
  for (elem of document.querySelectorAll(".error-msg")) elem.innerHTML = "";

  let error = false;
  const formValues = {
    name: document.getElementById("form-contact-name").value,
    email: document.getElementById("form-contact-email").value,
    phone: document.getElementById("form-contact-phone").value,
    message: document.getElementById("form-contact-message").value,
  };

  for (key in formValues) {
    let val = formValues[key].trim();

    // elimina 2 blanks consecutivos
    while (val.indexOf(doubleBlank) >= 0) {
      val = val.replaceAll(doubleBlank, blank);
    }
    formValues[key] = val;
  }

  // comprueba que existe blank (entre nombre y apellido)
  if (formValues.name.indexOf(blank) === -1) {
    document.getElementById("error-name").innerHTML =
      "Name or surname is missing";
    error = true;
  }

  // comprueba formato e-mail
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (formValues.email && !regex.test(formValues.email)) {
    document.getElementById("error-email").innerHTML =
      "The e-mail address is incorrect";
    error = true;
  }

  // comprueba que el teléfono sean todo números
  regex = /^[0-9]+$/;
  if (formValues.phone && !regex.test(formValues.phone)) {
    document.getElementById("error-phone").innerHTML =
      "The phone can only contain numbers";
    error = true;
  }

  // comprueba que el mensaje tenga 10+ chars tras haber eliminado blanks
  if (formValues.message.length < 10) {
    errorMsgElem.style.color = "";
    errorMsgElem.innerHTML = "Your message is too short";
    error = true;
  }

  if (error) {
    // actualizar campos con valores sin blanks sobrantes
    document.getElementById("form-contact-name").value = formValues.name;
    document.getElementById("form-contact-email").value = formValues.email;
    document.getElementById("form-contact-phone").value = formValues.phone;
    document.getElementById("form-contact-message").value = formValues.message;
  } else {
    // mostrar valores validados por consola
    console.log("name   :", formValues.name);
    console.log("email  :", formValues.email);
    console.log("phone  :", formValues.phone);
    console.log("message:", formValues.message);
  }
});

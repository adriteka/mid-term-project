const formContact = document.getElementById("form-contact");
const formContactName = document.getElementById("form-contact-name");
const formContactMail = document.getElementById("form-contact-email");
const formContactPhone = document.getElementById("form-contact-phone");
const formContactMessage = formContact.querySelector("#form-contact-message");
const errorMsgElem = document.getElementById("error-message");

const blank = " ";
const doubleBlank = "  ";

// contador de chars del mensaje
formContactMessage.addEventListener("keyup", () => {
  // mostrar contador a partir de 2 chars
  const charNum = formContactMessage.value.trimStart().length;
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
  for (elem of formContact.querySelectorAll(".error-msg")) elem.innerHTML = "";

  let error = false;
  const formValues = {
    name: formContactName.value,
    email: formContactMail.value,
    phone: formContactPhone.value,
    message: formContactMessage.value,
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
    document.getElementById("error-name").innerHTML = "Missing name or surname";
    document.getElementById("form-contact-name").toggleAttribute("autofocus");
    error = true;
  }

  // comprueba formato e-mail
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  if (formValues.email && !regex.test(formValues.email)) {
    console.log("validation:", formValues.email);
    document.getElementById("error-email").innerHTML =
      "The e-mail is incorrect";
    error = true;
  }

  // comprueba que el teléfono sean todo números
  regex = /^[0-9]+$/;
  if (formValues.phone && !regex.test(formValues.phone)) {
    document.getElementById("error-phone").innerHTML = "Numbers only please";
    error = true;
  } else if (formValues.phone && formValues.phone.length < 3) {
    document.getElementById("error-phone").innerHTML = "Phone is too short";
    error = true;
  }

  // comprueba que el mensaje tenga 10+ chars tras haber eliminado blanks
  if (formValues.message.length < 10) {
    errorMsgElem.style.color = "";
    errorMsgElem.innerHTML = "The message is too short";
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
    alert("Form submitted succesfully!");

    formContactName.value = "";
    formContactMail.value = "";
    formContactPhone.value = "";
    formContactMessage.value = "";
  }
});

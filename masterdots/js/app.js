/* ============================================================
    JS para la comprobación de datos del formulario de entrada
   ============================================================*/

/* ==================================================
            INICIALIZACIÓN VARIABLES, OBJETOS, DOM
   ==================================================*/
var nickInput;
var sizeInput;
var emailInput;
var formInput;
var error;
var avatarItems;
var itemImg;
var avatarContainer; //Elemento donde vamos a dejar el avatar al soltarlo

/* ==============================
            FUNCIONES
   ==============================*/
/**
 * Función que realiza las comprobaciones en los datos del formulario al hacer
 * click sobre el botón para jugar
 * @param {Event} event 
 * @returns 
 */
function checkForm(event) {
    if (nickInput.value.length == 0) {
        event.preventDefault();
        error.innerText = "Nick field cannot be empty";
        return false;
    } else if (nickInput.value.match(/\b\d+\w*/)) { /*Para indicar inicio/fin del regex se usa / no comillas*/
        event.preventDefault();
        error.innerText = "Name field cannot start by a number";
        return false;
    } else if (sizeInput.value == "0") {
        sizeInput.focus();//El cursor se coloca sobre el input
        event.preventDefault();
        error.innerText = "A size must be selected";
        return false;
    }
    //En este punto la información ya es correcta, por lo que ya podemos almacenarla en la sesión
    userData(nickInput, sizeInput, emailInput, avatarContainer);
    return true;
}

/**
 * Función que aplica el evento de movimiento sobre un avatar para el Drag and Drop
 * @param {Event} event 
 */
function imageMoving(event) {
    itemImg = event.target; //Selecciona justo la imagen sobre la que se está 

}
/**
 * Cambiamos la imagen del contenedor al avatar seleccionado en el Drag an Drop
 * @param {Event} event 
 */
function changeImg(event) {
    avatarContainer.src = itemImg.src;
}

/**
 * Función que realiza la carga de objetos del DOM, comprobaciones y eventos del formulario
 */
function DOMLoaded() {
    //Se cargan las variables
    nickInput = document.getElementById("nick");
    sizeInput = document.getElementById("size");
    emailInput = document.getElementById("email");
    formInput = document.getElementById("inputForm");
    error = document.getElementById("error");

    //Se comprueba si hay algún error, ya que ahora sí estará cargado
    if (sessionStorage.getItem("error") != null) {
        error.innerText = sessionStorage.getItem("error"); //mostrar mensaje de error
        sessionStorage.removeItem("error"); //para que al recargar no vuelva a aparecer el error
    }

    //Se comprueba el formulario
    formInput.addEventListener('submit', checkForm);

    //Eventos del Drag and Drop
    //Para no tener que añadir el evento a cada avatar por separado (6), utilizamos una clase común "avatarImgItem"
    avatarItems = document.getElementsByClassName("avatarImgItem");
    for (let item of avatarItems) {
        item.addEventListener('dragstart', imageMoving);
    }
    //Contenedor para soltar el avatar
    avatarContainer = document.getElementById("avatarImg");
    avatarContainer.addEventListener('dragover', e => { e.preventDefault(); });
    avatarContainer.addEventListener('drop', changeImg);
}

/* ===================================
            EVENTO PRINCIPAL
   ===================================*/
document.addEventListener('DOMContentLoaded', DOMLoaded);

/* ========================================
                GEOLOCALIZACIÓN
   ========================================*/
dataGeolocation();

/* ==================================================
                ALMACENAR INFO USUARIO
   ==================================================*/

/* ==============================
        VARIABLES GLOBALES
   ==============================*/
var nick;
var size;
var email;
var geolocationTxT;
var avatarImg;

/* ==============================
            FUNCIONES
   ==============================*/

/**
 * Función para obtener todos los datos del usuario desde la sesión abierta
 * @param {HTML Element} nickInput 
 * @param {HTML Element} size 
 * @param {HTML Element} email 
 */
function userData(nickInput, size, email, avatarContainer) {
    sessionStorage.setItem("nick", nickInput.value); //"nick" será la clave usada para recuperar la info
    sessionStorage.setItem("size", size.value);
    sessionStorage.setItem("email", email.value);
    sessionStorage.setItem("geolocation", geolocationTxT.value); //Al final de la carga, estará disponible
    sessionStorage.setItem("avatarImg", avatarContainer.src); //Al final de la carga, estará disponible
    // el txt pq los datos de geolocalización se habían almacenado antes
}

/**
 * Función para obtener los datos de usuario 
 */
function getUserData() {
    nick = sessionStorage.getItem("nick");
    size = sessionStorage.getItem("size");
    email = sessionStorage.getItem("email");
    avatarImg = sessionStorage.getItem("avatarImg");
}

/**
 * Función para comprobar que nos meten los datos en el sessionStorage
 * así no se lo pueden saltar poniendo "game.html"
 * @returns false/true según  si el formulario se ha completado correctamente
 */
function checkUserData() {
    if (nick == null) { //Es decir, no hay SessionStorage
        sessionStorage.setItem("error", "Form not filled correctly!");
        return false;
    }
    return true;
}

/**
 * Función para realizar la petición y almacenamiento de la geolocalización del usuario
 */
function dataGeolocation() {
    if (!navigator.geolocation) {
        geolocationTxT = "Web browser does NOT support Geolocation API";
    } else {
        //A partir de aquí se empieza a escribir la geolocalización
        navigator.geolocation.getCurrentPosition(
            //Si se consigue correctamente: CALLBACKS(retorno de una petición)
            (position) => { geolocationTxT = "Latitude: " + position.coords.latitude + ", longitude: " + position.coords.longitude; },

            //Error
            () => { geolocationTxT = "Geolocation couldn't be done correctly."; }
        )

    }
}

/**
 * Registro de entradas de usuarios mediante localStorage (HISTORIAL)
 * @param {*} nick 
 */
function userDateRecord(nick) {
    let recordStorage = localStorage.getItem("record"); //obtenemos el historial de entradas
    let records;
    if (recordStorage == null) { //no existe un historial previo
        records = []; //lo creamos
    } else {
        records = JSON.parse(recordStorage); //Si existe, lo obtenemos del localStorage haciendo
        //la operación inversa al JSON.strongify, ya que en el local se ha almacenado en JSON 
    }
    let userRecord = {
        user: nick.value,
        date: Date.now() //Date: objeto que representa fechas en JS
    }
    records.push(userRecord);
    localStorage.setItem("record", JSON.stringify(userRecord));
}
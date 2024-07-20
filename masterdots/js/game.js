/* ==================================================
                    CÓDIGO JUEGO    
   ==================================================*/
/* ==========================
            VARIABLES
   ==========================*/
var item;
var nextId;
var markedInit = false;
var adjacentPoints = [];
var panelSize;
var markedClass;
var markedPoints = [];
var idInterval;

/* ==========================
            FUNCIONES
   ==========================*/
/**
 * Función que devuelve un número random entre 0 y max
 * @param {int} max 
 * @returns 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Función para obtener la información del usuario de la parte derecha del menú
 */
function fillUserForm() {
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src = avatarImg; //variable de userInfo que almacena el avatar
    panelSize = parseInt(size);
}

/**
 * Función que dibuja el panel de fichas
 */
function drawPanel() {
    document.getElementById("game").style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    document.getElementById("game").style.gridTemplateRows = "repeat(" + size + ", 1fr)";
    //Elementos de forma automática
    let sizeInt = parseInt(size); //Hay que recordar que el valor de size en el sessionStorage se almacena como string
    let items = "";
    let color = ["red", "green"];
    let colorRandom = 0;
    for (let index = 0; index < sizeInt * sizeInt; index++) { //El index lo utlizaremos para el cálculo de los puntos adyacentes luego
        if (index % 2 > 0) {
            colorRandom = getRandomInt(2);
        }
        items += `<div class="containerItem"><div id="${index}" class="item ${color[colorRandom]}"></div></div>`; //Comillas evaluativas para poder meter variable
    }
    document.getElementById("game").innerHTML = items;
}

/**
 * Función que realiza el cálculo de los puntos adyacentes
 * @param {int} markedId 
 */
function adjacentCalculation(markedId) {
    adjacentPoints = [];
    //Adyacente superior
    if ((markedId - panelSize) >= 0) {
        adjacentPoints.push(markedId - panelSize);
    }
    //Adyacente inferior
    if ((markedId + panelSize) < (panelSize * panelSize)) {
        adjacentPoints.push(markedId + panelSize);
    }
    //Adyacente izquierda
    if ((markedId % panelSize) > 0) {
        adjacentPoints.push(markedId - 1);
    }
    //Adyacente derecho
    if (((markedId + 1) % panelSize) > 0) {
        adjacentPoints.push(markedId + 1);
    }
    for (let i = 0; i < adjacentPoints.length; i++) {
        console.log(adjacentPoints[i]);
    }
}

/**
 * Función que comienza el marcado de fichas
 * Cuando se hace click en el item
 * @param {Event} event 
 */
function startMarking(event) {
    item = event.target;
    let containerItem = event.target.parentElement; //Elemento padre
    if (item.classList.contains("red")) { //Comprobamos si el elemento hijo es de color rojo
        containerItem.classList.add("red"); //Cambiamos la clase padre a rojo, para que se ponga como color de fondo del contenedor
        markedClass = "red";
    } else {
        containerItem.classList.add("green");
        markedClass = "green";
    }
    if (!markedInit) { markedInit = true; }
    markedPoints.push(parseInt(item.id));
    adjacentCalculation(parseInt(item.id));
}

/**
 * Función que continúa el marcado de fichas, uniéndolas
 * Cuando se pasa por encima mientras se hace click
 * @param {Event} event 
 */
function keepMarking(event) {
    item = event.target;
    nextId = parseInt(item.id);
    if (markedInit) { //Se sigue marcando SOLO si se ha empezado a marcar
        //Comprobamos si el próximo elemento es adyacente
        if (adjacentPoints.includes(nextId) && item.classList.contains(markedClass)) {
            let containerItem = event.target.parentElement; //Elemento padre
            if (item.classList.contains("red")) {
                containerItem.classList.add("red");
            } else {
                containerItem.classList.add("green");
            }
            markedPoints.push(parseInt(item.id));
            adjacentCalculation(parseInt(item.id));
        }
    }
}

/**
 * Función que finaliza el marcado de fichas
 * Cuamdo no se está clickando el item
 * @param {Event} event 
 */
function finishMark() {
    markedInit = false;
    adjacentPoints = [];
    const scoreInput = document.getElementById("score");
    if (markedPoints.length > 1) {
        scoreInput.value = parseInt(scoreInput.value) + markedPoints.length;
    }
    //Modificamos los elementos marcados una vez que dejamos de arrastar el ratón
    for (let i = 0; i < markedPoints.length; i++) {
        //Capturar el objeto
        let markedItem = document.getElementById(markedPoints[i]);
        //Eliminamos el class marcado de todos los padres
        markedItem.parentElement.classList.remove(markedClass);
        //Cambiamos el color de los objetos hijos de forma aleatoria
        let color = ["red", "green"];
        let colorRandom = getRandomInt(2);
        markedItem.classList.remove(markedClass);
        markedItem.classList.add(color[colorRandom]);
    }
    markedPoints = [];
}

/**
 * Función que realiza la cuenta atrás del juego
 */
function countdown() {
    let timeLeft = parseInt(document.getElementById("time").value) - 1;
    document.getElementById("time").value = timeLeft;
    if (timeLeft == 0) {
        clearInterval(idInterval);
        //Finalizamos todos los eventos
        const items = document.getElementsByClassName("item");
        for (let item of items) {
            item.removeEventListener('mousedown', startMarking);
            item.removeEventListener('mouseover', keepMarking);
        }
        document.removeEventListener('mouseup', finishMark);
        //Cambiar z-index de los paneles (pantalla PLAY AGAIN)
        document.getElementById("finishedGame").classList.add("finishedGameColor"); //Añadimos la clase de color para las transiciones de la última pantalla
        document.getElementById("finishedGame").style.zIndex = "2";
        document.getElementById("game").style.zIndex = "1";
        document.getElementById("newGame").addEventListener("click", 
            (e) => { location.reload() }); //Se recarga la misma página para empezar una nueva partida
    }
}

/**
 * Función que establece los eventos de ratón durante la partida
 */
function gameEvents() {
    const items = document.getElementsByClassName("item"); //Obtenemos todos los círculos del juego
    for (let item of items) {
        item.addEventListener('mousedown', startMarking);
        item.addEventListener('mouseover', keepMarking);
    }
    document.addEventListener('mouseup', finishMark);
    //Cuenta atrás
    idInterval = setInterval(countdown, 1000);
}

/* =======================================
            LLAMADAS A FUNCIONES
   =======================================*/
//Se cargan todas las variables que se van a necesitar
getUserData();

//Comprobamos si se ha realizado formulario y, en caso contario, redirigimos a la página
// principal (No se permite comenzar el juego sin la información del usuario)
if (!checkUserData()) {
    location = "index.html";
}
//Rellenamos el formulario
fillUserForm();
//Pintamos el panel de juego
drawPanel();
//Establecemos los eventos para el movimiento del ratón
gameEvents();

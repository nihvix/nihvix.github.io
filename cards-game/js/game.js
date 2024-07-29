/* ============================================================
    JS para el funcionamiento del juego de cartas
   ============================================================*/


/* ===========================================
         INICIALIZACIÓN VARIABLES
==============================================*/

var nCards;
var arrayImg = [];
var item;
var prevItem; //para ir comparando tarjetas
var score = 0;
var cardMatch = [];
var match = false;
//--- Ambas variables dependen del nivel de dificultad del formulario
var visibleTime;
var throwsLeft;

/* ==============================
            FUNCIONES
   ==============================*/
/**
* Función que devuelve un número random entre 0 y max
* @param {int} max 
* @returns 
*/
function getRandomInt(max) {
   return Math.floor(Math.random() * (max - 1) + 1);
}

/**
 * Función para obtener la información del usuario de la parte derecha del menú
 */
function fillUserForm() {
   document.getElementById("nick").value = nick;
   document.getElementById("avatarImg").src = avatarImg; //variable de userData que almacena el avatar
   nCards = size * size;
}

/**
 * Función que establece el tiempo que cada carta permanece visible y el número de tiradas según el nivel de dificultad
 */
function difficultyDetails() {
   let level = difficulty;
   visibleTime = 4 - level;
   throwsLeft = nCards + Math.floor(10 / level);
   document.getElementById("throws").value += throwsLeft;
}

/**
 * Función que rellena un array con números según la cantidad de tarjetas de la partida
 * para seleccionar las imágenes y que sólo se repitan 2 veces max
 */
function fillArrayImg() {
   for (let i = 1; i <= nCards / 2; i++) {
      arrayImg.push(i);
      arrayImg.push(i);
   }
   if (nCards % 2 == 1) //Para tableros impares
      arrayImg.push(13);
}

/**
 * Método que dibuja el panel de juego y crea el array de coincidencias/parejas (match)
 */
function drawPanel() {
   fillArrayImg();
   document.getElementById("game").style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
   document.getElementById("game").style.gridTemplateRows = "repeat(" + size + ", 1fr)";
   let items = "";
   for (let index = 1; index <= nCards; index++) {
      let posArrayImg = getRandomInt(arrayImg.length - 1);
      let cont = arrayImg[posArrayImg];
      items += `<div class="flipCardContainer">
                        <div id="flip${index}" class="flipCard">
                            <div class="flipCardFront">
                                <img src="./img/front.jpg">
                            </div>
                            <div class="flipCardBack">
                                <img id="img${index}" src="./img/image${cont}.png">
                            </div>
                        </div>
                    </div>`;
      arrayImg.splice(posArrayImg, 1);

   }
   document.getElementById("game").innerHTML = items;

   //Para los emparejamientos de cartas
   for (let i = 0; i < nCards; i++) {
      cardMatch.push(false);
   }
}

/**
 * Función que, tras cada tirada, comprueba si la partida ha acabado
 */
function checkFinish() {
   let currentScore = parseInt(document.getElementById("score").value);
   let currentThrows = parseInt(document.getElementById("throws").value);
   if (currentScore == Math.floor(nCards / 2) || currentThrows == 0) {
      finishingGame();
      if(currentScore == Math.floor(nCards / 2)){
         alert("CONGRATULATIONS!! YOU WON!!");
      }
   }
}

/**
 * Función para volver a girar la tarjeta una vez que el tiempo visible se acaba
 * @param {HTML Element} item 
 */
function flipBackAgain(item, pos) {
   if (!cardMatch[pos - 1]) {
      item.classList.remove('is-flipped');
   }
}

/**
 * Función que comienza al hacer click en una imagen
 * @param {Event} event 
 */
function startMarking(event) {
   item = event.currentTarget;
   let pos = parseInt(item.id.substring(item.id.indexOf("p") + 1)); //Eliminar "flip" del id del item
   if (!cardMatch[pos - 1]) {
      item.classList.add('is-flipped');
      if (prevItem != null) {
         //Comparamos las imágenes
         let frontPrev = prevItem.getElementsByTagName("img")[1].src;
         let frontCurrent = item.getElementsByTagName("img")[1].src;
         if (frontPrev == frontCurrent && prevItem.classList.contains('is-flipped')) {
            match = true;
            score++;
            document.getElementById("score").value = score;
         }
         //Si hay coincidencia, las mantenemos hacia arriba y eliminamos el listener para que no se puedan clickar
         if (match) {
            item.classList.add('is-flipped');
            prevItem.classList.add('is-flipped');
            item.removeEventListener('mousedown', startMarking);
            prevItem.removeEventListener('mousedown', startMarking);
            //Añadimos las pos como true al array de coincidencias, para que no gire las cartas de nuevo
            let posPrevItem = prevItem.id.substring(item.id.indexOf("p") + 1);
            cardMatch[pos - 1] = true;
            cardMatch[posPrevItem - 1] = true;

            match = false;
            prevItem = null;
         }
      }
      setTimeout(flipBackAgain, (visibleTime * 1000), item, pos);
      document.getElementById("throws").value = parseInt(document.getElementById("throws").value) - 1;
      checkFinish();
      prevItem = item;
   }
}

/**
 * Función donde se establecen los eventos del juego
 */
function gameEvents() {
   const items = document.getElementsByClassName("flipCard");
   for (let item of items) {
      item.addEventListener('mousedown', startMarking);
   }
}

/**
 * Método que realiza el cambio de pantalla al final de la partida
 */
function finishingGame() {
   //Cambiar z-index de los paneles (pantalla PLAY AGAIN)
   document.getElementById("finishedGame").classList.add("finishedGameColor"); //Añadimos la clase de color para las transiciones de la última pantalla
   document.getElementById("finishedGame").style.zIndex = "2";
   document.getElementById("game").style.zIndex = "1";
   document.getElementById("newGame").addEventListener("click",
      (e) => { location.reload() }); //Se recarga la misma página para empezar una nueva partida

}

/* =======================================
            LLAMADAS A FUNCIONES
   =======================================*/
//Se cargan todas las variables que se van a necesitar
getUserData();

//Comprobamos si se ha realizado formulario y, en caso contario, redirigimos al formulario
//No se permite comenzar el juego sin la información del usuario
if (!checkUserData()) {
   location = "index.html";
}

//Rellenamos la info del usuario
fillUserForm();

//Establecemos detalles según dificultad
difficultyDetails();

//Dibujar tarjetas
drawPanel();

//Eventos del juego
gameEvents();
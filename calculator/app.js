/* ====================
        VARIABLES
   ==================== */
var inputOperation;
var result;
var item;
var text = "";

/* ====================
     FUNCIONES
==================== */
/**
 * Función para añadir el texto del botón a la pantalla
 * @param {Event} event 
 */
function addText(event) {
     item = event.target;
     text += "" + item.innerText;
     inputOperation.placeholder = text;
}

/**
 * Función para añadir el texto del botón a la pantalla
 * Si el último caracter es un signo, se establece el actual en su lugar
 * @param {Event} event 
 */
function addOperation(event) {
     item = event.target;
     let lastChar = text.substring(text.length - 1);
     if (isNaN(lastChar)) {
          backSpace();
     }
     text += "" + item.innerText;
     inputOperation.placeholder = text;
}

/**
 * Función que borra toda la entrada (resetea la calculadora)
 */
function reset() {
     inputOperation.placeholder = 0;
     result.innerText = 0;
     text = "";
     result.style.color = 'whitesmoke';
}

/**
 * Función que da al botón de borrado la funcionalidad de un backspace, para borrar
 * lo último que se haya escrito
 */
function backSpace() {
     text = text.substring(0, text.length - 1);
     inputOperation.placeholder = text;
}

/**
 * Función que calcula el resultado de la operación final de la entrada de datos
 * al pulsar el botón '='
 */
function calculate() {
     let op = inputOperation.placeholder;
     let solution;
     try {
          solution = eval(op);
          inputOperation.placeholder += '=';
          if (solution % 1 > 0) {
               result.innerText = solution.toFixed(2);
          } else {
               result.innerText = solution;
          }
     } catch (err) {
          result.style.color = 'red';
          result.innerText = 'ERROR';
     }
}

/* ========================
     EVENTO PRINCIPAL
   ======================== */
function DOMLoaded() {
     inputOperation = document.getElementById('userInput');
     result = document.getElementById('result');

     //Añadimos el listener a los botones numéricos
     let digitButtons = document.getElementsByClassName('button');
     for (let btn of digitButtons) {
          btn.addEventListener('mousedown', addText);
     }

     //Listener para el botón de reset (AC)
     let acButton = document.getElementById('ac');
     acButton.addEventListener('mousedown', reset);

     //Evento de borrado
     let dltButton = document.getElementById('delete');
     dltButton.addEventListener('mousedown', backSpace);

     //Listener para botones de operación
     let operationButtons = document.getElementsByClassName('buttonOperation');
     for (let opBtn of operationButtons) {
          opBtn.addEventListener('mousedown', addOperation);
     }

     //Evento de cálculo
     let equal = document.getElementById('equal');
     //Le quitamos el evento de añadir el texto, para que no afecte de primeras en la operación al calcular
     equal.removeEventListener('mousedown', addOperation);
     equal.addEventListener('mousedown', calculate);

}
/* ===========================
        LLAMADA PRINCIPAL
   =========================== */
document.addEventListener('DOMContentLoaded', DOMLoaded);

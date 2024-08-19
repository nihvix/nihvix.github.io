/* ====================
        VARIABLES
   ==================== */
var degrees = 6;
var secHand;
var minHand;
var hourHand;

/* ====================
        FUNCIONES
======================= */
/**
 * Función que desarrolla el funcionamiento del reloj analógico
 */
function analogClock() {
    let date = new Date();
    let secs = date.getSeconds() * degrees;
    let mins = date.getMinutes() * degrees;
    let hours = date.getHours() * 30;
    let translation = " translate(-50%, -100%)";
    secHand.style.transform = translation + `rotateZ(${secs}deg) `;
    minHand.style.transform = translation + `rotateZ(${mins}deg) `;
    hourHand.style.transform = translation + `rotateZ(${hours + (mins / 12)}deg) `;
}

/**
 * Función que realiza el cálculo de la hora para el reloj digital
 */
function digitalClock() {
    let digitalTime = document.getElementById("digitalTime");
    let date = new Date();
    let secs = date.getSeconds();
    let mins = date.getMinutes();
    let hours = date.getHours();
    let day_night = 'AM';

    if (hours > 12) {
        day_night = 'PM';
        hours = hours - 12;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (secs < 10) {
        secs = "0" + secs;
    }
    digitalTime.textContent = hours + ":" + mins + ":" + secs + " " + day_night;
}

/* =====================
    EVENTO PRINCIPAL
========================*/
function DOMLoaded() {
    secHand = document.getElementById("secsHand");
    minHand = document.getElementById("minsHand");
    hourHand = document.getElementById("hoursHand");

    setInterval(analogClock, 1000);
    setInterval(digitalClock, 1000);
}

/* =====================
    LLAMADA PRINCIPAL
======================== */
document.addEventListener('DOMContentLoaded', DOMLoaded);
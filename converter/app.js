/*----------------------------------------
            BEHAVIOR OF CONVERTER
  ----------------------------------------*/
/*
Currency: 
EUR= 1,08 DOLLAR
EUR= 1490,89 WON
EUR= 174,20 YEN
*/
/*----- Variables -----*/
const inputEuro = document.getElementById("euro");
const inputCurrency = document.getElementById("selectCurrency");
const outputCurrency = document.getElementById("output");
const convertButton = document.getElementById("convert");
const error = document.getElementById("error");


/*----- Listener -----*/
convertButton.addEventListener('click', convert);

/*----- Functions -----*/
function checkInfo() {
  if (inputEuro.value.length == 0) {
    inputEuro.focus();
    error.innerText = "Amount field cannot be empty";
    return false;
  } else if (isNaN(inputEuro.value)) {
    inputEuro.focus();
    error.innerText = "Amount must be a number";
    return false;
  } else if (parseInt(inputEuro.value) < 0) {
    inputEuro.focus();
    error.innerText = "Amount must be greater than 0";
    return false;
  } else if (inputCurrency.value == "0") {
    inputCurrency.focus();
    error.innerText = "Select a currency";
    return false;
  }
  return true;
}

function convert() {
  if (checkInfo()) {
    let money = parseInt(inputEuro.value);
    switch (inputCurrency.value) {
      case "dol":
        outputCurrency.value = (money * 1.08).toFixed(2) + " $";
        break;
      case "won":
        outputCurrency.value = (money * 1490.89).toFixed(2) + " ₩";
        break;
      case "yen":
        outputCurrency.value = (money * 174.20).toFixed(2) + " ¥";
        break;
      default: break;
    }
  }
}


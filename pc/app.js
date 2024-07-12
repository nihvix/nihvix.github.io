/*========================================
    FUNCIONAMIENTO DE LA APLICACIÓN 
  ========================================*/

/*====================
        VARIABLES  
  ====================*/
//ESTADOS: true->obj activo para moverlo  false->obj en otro lugar
var productsState = []; //Array booleanos para el estado del bloque izq
var cartState = []; //Array booleanos para el estado del bloque derec
var ticketText = []; //Array nombres para el ticket
var prices = []; //Array precios en carrito
var idOnCart = [];
var productMoving;
var ticketList;
var ticketTotal;



/*====================
        FUNCIONES  
  ====================*/
/**
* Función que establece el DRAG para la zona de productos de la izquierda: imagen que se está sosteniendo y su precio
* @param {Event} event 
*/
function productMovingEvent(event) {
    productMoving = event.target;
    console.log("moving");
}

/**
 * Función que actualiza la lista de productos y la cuantía total del ticket según los productos en el carrito
 */
function updateTicket() {
    let sum = 0;
    ticketList.innerText = "";
    for (let i = 0; i < cartState.length; i++) {
        if (cartState[i]) {
            ticketList.innerText += "** " + ticketText[i] + "\n";
            sum += prices[i];
        }
    }
    ticketTotal.innerText = sum;
}

/* ========================
      EVENTO PRINCIPAL  
   ========================*/
document.addEventListener('DOMContentLoaded', (event) => {
    //Información del ticket
    ticketList = document.getElementById("ticketList");
    ticketTotal = document.getElementById("totalPrice");

    //Variable para almacenar productos de la izq
    let draggableItems = document.getElementsByClassName("draggableItem");
    for (let item of draggableItems) {
        productsState.push(true);
        item.addEventListener('dragstart', productMovingEvent);
        item.addEventListener('dragover', e => { e.preventDefault(); });
        item.addEventListener('drop', (event) => {
            let posContainer = parseInt(event.target.id.substring(event.target.id.length - 2));
            let posCart = parseInt(productMoving.id.substring(productMoving.id.length - 1));

            console.log("posContainer: " + posContainer);
            console.log("posCart: " + posCart);
            if (!productsState[posContainer] && posContainer == idOnCart[posCart]) {
                //Actualizamos valores de estado
                productsState[posContainer] = true;
                cartState[posCart] = false;

                //Actualizamos ticket
                updateTicket();

                //Cambiamos la imagen
                event.target.src = productMoving.src;
                productMoving.src = "./img/product.png";

                //Borramos el id del carrito
                idOnCart[posCart] = -1;

                console.log("products state: " + productsState);
            }
        });
    }

    //Variable para almacenar productos de la der
    let cartProducts = document.getElementsByClassName("cartProduct");
    for (let cartItem of cartProducts) {
        cartState.push(false);
        let posCartItem = parseInt(cartItem.id.substring(cartItem.id.length - 1));
        cartItem.addEventListener('dragstart', productMovingEvent)
        cartItem.addEventListener('dragover', e => { e.preventDefault(); });

        cartItem.addEventListener('drop', (event) => {
            let posProduct = parseInt(productMoving.id.substring(productMoving.id.length - 2));

            if (productsState[posProduct] && !cartState[posCartItem]) {
                //Actualizamos valores de estado
                productsState[posProduct] = false;
                cartState[posCartItem] = true;

                //Cogemos la info para el ticket
                ticketText[posCartItem] = productMoving.title;
                let posInit = productMoving.title.indexOf("(");
                let priceTitle = productMoving.title.substring(posInit + 1, productMoving.title.length - 2);
                prices[posCartItem] = parseInt(priceTitle);
                updateTicket();

                //Cambiamos la imagen
                cartItem.src = productMoving.src;
                productMoving.src = "./img/product.png";

                //Añadimos el id del producto moviéndose
                idOnCart[posCartItem] = posProduct;

            }
            console.log("cart: " + cartState);
        });
    }

})
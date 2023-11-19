//DOM Variables
const cartList = document.querySelector("#cart__items");


//Use localStorage as cart variable for easier readability
let cartStoredProduct = Object.keys(sessionStorage);
let cartStoredQtys = Object.values(sessionStorage);
let product ={};
let productID = "";

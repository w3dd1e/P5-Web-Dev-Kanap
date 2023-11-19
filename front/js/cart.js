//DOM Variables
const cartList = document.querySelector("#cart__items");

//Use localStorage as cart variable for easier readability
let cart = sessionStorage
let cartProducts = Object.keys(cart);
let cartQtys = Object.values(cart);

//Product Variables
let product ={};
let productID = "";
let productData = {};

for(let item in cartProducts){
  product = JSON.parse(cartProducts[item]);
  quantity = cartQtys[item];
  productID = product.id;

  //API Data Variables
const productAPI = `http://localhost:3000/api/products/${productID}`;

fetch(productAPI)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to retrieve product data.");
        }
        return response.json();
    })
    
    .then((data) => { 
    productData = data;
   
    let newProductCard = `
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productData.name}</h2>
        <p>${product.color}</p>
        <p>€${productData.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>
    `;

    cartList.insertAdjacentHTML("beforeend", newProductCard);

  })
  .catch((error) => {
      console.error("Error:", error);
  });

};

//DOM Variables
const cartList = document.querySelector("#cart__items");
const cartTotalItems = document.querySelector("#totalQuantity");
const cartTotalPrice = document.querySelector("#totalPrice");

//Use localStorage as cart variable for easier readability
const cartStoredProduct = Object.keys(sessionStorage);
let product ={};
let productID = "";
const cartStoredQtys = Object.values(sessionStorage);
let quantity = "";

//Loop through cart list to display each item on page
for(let item in cartStoredProduct){
  product = JSON.parse(cartStoredProduct[item]);
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

      //This variable must be repeated in this callback to prevent varible from changing on loop before being applied to DOM due to async nature of fetch
      product = JSON.parse(cartStoredProduct[item]);
      quantity = cartStoredQtys[item];
     
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





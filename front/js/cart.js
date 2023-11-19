//DOM Variables
const cartList = document.querySelector("#cart__items");


//Use localStorage as cart variable for easier readability
let cartStoredProduct = Object.keys(sessionStorage);
let cartStoredQtys = Object.values(sessionStorage);
let product ={};
let productID = "";



    let newProductCard = `
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${productData[product.id].imageUrl}" alt="${productData[product.id].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Name of the product</h2>
        <p>Green</p>
        <p>€42.00</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Quantity : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
        </div>
      </div>
    </div>
  </article>
    `;

    cartList.insertAdjacentHTML("beforeend", newProductCard);
};







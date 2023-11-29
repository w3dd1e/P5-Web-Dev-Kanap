//DOM Variables
const cartList = document.querySelector("#cart__items");

//Storage Variables
const cart = sessionStorage;
const savedProducts = Object.keys(sessionStorage);
const savedQtys = Object.values(sessionStorage);

//Product Variables
let productPrices = {};
let totalItems = 0;
let totalPrice = 0;

//Function to set element values
function setElement(selector, value) {
    const element = document.querySelector(selector);
    element.textContent = value;
}

//Fetch product data from API
async function fetchProducts(productID) {
    const response = await fetch(
        `http://localhost:3000/api/products/${productID}`
    );
    const data = await response.json();
    return data;
}

//Loop through cart list to display each item on page
for (let item in savedProducts) {
    const productID = JSON.parse(savedProducts[item]);
    fetchProducts(productID.id).then((data) => {
        // Calculate quantities and total price per product
        productPrices[data._id] = data.price;
        let quantity = savedQtys[item];
        const itemPrice = data.price * quantity;

        // Create and insert HTML for each item in cart
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart__item");
        cartItem.innerHTML = `<article class="cart__item" data-id="${data._id}" data-color="${productID.color}">
          <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${productID.color}</p>
              <p>€${data.price}</p>
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
        </article>`;
        cartList.appendChild(cartItem);

        // Update total items and total price
        totalItems += Number(quantity);
        totalPrice += itemPrice;
        setElement("#totalQuantity", totalItems);
        setElement("#totalPrice", `${totalPrice.toFixed(2)}`);
    });
}

//Update cart on input changes
cartList.addEventListener("change", (event) => {
    if (event.target.classList.contains("itemQuantity")) {
        alert("Quantity changed");

        //Product Variables from DOM
        let currentQtys = document.querySelectorAll(".itemQuantity");
        let product = event.target.closest("article");
        let price = product.querySelector(
            ".cart__item__content__description p:nth-child(3)"
        ).textContent;
        let quantity = event.target.value;
        let colorOption = product.dataset.color;
        let productID = product.dataset.id;

        //Update stored cart quantities
        let item = { id: productID, color: colorOption };
        let cartItem = JSON.stringify(item);
        cart[cartItem] = quantity;

        //Get current quantity values from DOM
        let values = Object.values(currentQtys);

        //Calculate new totals and insert in DOM
        totalItems = 0;
        totalPrice = 0;
        for (let input in values) {
            let quantity = values[input].value;
            totalItems += Number(quantity);
            setElement("#totalQuantity", totalItems);

            let priceElement = values[input]
                .closest("article")
                .querySelector(
                    ".cart__item__content__description p:nth-child(3)"
                );
            let price = priceElement.textContent;
            let itemPrice = Number(price.replace("€", "")) * Number(quantity);
            totalPrice += itemPrice;
            setElement("#totalPrice", `${totalPrice.toFixed(2)}`);
        }
    }
});

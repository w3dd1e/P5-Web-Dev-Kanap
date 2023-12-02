//DOM Variables
const cartList = document.querySelector("#cart__items");

//Storage Variables
const cart = sessionStorage;
const savedProducts = Object.keys(sessionStorage);
const savedQtys = Object.values(sessionStorage);

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

//Calculate new totals and insert in DOM
function updateTotals() {
    totalItems = 0;
    totalPrice = 0;
    let currentQtys = document.querySelectorAll(".itemQuantity");
    let values = Object.values(currentQtys);

    for (let input in values) {
        if (cart.length > 0) {
            let quantity = values[input].value;
            totalItems += Number(quantity);

            let priceElement = values[input]
                .closest("article")
                .querySelector(
                    ".cart__item__content__description p:nth-child(3)"
                );
            let price = priceElement.textContent;
            let itemPrice = Number(price.replace("€", "")) * Number(quantity);
            totalPrice += itemPrice;
        }

        setElement("#totalQuantity", totalItems);
        setElement("#totalPrice", `${totalPrice.toFixed(2)}`);
    }
}

//Loop through cart list to display each item on page
for (let item in savedProducts) {
    const productID = JSON.parse(savedProducts[item]);
    fetchProducts(productID.id).then((data) => {
        // Calculate quantities and total price per product
        let quantity = savedQtys[item];

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

        updateTotals();
    });
}

//Update cart on input changes
cartList.addEventListener("change", (event) => {
    if (event.target.classList.contains("itemQuantity")) {
        //Product Variables from DOM
        let product = event.target.closest("article");
        let quantity = event.target.value;
        let colorOption = product.dataset.color;
        let productID = product.dataset.id;

        //Update stored cart quantities
        let item = { id: productID, color: colorOption };
        let cartItem = JSON.stringify(item);
        cart[cartItem] = quantity;

        updateTotals();
    }
});
//

cartList.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteItem")) {
        //Product Variables from DOM
        let product = event.target.closest("article");
        let colorOption = product.dataset.color;
        let productID = product.dataset.id;

        //Update stored cart quantities
        let item = { id: productID, color: colorOption };
        let cartItem = JSON.stringify(item);
        delete cart[cartItem];

        //Remove item from DOM
        product.remove();

        updateTotals();
    }
});

//Exisiting DOM elements
const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
const productID = urlParams.get("id");
const productAPI = `http://localhost:3000/api/products/${productID}`;

const imageContainer = document.querySelector(".item__img");
const productColors = document.querySelector("#colors");

const colorSelect = document.querySelector("#colors");
const quantitySelect = document.querySelector("#quantity");
const addToCart = document.querySelector("#addToCart");

//Form value variables
let colorOption = colorSelect.value;
let quantity = quantitySelect.value;
let item = {
    id: productID,
   color: colorOption,
};

//Use localStorage as cart variable for easier readability
let cart = sessionStorage;
    

//Fetch Data from API then update page with returned data
fetch(productAPI)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to retrieve product data.");
        }
        return response.json();
    })
    .then((productData) => {
        // Function to insert product data into page by each element selector
        function setElement(selector, attribute, value) {
            const element = document.querySelector(selector);
            if (attribute === "textContent") {
                element.textContent = value;
            } else {
                element.setAttribute(attribute, value);
            }
        }
        // Update page title
        document.title = productData.name;

        // Insert product name, price, and description
        setElement("#title", "textContent", productData.name);
        setElement("#price", "textContent", productData.price);
        setElement("#description", "textContent", productData.description);

        // Insert product image into DOM
        let productImage = document.createElement("img");
        imageContainer.append(productImage);
        setElement(".item__img img", "src", productData.imageUrl);
        setElement(".item__img img", "alt", productData.altTxt);

        // Insert product color options
        for (let colorOption of productData.colors) {
            let newOption = document.createElement("option");
            newOption.value = colorOption;
            newOption.textContent = colorOption;
            productColors.append(newOption);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });


 //Get color and quantiy from form then udpate cartItem object values
 colorSelect.addEventListener("change", (event) => {
    colorOption = event.target.value;
    item.color = colorOption;
});
quantitySelect.addEventListener("change", (event) => {
    quantity = event.target.value;});

    
    //Add item to cart 
addToCart.addEventListener("click", (event) => {
    let cartItem = JSON.stringify(item);

    if (colorOption===""||quantity==="0") {
        alert("Please select a color and quantity.");
    }
    //cartItem does not work with Number(), will return NaN
    else if (cart.hasOwnProperty(cartItem)) {
       cart[cartItem] =  Number(cart[JSON.stringify(item)]) + Number(quantity);
       alert("Items added to cart!");
        }
    else {
    cart.setItem(cartItem, quantity)
    alert("Item added to cart!");
}});


   //Test Button click output
    addToCart.addEventListener("click", (event) => {console.log(cart);});

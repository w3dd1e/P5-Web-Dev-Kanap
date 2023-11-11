//GET product data from API URL
const productAPI = "http://localhost:3000/api/products";

fetch(productAPI)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to retrieve product data.");
        }
        return response.json();
    })
    .then((productData) => {
        // Get URL from current page
        const url = new URL(window.location.href);

        //Get product ID from URL
        const urlParams = new URLSearchParams(url.search);
        const productID = urlParams.get("id");
        console.log(productID);

        //Update page title
        document.title = `${productData[productID].name}`;

        //Insert image into DOM
        const productImage = document.querySelector(".item__img");
        let newImg = document.createElement("img");
        productImage.append(newImg);
        newImg.setAttribute("src", productData[productID].imageUrl);
        newImg.setAttribute("alt", productData[productID].altTxt);

        //Insert product name
        const productName = document.querySelector("#title");
        productName.innerHTML = `${productData[productID].name}`;

        //Insert product price
        const productPrice = document.querySelector("#price");
        productPrice.innerHTML = `${productData[productID].price}`;

        //Insert product description
        const productDesc = document.querySelector("#description");
        productDesc.innerHTML = `${productData[productID].description}`;
    })
    .catch((error) => {
        console.error("Error:", error);
    });

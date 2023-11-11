// Get URL from current page
const url = new URL(window.location.href);
//Get product ID from URL
const urlParams = new URLSearchParams(url.search);
const productID = urlParams.get("id");

//GET product data from API URL
const productAPI = `http://localhost:3000/api/products/${productID}`;

fetch(productAPI)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to retrieve product data.");
        }
        return response.json();
    })
    .then((productData) => {
        //Update page title
        document.title = `${productData.name}`;

        //Insert image into DOM
        const productImage = document.querySelector(".item__img");
        let newImg = document.createElement("img");
        productImage.append(newImg);
        newImg.setAttribute("src", productData.imageUrl);
        newImg.setAttribute("alt", productData.altTxt);

        //Insert product name
        const productName = document.querySelector("#title");
        productName.innerHTML = `${productData.name}`;

        //Insert product price
        const productPrice = document.querySelector("#price");
        productPrice.innerHTML = `${productData.price}`;

        //Insert product description
        const productDesc = document.querySelector("#description");
        productDesc.innerHTML = `${productData.description}`;

        //Insert product color options
        const productColors = document.querySelector("#colors");
        for (let colorID in productData.colors) {
            let newOptions = document.createElement("option");
            productColors.append(newOptions);
            newOptions.setAttribute("value", productData.colors[colorID]);
            newOptions.textContent = productData.colors[colorID];
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

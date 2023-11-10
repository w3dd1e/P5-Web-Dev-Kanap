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
        // Get URL from current product page
        const url = window.location.href;
        // Extract product ID from URL
        function getID() {
            return url.slice(-1);
        }
        let productID = getID();

        //Update title
        document.title = `${productData[productID].name}`;

        //Insert image into DOM
        let productImage = document.querySelector(".item__img");
        let newImg = document.createElement("img");
        productImage.append(newImg);
        newImg.setAttribute("src", productData[productID].imageUrl);
        newImg.setAttribute("alt", productData[productID].altTxt);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

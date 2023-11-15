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

        // Insert product name
        setElement("#title", "textContent", productData.name);

        // Insert product price
        setElement("#price", "textContent", productData.price);

        // Insert product description
        setElement("#description", "textContent", productData.description);

        // Insert product image into DOM
        const imageContainer = document.querySelector(".item__img");
        let productImage = document.createElement("img");
        imageContainer.append(productImage);
        setElement(".item__img img", "src", productData.imageUrl);
        setElement(".item__img img", "alt", productData.altTxt);

        // Insert product color options
        const productColors = document.querySelector("#colors");
        for (let color of productData.colors) {
            let newOption = document.createElement("option");
            newOption.value = color;
            newOption.textContent = color;
            productColors.append(newOption);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

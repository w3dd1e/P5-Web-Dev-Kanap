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
        //Create product elements in DOM from API data
        //Loop through each object in JSON array and create corresponding elements in item list

        for (let dataItem in productData) {
            let itemsList = document.querySelector("#items");

            const productID = productData[dataItem]._id;

            let newProductCard = `
                <a href="./product.html?id=${productID}">
                    <article>
                        <img src="${productData[dataItem].imageUrl}" alt="${productData[dataItem].altTxt}">
                        <h3 class="productName">${productData[dataItem].name}</h3>
                        <p class="productDescription">${productData[dataItem].description}</p>
                    </article>
                </a>
            `;

            itemsList.insertAdjacentHTML("beforeend", newProductCard);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

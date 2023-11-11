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

            let newProductCard = document.createElement("a");
            let newArticle = document.createElement("article");
            let newImg = document.createElement("img");
            let newH3 = document.createElement("h3");
            let newP = document.createElement("p");

            newH3.className = "productName";
            newP.className = "productDescription";

            itemsList.append(newProductCard);
            newProductCard.append(newArticle);
            newArticle.append(newImg, newH3, newP);

            const productID = productData[dataItem]._id;

            newProductCard.setAttribute(
                "href",
                `./product.html?id=${productID}`
            );
            newImg.setAttribute("src", productData[dataItem].imageUrl);
            newImg.setAttribute("alt", productData[dataItem].altTxt);
            newH3.textContent = productData[dataItem].name;
            newP.textContent = productData[dataItem].description;
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

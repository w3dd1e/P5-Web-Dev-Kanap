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

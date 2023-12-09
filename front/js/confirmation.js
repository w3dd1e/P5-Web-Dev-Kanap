//Get Order ID from URL
const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
const orderID = urlParams.get("orderId");

//Display Order ID on page
document.getElementById("orderId").textContent = `${orderID}`;

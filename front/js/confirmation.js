const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
const orderID = urlParams.get("orderId");

document.getElementById("orderId").textContent = `${orderID}`;

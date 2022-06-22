const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");

const displayOrderId = document.getElementById("orderId");
displayOrderId.innerHTML = orderId;

localStorage.clear();

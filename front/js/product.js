// get id from the url
function getUrl() {
  const url = new URL(window.location.href);
  const idProduct = url.searchParams.get("id");
  return idProduct;
}

//displays product details
async function getProduct() {
  const idProduct = getUrl();
  let response = await fetch(`http://localhost:3000/api/products/${idProduct}`);
  if (response.ok) {
    let dataProduct = await response.json();

    document.querySelector("#title").innerHTML = dataProduct.name;
    document.querySelector("#description").innerHTML = dataProduct.description;
    document.querySelector("#price").innerHTML = dataProduct.price;

    const productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = dataProduct.imageUrl;
    productImg.alt = dataProduct.altTxt;

    //color choice
    for (colors of dataProduct.colors) {
      let colorChoice = document.createElement("option");
      document.querySelector("#colors").appendChild(colorChoice);
      colorChoice.value = colors;
      colorChoice.innerHTML = colors;
    }
  } else {
    alert("Une erreur: " + response.status + " est sur venue");
  }
}
getProduct();

//display product
function getBasket() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

//save basket in the localstorage
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

//add product to the basket
function addBasket(product) {
  const addToCart = document.querySelector("#addToCart");
  const quantityChoice = document.querySelector("#quantity");
  const colorChoice = document.querySelector("#colors");
  addToCart.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      quantityChoice.value > 0 &&
      quantityChoice.value <= 100 &&
      quantityChoice.value != 0 &&
      colorChoice.value != ""
    ) {
      product = {
        id: getUrl(),
        title: document.querySelector("#title").innerHTML,
        price: document.querySelector("#price").innerHTML,
        description: document.querySelector("#description").innerHTML,
        color: document.querySelector("#colors").value,
        quantity: document.querySelector("#quantity").value,
        image: document.querySelector(".item__img img").src,
        imageAlt: document.querySelector(".item__img img").alt,
      };
      let basket = getBasket();
      let foundProduct = basket.find(
        (newProduct) =>
          newProduct.id === product.id && newProduct.color === product.color
      );
      if (foundProduct != undefined) {
        foundProduct.quantity++;
        foundProduct.color;
      } else {
        basket.push(product);
      }
      saveBasket(basket);
      location.href = "cart.html";
    } else {
      alert("veuillez choisir une quantité et une couleur");
    }
  });
}
addBasket();

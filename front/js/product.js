const url = new URL(window.location.href);
const idProduct = url.searchParams.get("id");

function displayProduct() {
  fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Une errur " + res.status + " est survenue");
      }
    })
    .then((data) => {
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src = "${data.imageUrl}" alt="${data.altTxt}">`;

      let title = document.getElementById("title");
      title.innerHTML = `${data.name}`;

      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;

      let description = document.getElementById("description");
      description.innerHTML = `${data.description}`;

      for (color of data.colors) {
        const colorChoice = document.createElement("option");
        colorChoice.value = color;
        colorChoice.textContent = color;
        document.getElementById("colors").appendChild(colorChoice);
      }
    });
}
displayProduct();

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
    if (quantityChoice.value <= 0 || quantityChoice.value > 100) {
      alert("Choisissez une quantité comprise entre 1 et 100");
    } else if (quantityChoice.value > 0 && colorChoice.value == "") {
      alert("Choisissez une couleur");
    } else {
      product = {
        id: idProduct,
        title: document.querySelector("#title").innerHTML,
        description: document.querySelector("#description").innerHTML,
        color: document.querySelector("#colors").value,
        quantity: document.querySelector("#quantity").value,
        image: document.querySelector(".item__img img").src,
        imageAlt: document.querySelector(".item__img img").alt,
      };

      console.log(product);

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
    }
  });
}
addBasket();

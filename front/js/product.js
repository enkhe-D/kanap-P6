const url = new URL(window.location.href);
const idProduct = url.searchParams.get("id");

const dataApi = fetch(`http://localhost:3000/api/products/${idProduct}`);
dataApi
  .then(async (resData) => {
    //console.log(resData);

    const response = await resData.json();
    console.log(response);

    try {
      // const id = response._id;
      const title = response.name;
      const price = response.price;
      const img = response.imageUrl;
      const txtAlt = response.altTxt;
      const description = response.description;
      let color = response.colors;

      // console.log(id);
      console.log(title);
      console.log(img);
      console.log(txtAlt);
      console.log(price);
      console.log(description);

      //dom

      const affichage_title = document.getElementById("title");
      const affichage_price = document.getElementById("price");
      const affichage_img = document.querySelector(".item__img");
      const affichage_description = document.getElementById("description");
      for (color of response.colors) {
        const colorChoice = document.createElement("option");
        colorChoice.value = color;
        colorChoice.textContent = color;
        document.getElementById("colors").appendChild(colorChoice);
      }

      affichage_title.innerHTML = title;
      affichage_price.innerHTML = price;
      affichage_description.innerHTML = description;
      affichage_img.innerHTML = img;

      affichage_img.innerHTML = `<img src='${img}' alt='${txtAlt}'>`;

      // .innerHTML =
      //         title);
      // const image =

      // const textAlt = response.altTxt;
    } catch (err) {
      console.log(err);
    }
  })
  .catch((err) => {
    console.log(err);
  });

// function displayProduct() {
//   fetch(`http://localhost:3000/api/products/${idProduct}`)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("Une errur " + res.status + " est survenue");
//       }
//     })
//     .then((data) => {
//       let img = document.querySelector(".item__img");
//       let title = document.getElementById("title");
//       let price = document.getElementById("price");
//       let description = document.getElementById("description");

//       img.innerHTML = `<img src = "${data.imageUrl}" alt="${data.altTxt}">`;
//       title.innerHTML = `${data.name}`;
//       price.innerHTML = `${data.price}`;
//       description.innerHTML = `${data.description}`;

// for (color of data.colors) {
//   const colorChoice = document.createElement("option");
//   colorChoice.value = color;
//   colorChoice.textContent = color;
//   document.getElementById("colors").appendChild(colorChoice);
//       }
//     });
// }
// displayProduct();

// function product() {}

//display product
function getBasket() {
  return JSON.parse(localStorage.getItem("basket")) || [];
}

function getPrice() {
  let url = `http://localhost:3000/api/products/${idProduct}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.price);
      console.log((document.querySelector("p").innerHTML = data.price));
    });
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
        id: idProduct,
        title: document.querySelector("#title").innerHTML,
        description: document.querySelector("#description").innerHTML,
        price: getPrice(),
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
        saveBasket(basket);
      }
      //location.href = "cart.html";
    } else {
      alert("veuillez choisir une quantité et une couleur");
    }
  });
}
addBasket();

//save basket in the localstorage
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

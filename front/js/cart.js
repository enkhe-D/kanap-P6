// display selected product
let basket = JSON.parse(localStorage.getItem("basket")) || [];

basket.forEach((product) => {
  document.querySelector("#cart__items").insertAdjacentHTML(
    "beforeend",
    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.image}" alt="${product.imageAlt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.title}</h2>
          <p>${product.color}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
  );
});

//function for changing quantity
function changeQuantity() {
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  for (let i = 0; i < basket.length; i++) {
    itemQuantity[i].addEventListener("change", () => {
      basket[i].quantity = itemQuantity[i].value;
      if (
        basket[i].quantity <= 0 ||
        basket[i].quantity > 100 ||
        basket[i] === null
      ) {
        alert("choisissez une quantitée entre 1 et 100");
      } else {
        localStorage.setItem("basket", JSON.stringify(basket));
        totalProduct();
      }
    });
  }
}
changeQuantity();

//function for getting total price
function totalProduct() {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (product in basket) {
    totalQuantity += parseInt(basket[product].quantity);
    totalPrice += basket[product].price * basket[product].quantity;
  }
  document.querySelector("#totalQuantity").innerHTML = totalQuantity;
  document.querySelector("#totalPrice").innerHTML = totalPrice;
}
totalProduct();

//function for remove product
function removeBasket() {
  let deleteItem = document.querySelectorAll(".deleteItem");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () => {
      if (confirm("voulez vous supprimer : " + basket[i].title)) {
        basket.splice([i], 1);
        document.querySelector(".cart__item").style.display = "none";
        localStorage.setItem("basket", JSON.stringify(basket));
        location.reload();
      }
    });
  }
}
removeBasket();

// display msg if product cart is empty
function displayProduct() {
  let emptyCart = document.querySelector("#cart__items");
  if (basket == 0 || basket === null) {
    emptyCart.innerHTML = "<h2> votre panier est vide</h2>";
  }
}
displayProduct();

//***************** FORMULAIRE *****************

function sendFormulaire() {
  let submitOrder = document.querySelector("#order");
  submitOrder.addEventListener("click", (event) => {
    event.preventDefault();

    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };

    //creation reg exp for validation FirstName field
    function validFirstName() {
      const firstName = contact.firstName;
      let firstNameRegExp = /^[a-zA-Z\s-]{2,25}$/gi; // a modifer

      if (firstNameRegExp.test(firstName)) {
        return true;
      } else {
        document.querySelector("#firstNameErrorMsg").innerHTML =
          "Le prenom doit comporter au minimum 2 lettres et ne doit pas comporter de chiffre ni de charactere special excepté les espaces et les trait d'union (-)";
        return false;
      }
    }

    //creation reg exp for validation LastName field
    function validLastName() {
      const lastName = contact.lastName;
      let lastNameRegExp = /^[a-zA-Zé-É\s-]{2,25}$/gi; // a modifier

      if (lastNameRegExp.test(lastName)) {
        return true;
      } else {
        document.querySelector("#lastNameErrorMsg").innerHTML =
          "Le nom doit comporter au minimum 2 lettres et ne doit pas comporter de chiffre ni de charactere special excepté les espaces et les trait d'union (-)";
      }
    }

    //creation reg exp for validation Address field
    function validAddress() {
      const address = contact.address;
      let addressRegExp = /^[a-zA-Z\d\s,-]+$/gi; // a modifer

      if (addressRegExp.test(address)) {
        return true;
      } else {
        document.querySelector("#addressErrorMsg").innerHTML =
          "Votre adresse n est pas valide";
      }
    }

    //creation reg exp for validation City field
    function validCity() {
      const city = contact.city;
      let cityRegExp = /^[a-zA-Z\d\s-]+$/gi; // a modifier

      if (cityRegExp.test(city)) {
        return true;
      } else {
        document.querySelector("#cityErrorMsg").innerHTML = "pas valid";
      }
    }

    //creation reg exp for validation Email field
    function validEmail() {
      const email = contact.email;
      let emailRegExp = /^[a-zA-Z-\d._]+[@]{1}[a-zA-Z]+[.]{1}[a-z]{1,26}$/gi;

      if (emailRegExp.test(email)) {
        return true;
      } else {
        document.querySelector("#emailErrorMsg").innerHTML =
          "Adresse Non Valid";
      }
    }

    function validForm() {
      if (
        validFirstName() === true &&
        validLastName() === true &&
        validAddress() === true &&
        validCity() === true &&
        validEmail() === true
      ) {
        localStorage.setItem("contact", JSON.stringify(contact));
        return true;
      } else {
        alert("formulaire mal renseigné");
        event.preventDefault();
      }
    }

    if (validForm() === true) {
      const products = [];
      for (let i = 0; i < products.length; i++) {
        products.push(products[i].idProduct);
      }

      const dataOrder = {
        products,
        contact,
      };

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataOrder),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("orderId", data.orderId);
          location.href = "confirmation.html";
        })
        .catch((error) => console.log(error));
    } else {
      event.preventDefault();
    }
  });
}
sendFormulaire();

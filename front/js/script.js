//get data api

const url = "http://localhost:3000/api/products";

async function getArticles() {
  const requete = await fetch(url);

  if (!requete.ok) {
    alert("Une erreur est survenu.");
  } else {
    let data = await requete.json();
    for (let i = 0; i < data.length; i++) {
      let id = data[i]["_id"];
      let img = data[i]["imageUrl"];
      let alt = data[i]["altTxt"];
      let name = data[i]["name"];
      let description = data[i]["description"];

      document.querySelector(
        "#items"
      ).innerHTML += `<a href="./product.html?id=${id}">
                                                        <article>
                                                        <img src="${img}" alt="${alt}"/>
                                                        <h3 class="productName">${name}</h3>
                                                        <p class="productDescription">${description}</p>
                                                        </article>
                                                        </a>`;
    }
  }
}
getArticles();

//get data api

const url = "http://localhost:3000/api/products";

async function getArticles() {
  const requete = await fetch(url);
  console.log(requete);
  if (requete.ok) {
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
  } else {
    alert("Une erreur est survenu.");
  }
}
getArticles();
///////////////////////////TESTE///////////////////////////////////////////////////////////
// const article = document.createElement("article");
// article.innerHTML = "<article></article>";
// document.querySelector("#items").appendChild(article);
// console.log(article);

// const affichage_title = document.createElement("h3");
// affichage_title.classList.add("productName");
// document.querySelector("article").appendChild(affichage_title);
// console.log(affichage_title);

// const affichage_description = document.createElement("p");
// affichage_description.classList.add("productDescription");
// document.querySelector("article").appendChild(affichage_description);
// console.log(affichage_description);

// const promise = fetch("http://localhost:3000/api/products");

// promise
//   .then(async (response) => {
//     console.log("/////////////response//////////////");
//     console.log(response);

//     try {
//       const product = await response.json();

//       console.log("/////product////////////////");
//       console.log(product[0]);

//       const title = product[0].name;
//       const description = product[0].description;
//       //const price = product[0].price;
//       //const color = product[0].colors[0];
//       // const imgSrc = product[0].imageUrl;
//       // const imgAlt = product[0].altTxt;

//       affichage_title.innerHTML = title;
//       affichage_description.innerHTML = description;

//       // const affichage_img = document.createElement("img");
//       // affichage_img.innerHTML = imgSrc; //`<img src='${}' alt='${}'>`;
//       // document.querySelector("article").appendChild(affichage_img);
//       // console.log("image");
//       // console.log(affichage_img);
//     } catch (err) {
//       console.log(err);
//     }
//   })
//   .catch((err) => console.log(err));

// // const affichage_img = document.createElement("img");
// // affichage_img.innerHTML = "<img src='' alt=''>";
// // document.querySelector("article").appendChild(affichage_img);
// // console.log(affichage_img);

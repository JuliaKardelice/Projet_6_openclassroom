const sectionFiltres=document.createElement("div");
const sectionGallery=document.querySelector(".gallery");

console.log(sectionGallery);
sectionFiltres.className=("filtres");

sectionGallery.insertAdjacentElement("beforebegin",sectionFiltres);

let i=0
for (i = 0; i < 4; i++) {
  let btnFiltre = document.createElement('button');
  btnFiltre.className = "btnFiltre";
  btnFiltre.id = "btnFiltre"+i;
 sectionFiltres.appendChild(btnFiltre);
}

let filterAll=document.getElementById("btnFiltre0");
const filterObjet=document.getElementById("btnFiltre1");
const filterAppartement=document.getElementById("btnFiltre2");
const filterHotel=document.getElementById("btnFiltre3");
filterAll.innerText="Tous";
filterObjet.innerText= "Objets";
filterAppartement.innerText= "Appartement";
filterHotel.innerText="Hôtels et Restaurants";

const filterList=document.querySelectorAll(".filtres button");
console.log(filterList);
///Pourquoi le tooggle ne marche t il pas ?

filterAll.addEventListener('click',()=>{
  filterAll.classList.toggle("btnFiltre_survol");
});


filterObjet.addEventListener('click',()=>{
  filterObjet.classList.toggle("btnFiltre_survol");
});
filterAppartement.addEventListener('click',()=>{
  filterAppartement.classList.toggle("btnFiltre_survol");
});
filterHotel.addEventListener('click',()=>{
  filterHotel.classList.toggle("btnFiltre_survol");
});



/******************* */

const figurePhoto =document.createElement("figure");
const descriptionPhoto=document.createElement("figcaption");

sectionGallery.appendChild(figurePhoto);
figurePhoto.appendChild(descriptionPhoto);

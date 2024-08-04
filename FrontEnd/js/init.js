const filtres = document.querySelector('.filtres')
const sectionGallery = document.querySelector(".gallery");

// Travaux

async function showWorks(){
  const response = await fetch('http://localhost:5678/api/works');
  const works = await response.json();

  works.forEach(work => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = work.imageUrl;
    img.alt = work.title;

    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    sectionGallery.appendChild(figure);
  });
}

// Filtres
async function showCategories(){
  const response = await fetch('http://localhost:5678/api/categories');
  const categories = await response.json();

  const btnAll = document.createElement('button');
  btnAll.classList.add('btnAll');
  btnAll.innerText = "Tous";
  
  btnAll.addEventListener('click', async (e) => {
    e.preventDefault();
    sectionGallery.innerHTML = '';
    showWorks(); // Afficher tous les travaux
  });

  filtres.appendChild(btnAll);

  categories.forEach(categorie => {
    const button = document.createElement('button');
    button.classList.add('btnFiltre');
    button.setAttribute('data-id', categorie.id);
    button.innerText = categorie.name;

    button.addEventListener('click', async () => {
      filterdWorksByCategory(categorie.id); // Afficher les travaux filtrés par catégorie
    });

    filtres.appendChild(button);
  });
}

// Fonction de filtrage
async function filterdWorksByCategory(categoryId) {
  const response = await fetch('http://localhost:5678/api/works');
  const works = await response.json();

  sectionGallery.innerHTML = ''; // Vider la galerie avant de la remplir à nouveau

  const filterdWorksByCategory = categoryId ? works.filter(work => work.categoryId === categoryId) : works;

  filterdWorksByCategory.forEach(work => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = work.imageUrl;
    img.alt = work.title;

    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    sectionGallery.appendChild(figure);
  });
}

// Afficher les travaux et les filtres au chargement de la page
showWorks();
/*
async function log(){
const logIn=document.getElementById(".login");
if connection
add event listenner sur logout qui retire le token du lodal storage

*/

async function checkConnection(){
const admin = document.querySelector('.admin');

if(localStorage.getItem('token')){
  console.log("je suis connectée");
  admin.innerHTML = "<button>Modifier</button"; 

  /// Pourquoi pas de balise fermante ?
  
} else {
  showCategories();
  console.log("je suis deconnectée");



};

}

checkConnection();
///Se deconnecter
///supprimer le token du localstorage
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click",() =>{
  window.localStorage.removeItem("token");
  window.location.href = "/FrontEnd/index.html";
});
















/*///effet ?
  btnAll.addEventListener("mouseenter",()=>{
  btnAll.classList.toggle('btnFiltre_survol');
  btnAll.addEventListener("mouseleave",()=>{
  btnAll.classList.toggle('btnFiltre_survol');
  });

     button.addEventListener("mouseenter",()=>{
    button.classList.toggle('btnFiltre_survol');   
    button.addEventListener("mouseleave",()=>{
  button.classList.toggle('btnFiltre_survol');
   
  */

  

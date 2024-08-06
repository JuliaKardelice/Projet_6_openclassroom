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
    btnAll.classList.toggle('btnFiltre_survol');
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
      button.classList.toggle('btnFiltre_survol');
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
if connection
add event listenner sur logout qui retire le token du lodal storage
*/
const logIn=document.getElementById("login");
const logOut = document.getElementById("logout");
logOut.addEventListener("click",() =>{
  window.localStorage.removeItem("token");
  window.location.href = "/FrontEnd/index.html";
});

const logoutBtn = document.getElementById("logout");

///faire disparaitre le login ???


const admin = document.querySelector('.admin');
const mesProjets = document.querySelector('#portfolio .project');


async function checkConnection(){
if(localStorage.getItem('token')){
  console.log("je suis connectée");
  logIn.style.display = "none";  
  mesProjets.insertAdjacentHTML("afterend", "<button> <i class=\"fas fa-pen-to-square\"></i>  modifier</button");
  admin.innerHTML="<button  class=\"editMode\">  <i class=\"fas fa-pen-to-square\"></i> modifier</button";
  admin.classList.add("blackLineEdition");
  const btnModal=document.querySelector(" .admin .editMode");
  btnModal.addEventListener('click', ()=>{
  console.log("ouvrons la modale");
  openModal();
  } )


  
} 



else {
  showCategories();
  logOut.style.display = "none";
  console.log("je suis deconnectée");
  admin.style.display = "none";


};

}





checkConnection();
///Se deconnecter
///supprimer le token du localstorage























/*///effet ?
  btnAll.addEventListener("mouseenter",()=>{
  btnAll.classList.toggle('btnFiltre_survol')});
  btnAll.addEventListener("mouseleave",()=>{
  btnAll.classList.toggle('btnFiltre_survol');
  });

     button.addEventListener("mouseenter",()=>{
    button.classList.toggle('btnFiltre_survol');   
    button.addEventListener("mouseleave",()=>{
  button.classList.toggle('btnFiltre_survol');
   
  */

  

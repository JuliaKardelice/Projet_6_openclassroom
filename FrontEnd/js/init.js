const filtres = document.querySelector('.filtres')
const sectionGallery = document.querySelector(".gallery");
const galleryModal = document.querySelector('.gallery-modal');

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

 

  };




// Filtres
async function showCategories(){
  const response = await fetch('http://localhost:5678/api/categories');
  const categories = await response.json();

  const removeActiveClass = () => {
    document.querySelectorAll('.btnFiltre_survol').forEach(btn => btn.classList.remove('btnFiltre_survol'));
  };

  const btnAll = document.createElement('button');
  btnAll.classList.add('btnAll', 'btnFiltre');
  btnAll.innerText = "Tous";

  btnAll.addEventListener('click', async (e) => {
    //btnAll.classList.toggle('btnFiltre_survol');
    removeActiveClass();
    btnAll.classList.add('btnFiltre_survol');
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
      removeActiveClass();
      button.classList.add('btnFiltre_survol'); // On ajoute la classe sur le bouton cliqué
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

const admin = document.querySelector('.admin');
const mesProjets = document.querySelector('#portfolio .project');
const logIn=document.getElementById("login");
const logOut = document.getElementById("logout");

logOut.addEventListener("click",() =>{
  window.localStorage.removeItem("token");
  window.location.href = "/FrontEnd/index.html";
});

async function checkConnection(token){
if(localStorage.getItem('token')){
  console.log("je suis connectée");
  logIn.style.display = "none";  
  admin.innerHTML="<button class=\"editMode\">  <i class=\"fas fa-pen-to-square\"></i> modifier</button";
  admin.classList.add("blackLineEdition");
  mesProjets.insertAdjacentHTML("afterend", "<button class=\"editMode\"> <i class=\"fas fa-pen-to-square\"></i>  modifier</button");
  const btnModal=document.querySelector("#portfolio .editMode");
  btnModal.addEventListener('click', ()=>{
    console.log("ouvrons la modale");
    galleryModal.innerHTML='';
    openModal();
    ///deuxieme bouton essayer d'utiliser selector all
    } 
  )
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

async function showUserWorks(){

console.log("les travaux seront actualisée");
///works doit contenir les nouveaux travaux et ne dois plus
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

  

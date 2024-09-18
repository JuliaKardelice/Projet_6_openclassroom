import { openModalWithWorksGallery } from './modale.js';


const filtres = document.querySelector('.filtres');
export const sectionGallery = document.querySelector(".gallery"); // pour mettre dans la modale
const galleryModal = document.querySelector('.gallery-modal');

// Travaux
let allWorks = [];


//Creer un work avec Figure avec une image et figcaption

export const createFigureWork = (work) => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figcaption = document.createElement('figcaption');

  img.src = work.imageUrl;
  img.alt = work.title;

  figcaption.innerText = work.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
}

// Fonction pour afficher les travaux dans la gallerie principale
 export const displayWorksMainGallery = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) throw new Error('Echec de la récupération des works');

    const works = await response.json();
    allWorks = works;
    console.log("les works chargés", allWorks);

    sectionGallery.innerHTML = ''; // Vider la galerie avant d'ajouter les travaux

    allWorks.forEach(work => {
      const figure = createFigureWork(work);
      sectionGallery.appendChild(figure);  //inserer dans la figure retouner l26
      
      figure.addEventListener('click', () => console.log("element cliqué",work.title, work.category)); /// test au click

    });

    
    
  } catch (error) {
    console.error(`Erreur lors de l'affichage des travaux : ${error.message || error}`);  /// erreur contenue dans l'API soit erreur 500 et erreur message "unexpec error"
  }
};

// Filtres

const showCategories = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) throw new Error('Echec de la récuperation des catégories');

    const categories = await response.json();

    const removeActiveClass = () => {
      document.querySelectorAll('.btnFiltre_survol').forEach(btn => btn.classList.remove('btnFiltre_survol'));
    };

    const btnAll = document.createElement('button');
    btnAll.classList.add('btnAll', 'btnFiltre');
    btnAll.innerText = "Tous";

    btnAll.addEventListener('click', async (e) => {
      removeActiveClass();
      btnAll.classList.add('btnFiltre_survol');
      e.preventDefault();
      sectionGallery.innerHTML = '';
      await displayWorksMainGallery(); // Afficher tous les travaux
    });

    filtres.appendChild(btnAll);

    categories.forEach(categorie => {
      const button = document.createElement('button');
      button.classList.add('btnFiltre');
      button.setAttribute('data-id', categorie.id);
      button.innerText = categorie.name;

      button.addEventListener('click', async () => {
        removeActiveClass();
        button.classList.add('btnFiltre_survol');
        filterdWorksByCategory(categorie.id); // Afficher les travaux filtrés par catégorie
      });

      filtres.appendChild(button);
    });
  } catch (error) {
    console.error(`Erreur lors de l'affichage des catégories : ${error.message || error}`);
  }
};

// Fonction de filtrage
const filterdWorksByCategory = async (categoryId) => {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) throw new Error('Echec de la récupération des works');

    const works = await response.json();
    sectionGallery.innerHTML = ''; // Vider la galerie avant de la remplir à nouveau
    ///methode ternaire
    const filteredWorks = categoryId ? works.filter(work => work.categoryId === categoryId) : works; /// METHODE TERNAIRE
    console.log(filteredWorks);
    
    filteredWorks.forEach(work => {
      const figure = createFigureWork(work);
      sectionGallery.appendChild(figure);
    });

  } catch (error) {
    console.error(`Erreur lors du filtrage des travaux : ${error.message || error}`);
  }
};

// Afficher les travaux et les filtres au chargement de la page

document.addEventListener('DOMContentLoaded', async () => {
  await displayWorksMainGallery();
});


const admin = document.querySelector('.admin');
const mesProjets = document.querySelector('#portfolio .project');
const logIn = document.getElementById("login");
const logOut = document.getElementById("logout");

// Déconnexion
logOut.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.href = "index.html";
});

// Vérifier la connexion 
const checkConnection = () => {
  if (localStorage.getItem('token')) {
    console.log("je suis connectée");
    logIn.style.display = "none";
    admin.innerHTML = "<button class=\"editMode\"> <i class=\"fas fa-pen-to-square\"></i> Mode édition</button>";
    admin.classList.add("blackLineEdition");
    mesProjets.insertAdjacentHTML("afterend", "<button class=\"editMode\"> <i class=\"fas fa-pen-to-square\"></i> modifier</button>");

    const btnModal = document.querySelector("#portfolio .editMode");

    //Ouvrir la première modale
    btnModal.addEventListener('click', async () => {
      console.log("ouvrons la modale");
      galleryModal.innerHTML = '';
      await openModalWithWorksGallery();
    });
  } else {
    showCategories();
    console.log("Je ne suis pas connectée");
    logOut.style.display = "none";
    admin.style.display = "none";
  }
}
checkConnection();


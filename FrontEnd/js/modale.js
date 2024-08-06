const modal=document.getElementById("myModal");
const btnModal=document.querySelector(".admin .editMode");
console.log(btnModal);


function openModal(){
    console.log("pour ouvrir la modale");
    modal.style.display = "block";
    /////showWorks();

    ////fermeture modale
    const span = modal.querySelector(".close");
    span.addEventListener('click',()=>{
        modal.style.display = "none";
    }
    );
    window.addEventListener('click',()=>{
        if (e.target == modal) {
            modal.style.display = "none";
        }
    })
};

const modalGallery=modal.querySelector(".modal .gallery")


// Vide le contenu actuel de la zone où les projets seront affichés.
modalGallery.innerHTML = "";

// Boucle à travers chaque projet et crée un élément "figure" pour l'affichage.
works.forEach((project) => {
  // Appelle la fonction "createFigure" pour chaque projet.
  const figure = createFigureModale(project);
  // Afficher le projet
 modalGallery.appendChild(figure);}
)
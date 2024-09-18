import { displayWorksMainGallery } from "./init.js";
import { sectionGallery } from "./init.js";

///variables globales

const modal = document.getElementById("myModal");
const overlay = document.getElementById("overlay");
const closeCross = modal.querySelector(".close");
const btnAddPhoto = document.querySelector('.add-photo');
const modalOne = document.querySelector('.modal-one');
const modalTwo = document.querySelector('.modal-two');
const btnBack = document.querySelector('.btn-back');

const fileInput = document.getElementById('photo-input');
const imgPreview = document.getElementById("imgPreview");
const addPhoto = document.querySelector(".file-upload");
const fileFormat = document.querySelector(".fileFormat")
const iconPreview = document.getElementById("iconPreview");
const selectCategory = document.querySelector("#categories")
const titleInput = document.getElementById("new-title");
const validerButton = document.getElementById("validerButton");

const galleryModal = document.querySelector('.gallery-modal');
let form = document.querySelector(".modal-two-content form")

// Fonction pour ouvrir la modale avec la galerie de travaux
export const openModalWithWorksGallery = async () => {
    try {
        // Ouvrir la modale
        modalOne.style.display = 'block';
        modal.style.display = "block";

        //Ferme la seconde modale
        modalTwo.style.display = "none";
        overlay.style.display = "block";

        // Fermer la modale au clic sur la croix close
        closeCross.addEventListener('click', () => {
            modal.style.display = "none";
            overlay.style.display = "none";
        });

        // Récupérer les travaux via l'API
        const response = await fetch('http://localhost:5678/api/works');
        if (!response.ok) throw new Error('Échec de la récupération des travaux');

        const works = await response.json();

        // Affichage des travaux dans la modale
        works.forEach(work => {
            displayGalleryModalWorks(work);
        });

    } catch (error) {
        console.error(`Erreur lors de l'ouverture de la modale avec la galerie des travaux : ${error.message || error}`);
    }
}


//Méthode pour creer la balise figure de la modale avec une icone trash au coin droit
const createFigureWorkModal = (work) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const btnDeletePhoto = document.createElement('button');

    btnDeletePhoto.classList.add("btnDeletePhoto");
    btnDeletePhoto.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";

    img.src = work.imageUrl;
    img.alt = work.title;
    img.id = work.id;

    figure.appendChild(img);
    figure.appendChild(btnDeletePhoto);
    return {
        figure,
        btnDeletePhoto
    };
}



// Fonction pour afficher les travaux dans la galerie de la modale
const displayGalleryModalWorks = (work) => {
    try {
        const figureWorkModal = createFigureWorkModal(work);
        galleryModal.appendChild(figureWorkModal.figure);
        let url = `http://localhost:5678/api/works/${work.id}`; // suppression par rapport à l'id du work

        // Attacher l'événement de suppression au clic sur le bouton de suppression
        figureWorkModal.btnDeletePhoto.addEventListener('click', async () => {
            await deleteWork(url);
        });      
        
    } catch (error) {
        console.error(`Erreur lors de l'affichage des travaux dans la modale : ${error.message || error}`);
    }
}

const closeModal = () => {
    window.addEventListener('click', (event) => {
        // Vérifie si l'élément cliqué est l'overlay (ou l'extérieur de la modale)
        if (event.target === overlay) {
            console.log("Je suis en dehors de la modale");
            modal.style.display = "none";
            overlay.style.display = "none";
        }
    });
}

closeModal();//Fermer la modale en cliquant en dehors de la modale

const deleteWork = async (url) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
        alert("Vous n'êtes pas connecté")
        return ////ARRET SCRIPT
    }

    const confirmation = confirm("êtes vous sûr de vouloir supprimer cette photo ?");
    if (!confirmation) {
        return    ///////Si il ne veut pas supprimer
    }
    try {
        let response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        }
       
    
    )
    ///Si la reponse n'est pas correcte lance une erreur avec un status associé
        if (!response.ok) {
            throw new Error(`error http ${response.status}`)
        }
    
    ///reponse non ok

    } catch (error) {
        console.error(" Error while deleting", error) ////suppression n'a pas marché à cause telle erreure

    }

    //eviter les doublons
    sectionGallery.innerHTML = ""; // Vider la galerie avant d'ajouter les travaux
    displayWorksMainGallery();
    modal.style.display = "none";//fermer la modale
    overlay.style.display = "none";

}





//Ouverture de la seconde modale
btnAddPhoto.addEventListener('click', () => {
    modalTwo.style.display = 'block';
    modalOne.style.display = 'none';
    checkFormValidity(); ///vérifier que le forumulaire est valide
    resetFormInputs();
    galleryModal.innerHTML = ''; //// ceci me permet de vider la galerie
})

btnBack.addEventListener('click', () => {
    openModalWithWorksGallery()  ///revenir à la premiere modale
});


///FORMULAIRE


///gerer ajout de la photo ou le chargement de l'image
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const EXTENSTIONACCEPTED = ["jpg", "png"];
    const fileName = file.name;
    const extension = fileName.split(".").pop().toLowerCase();
    console.log(file);

    if (file && file.size < 4 * 1024 * 1024 && EXTENSTIONACCEPTED.includes(extension)) {
        const reader = new FileReader() ///new 
        reader.onload = (e) => {
            imgPreview.src = e.target.result;
            imgPreview.style.display = "flex";
            addPhoto.style.display = "none";
            iconPreview.style.display = "none";
            fileFormat.style.display = "none";

        }
        reader.readAsDataURL(file)
        
    } else {

        alert("L'image n'a pas été chargée");
    }

});


///titre formulaire
///charger catégories qui doivent provenir de l'API dans le dropdown categorie

const getApiCategories = async () => {

    const response = await fetch('http://localhost:5678/api/categories')
    const categories = await response.json();
    console.log(categories);


    try {
        const optionEmpty = document.createElement('option');
        optionEmpty.innerText = "";
        selectCategory.appendChild(optionEmpty);

        categories.forEach(categorie => {
            const option = document.createElement('option');
            option.id = categorie.id;
            option.textContent = categorie.name;
            selectCategory.appendChild(option);
        })
    }
    catch (error) {
        console.error("Impossible de charger les catéogires"
        ) ////suppression n'a pas marché à cause telle erreure

    }
}

getApiCategories();

///Soumission du formulaire
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await upLoadFile()
})



const upLoadFile = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
        alert("Vous n'êtes pas connecté");
        return; //arrete le script
    }

    const title = titleInput.value;
    const selectedFile = fileInput.files[0]; 
    //Ici l'index de la categorie correspond à son id dans la base de données
    const optionId = selectCategory.selectedIndex; // category id


    console.log("Selected File: ", selectedFile);
    console.log("Title: ", title);
    console.log("Category ID: ", optionId); //  category id
    console.log(selectCategory.value);


    if (!selectedFile || !title || !optionId) {
        alert("Veuillez remplir tous les champs");
        return; //Arrête le script
    }

    
    const formData = new FormData();
    console.log("affiche moi",formData);
    
    formData.append("image", selectedFile); 
    formData.append("title", title);
    //Le back attend un champ "category" et non "categoryId"
    formData.append("category", optionId);

    await sendNewWork(token, formData, title);
};


const sendNewWork = async (token, formData, title) => {
    const urlAddWork = "http://localhost:5678/api/works";
    const confirmation = confirm(`Voulez-vous ajouter ${title} à la gallerie ?`);
    if (!confirmation)
        return;

    try {
        const response = await fetch(urlAddWork, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        })

        if (!response.ok) {
            throw new Error(`erreur http ${response.status}`)
        }

        console.log("Response status: ", response.status);

        const responseData = await response.json()
        console.log("reponse api", responseData);
        alert("L'image a été ajoutée avec succès");     

    } catch (error) {
        console.error("Erreur lors de la connexion", error);
    }
    
    sectionGallery.innerHTML = ""; // Vider la galerie avant d'ajouter les travaux
    displayWorksMainGallery();//Rafraichir la galerie
    modal.style.display = "none";//fermer la modale
    overlay.style.display = "none";//fermer l'overlay
    
}




// Fonction pour vérifier la validité du formulaire(désactiver et griser le bouton de validation si le formulaire n'est pas valide)

const checkFormValidity = () => {
    const isFileSelected = fileInput.files.length > 0;  // Vérifier si un fichier est sélectionné
    const isTitleFilled = titleInput.value.trim() !== "";  // Vérifier si le titre est rempli
    const isCategorySelected = selectCategory.value !== "";  // Vérifier si une catégorie est sélectionnée

    // Activer le bouton de validation si toutes les conditions sont remplies
    if (isFileSelected && isTitleFilled && isCategorySelected) {
        validerButton.disabled = false;
    } else {
        validerButton.disabled = true;
    }
};

// Ajouter des écouteurs d'événements pour vérifier la validité du formulaire lorsque les champs sont modifiés

fileInput.addEventListener("change", checkFormValidity); 
titleInput.addEventListener("input", checkFormValidity);//input car on veut que l'utilisateur tape quelque chose
selectCategory.addEventListener("change", checkFormValidity);//On utilise un changement car on veut que l'utilisateur choisisse une catégorie

// Derniere fonction pour reinistialiser les entrées du formulaire ainsi que le bouton en diasabled

const resetFormInputs = () => { 
    titleInput.value = "";
    fileInput.value = "";
    selectCategory.value = "";
    imgPreview.src = "";
    imgPreview.style.display = "none";  // Cacher l'aperçu de l'image
    iconPreview.style.display = "block"; // Afficher le bouton d'ajout de photo
    addPhoto.style.display = "flex"; // Afficher le bouton d'ajout de photo
    fileFormat.style.display = "block";
    validerButton.disabled = true; // Désactiver le bouton de validation
}

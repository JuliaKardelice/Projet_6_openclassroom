

const modal=document.getElementById("myModal");
const btnModal=document.querySelector(".editMode");
const overlay = document.getElementById("overlay");
const span = modal.querySelector(".close");
const btnAddPhoto = document.querySelector('.add-photo');
const modalOne = document. querySelector('.modal-one');
const modalTwo = document.querySelector('.modal-two');
const btnBack = document.querySelector('.btn-back');
const modalGallery=document.querySelector('titlemodal');




  async function openModal() {
    modalOne.style.display = 'block';
    modal.style.display = "block";
    overlay.style.display = "block";
    
    span.addEventListener('click',()=>{
      modal.style.display = "none";
      overlay.style.display = "none";
          }
      );

    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();

    // Affichage des travaux dans la modale
    works.forEach(work => {
        showGalleryWorks(work);
    });
}

// Fonction pour ajouter un travail à la galerie
  function showGalleryWorks(work) {
    const galleryModal = document.querySelector('.gallery-modal');

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
    galleryModal.appendChild(figure);
    
    function deleteWork() {
      console.log("pour supprimer un travail");
      figure.remove();
      
      }
    // Attacher l'événement de suppression
    btnDeletePhoto.addEventListener('click', () => {
      console.log();
      
      deleteWork();
    });
  }



  
function closeModal(){   

    span.addEventListener('click',()=>{
        modal.style.display = "none";
        overlay.style.display = "none";        
            }
        );
    window.addEventListener('click',(event)=>{
        if (event.target === modal) {
            console.log("je suis en dehors de la modal"); ///cela ne semble pas marcher ?
            modal.style.display = "none";
            overlay.style.display = "none";
        }
    })
    ;
        
}

    ///PASSAGE A LA DEUXIEME MODALE


btnAddPhoto.addEventListener('click', () => {
    modalTwo.style.display = 'block';
    modalOne.style.display = 'none';
    galleryModal.innerHTML=''; //// ceci me permet de vider la galerie
})

btnBack.addEventListener('click', () => {
    modalTwo.style.display = 'none';
    modalOne.style.display = 'block';
    openModal()  ///revenir à la gallery de base


   
});



////MODALE TWO
/*
const btnUpload=document.querySelector(".file-upload");
const validationNewWork=document.getElementById("validerButton")

async function addNewWork() {
const formData = new FormData();
const btnUpload=document.getElementById("photo-input");
const reponse= await fetch('http://localhost:5678/api/works',
  {
method:"POST",
headers:{
  'Content-Type:':'application/json',

},



  }

)

};
*/


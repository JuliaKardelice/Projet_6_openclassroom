

///variables globales
const modal=document.getElementById("myModal");
const btnModal=document.querySelector(".editMode");
const overlay = document.getElementById("overlay");
const span = modal.querySelector(".close");
const btnAddPhoto = document.querySelector('.add-photo');
const modalOne = document. querySelector('.modal-one');
const modalTwo = document.querySelector('.modal-two');
const btnBack = document.querySelector('.btn-back');
const modalGallery=document.querySelector('titlemodal');
const fileInput = document.getElementById('photo-input');
const imgPreview = document.getElementById("imgPreview");
const addPhoto = document.querySelector(".file-upload");
const fileFormat=document.querySelector(".fileFormat")
const iconPreview=document.getElementById("iconPreview");

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
    let url = `http://localhost:5678/api/works/${work.id}`; ////supression par rapport à l'id
    // Attacher l'événement de suppression
    btnDeletePhoto.addEventListener('click', () => {
      console.log();
      
      deleteWork(url);
    });
  }

const deleteWork = async (url)=>{
const token=localStorage.getItem("token");
if(!token){
 alert("Vous n'êtes pas connecté") 
return ////ARRET SCRIPT
}
const confirmation = confirm("êtes vous sûr de vouloir supprimer cette photo ?");
if(!confirmation){
return    ///////Si il ne veut pas supprimer
}
try {
let response = await fetch(url,{
method: "DELETE",
headers: {
"Authorization" :`Bearer ${token}`,
"Accept":"application/json"
}
})
if(!response.ok){
throw new Error(`error http ${response.status}`)
}

} catch (error) {
console.error(" Error while deleting",error) ////suprression n'a pas marché à cause telle erreure
  
}


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



///gerer ajout de la photo ou le chargement de l'image
fileInput.addEventListener("change",(event)=>{
const file = event.target.files[0];
const EXTENSTIONACCEPTED = ["jpg","png"];
const fileName = file.name;
const extension = fileName.split(".").pop().toLowerCase();   

if(file && file.size < 4 * 1024 * 1024 && EXTENSTIONACCEPTED.includes(extension)){
const reader = new FileReader() ///new 
reader.onload = (e)=>{
  imgPreview.src = e.target.result;
  imgPreview.style.display="flex";
  addPhoto.style.display="none";
  iconPreview.style.display="none";
  fileFormat.style.display="none";

  
}
reader.readAsDataURL(file)
}else{

alert("L'image n'a pas été chargée");
}

})



const modal=document.getElementById("myModal");
const btnModal=document.querySelector(".admin .editMode");
const overlay = document.getElementById("overlay");
const span = modal.querySelector(".close");

function openModal(){
    console.log("pour ouvrir la modale");
    modal.style.display = "block";
    overlay.style.display = "block";
    span.addEventListener('click',()=>{
        modal.style.display = "none";
        overlay.style.display = "none";
            }
        )
    };
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
        });
        
    }

///contenu modal
////
const modalGallery=modal.querySelector(".modal .gallery")
modalGallery.innerHTML = "";

async function contentGalleryModal () {
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

const figure = document.createElement('figure');
const img = document.createElement('img');
}
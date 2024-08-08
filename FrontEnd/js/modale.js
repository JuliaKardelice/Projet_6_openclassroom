

const modal=document.getElementById("myModal");
const btnModal=document.querySelector(".editMode");
const overlay = document.getElementById("overlay");
const span = modal.querySelector(".close");
const btnAddPhoto = document.querySelector('.add-photo');
const modalOne = document. querySelector('.modal-one');
const modalTwo = document.querySelector('.modal-two');
const btnBack = document.querySelector('.btn-back');




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

btnAddPhoto.addEventListener('click', () => {
    modalTwo.style.display = 'block';
    modalOne.style.display = 'none';
})

btnBack.addEventListener('click', () => {
    modalTwo.style.display = 'none';
    modalOne.style.display = 'block';
})



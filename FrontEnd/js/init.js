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
    figure.setAttribute('data-id',categorie.id);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    sectionGallery.appendChild(figure);
  })
}

showWorks();

// Filtres

async function showCategories(){
  const response = await fetch('http://localhost:5678/api/categories');
  const categories = await response.json();

  const btnAll = document.createElement('button');
  btnAll.classList.add('btnAll');
  btnAll.innerText = "Tous";
  btnAll.addEventListener("mouseenter",()=>{
  btnAll.classList.toggle('btnFiltre_survol');
  btnAll.addEventListener("mouseleave",()=>{
  btnAll.classList.toggle('btnFiltre_survol');
    
  })
    
    
});

  filtres.appendChild(btnAll);

  categories.forEach(categorie => {
    const button = document.createElement('button');
    button.classList.add('btnFiltre');
    button.setAttribute('data-id', categorie.id);
    button.innerText = categorie.name;
    button.addEventListener("mouseenter",()=>{
    button.classList.toggle('btnFiltre_survol');    
})
button.addEventListener("mouseleave",()=>{
  button.classList.toggle('btnFiltre_survol');
  
})
;
    filtres.appendChild(button);
  });

};

showCategories();



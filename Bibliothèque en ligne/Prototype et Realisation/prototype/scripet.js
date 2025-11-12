let livres =  [];


let catalogue = document.getElementById("catalogue");
let btnAjoute = document.getElementById("ajoute-livre");
let Search    = document.getElementById("search");

function afficher(filter = '') {
  catalogue.innerHTML = "";


  let filters = livres.filter((livre) =>
    livre.titre.toLowerCase().includes(filter.toLowerCase()) ||
    livre.auteur.toLowerCase().includes(filter.toLowerCase())
  );
  
  filters.forEach( function(livre, index) {
 
    let div = document.createElement("div");
    div.className = "carte";

    div.innerHTML = `
      <h3>${livre.titre}</h3>
      <p><strong>Code:</strong> ${livre.code}</p>
      <p><strong>Auteur:</strong> ${livre.auteur}</p>
      <p><strong>Editeur:</strong> ${livre.editeur}</p>
      <p><strong>Année:</strong> ${livre.annee}</p>
      <p><strong>Prix:</strong> ${livre.prix} DH</p>
      <p><strong>Disponible:</strong> ${livre.disponible ? "Oui" : "Non"}</p>
      <button class="remove">Supprimer</button>
    `;

    div.querySelector(".remove").addEventListener("click", () => {
      livres.splice(index, 1);
      afficher(Search.value);  
    });

    catalogue.appendChild(div);
  });

  document.getElementById("total-livres").textContent = livres.length;
  document.getElementById("livres-disponibles").textContent = livres.filter(l => l.disponible).length;
}
let form = document.getElementById("form-ajout");
form.addEventListener("submit", function(e) {
  e.preventDefault()
  let code = document.getElementById("code").value;
  let titre = document.getElementById("titre").value;
  let auteur = document.getElementById("auteur").value;
  let editeur = document.getElementById("editeur").value;
  let annee = document.getElementById("annee").value;
  let prix = document.getElementById("prix").value;
  let disponible = document.getElementById("disponible").value === "true";

  let nvLivre = { code, titre, auteur, editeur, annee, prix, disponible };

  livres.push(nvLivre);

  form.reset();

  afficher();
});

Search.addEventListener("input", function() {
  afficher(Search.value);
});



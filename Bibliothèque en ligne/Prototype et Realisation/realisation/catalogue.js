let livres = JSON.parse(localStorage.getItem("livres")) || [];

let catalogue = document.getElementById("catalogue");
let Search = document.getElementById("search");
let btnTrier = document.getElementById("btn-trier");
let ordreCroissant = true;

function sauvegarder() {
  localStorage.setItem("livres", JSON.stringify(livres));
}

function afficher(filter = '') {
  catalogue.innerHTML = "";

  let filters = livres.filter((livre) =>
    livre.titre.toLowerCase().includes(filter.toLowerCase()) ||
    livre.auteur.toLowerCase().includes(filter.toLowerCase())
  );

  filters.forEach(function(livre, index) {
    let div = document.createElement("div");
    div.className = "carte";

    div.innerHTML = `
      <h3>${livre.titre}</h3>
      <p><strong>Code:</strong> ${livre.code}</p>
      <p><strong>Auteur:</strong> ${livre.auteur}</p>
      <p><strong>Année:</strong> ${livre.annee}</p>
      <p><strong>Prix:</strong> ${livre.prix} DH</p>
      <p><strong>Disponible:</strong> ${livre.disponible ? "Oui" : "Non"}</p>
      <button class="remove">Supprimer</button>
    `;

    div.querySelector(".remove").addEventListener("click", () => {
      livres.splice(index, 1);
      sauvegarder();
      afficher(Search.value);
    });

    if (livre.disponible) {
      let btnReserver = document.createElement("button");
      btnReserver.textContent = "Réserver";
      btnReserver.className = "btn-reserver";
      btnReserver.addEventListener("click", () => {
        livre.disponible = false;
        sauvegarder();
        afficher(Search.value);
      });
      div.appendChild(btnReserver);
    } else {
      let label = document.createElement("span");
      label.textContent = "Réservé";
      label.className = "label-reserve";
      div.appendChild(label);
    }





    
    catalogue.appendChild(div);
  });

  document.getElementById("total-livres").textContent = livres.length;
  document.getElementById("livres-disponibles").textContent = livres.filter(l => l.disponible).length;

  if (livres.length > 0) {
    let livreCher = livres.reduce((max, l) => l.prix > max.prix ? l : max, livres[0]);
    document.getElementById("livre-cher").textContent = `${livreCher.titre} (${livreCher.prix} DH)`;
  } else {
    document.getElementById("livre-cher").textContent = "Aucun";
  }
}

btnTrier.addEventListener("click", (e) => {
  e.preventDefault();
  livres.sort((a, b) => {
    if (a.titre.toLowerCase() < b.titre.toLowerCase()) return ordreCroissant ? -1 : 1;
    if (a.titre.toLowerCase() > b.titre.toLowerCase()) return ordreCroissant ? 1 : -1;
    return 0;
  });
  ordreCroissant = !ordreCroissant;
  afficher(Search.value);
});

Search.addEventListener("input", function() {
  afficher(Search.value);
});

afficher();

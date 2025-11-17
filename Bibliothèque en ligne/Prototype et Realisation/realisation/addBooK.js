let form = document.getElementById("form-ajout");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let livres = JSON.parse(localStorage.getItem("livres")) || [];

  let code = document.getElementById("code").value;
  let titre = document.getElementById("titre").value;
  let auteur = document.getElementById("auteur").value;
  let annee = document.getElementById("annee").value;
  let prix = document.getElementById("prix").value;
  let disponible = document.getElementById("disponible").value === "true";

  let nvLivre = { code, titre, auteur, annee, prix, disponible };
  livres.push(nvLivre);

  localStorage.setItem("livres", JSON.stringify(livres));

  form.reset();
  alert("📚 Livre ajouté avec succès !");
});


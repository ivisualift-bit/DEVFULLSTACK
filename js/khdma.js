var nomsPanier = [];
var prixPanier = [];

function ajouterAuPanier(nom, prix) {
  nomsPanier.push(nom);
  prixPanier.push(prix);
  afficherPanier();
}

function retirerDuPanier(index) {
  nomsPanier.splice(index, 1);
  prixPanier.splice(index, 1);
  afficherPanier();
}

function afficherPanier() {
  var liste = document.getElementById("liste-panier");
  var total = 0;

  liste.innerHTML = "";

  for (var i = 0; i < nomsPanier.length; i++) {
    total = total + prixPanier[i];
    liste.innerHTML +=
      "<li>" +
      nomsPanier[i] +
      " - " +
      prixPanier[i] +
      " DH" +
      '<button class="btn btn-retirer" onclick="retirerDuPanier(' +
      i +
      ')">Retirer</button></li>';
  }

  if (nomsPanier.length == 0) {
    liste.innerHTML = "<li>Votre panier est vide.</li>";
  }

  document.getElementById("total-panier").innerHTML = "Total : " + total + " DH";
  document.getElementById("nombre-panier").innerHTML = nomsPanier.length;
}

function validerPanier() {
  var msg = document.getElementById("msg-panier");

  if (nomsPanier.length == 0) {
    afficherMessage(msg, "danger", "Votre panier est vide.");
    return;
  }

  var total = 0;
  for (var i = 0; i < prixPanier.length; i++) {
    total = total + prixPanier[i];
  }

  afficherMessage(
    msg,
    "success",
    "Merci ! Votre commande de " +
      nomsPanier.length +
      " article(s) pour " +
      total +
      " DH a été enregistrée.",
  );

  nomsPanier = [];
  prixPanier = [];
  afficherPanier();
}

function filtrer(choix) {
  var produits = document.getElementsByClassName("produit");

  for (var i = 0; i < produits.length; i++) {
    var prix = Number(produits[i].getAttribute("data-prix"));

    if (
      choix == "tous" ||
      (choix == "moins" && prix < 300) ||
      (choix == "plus" && prix >= 300)
    ) {
      produits[i].style.display = "";
    } else {
      produits[i].style.display = "none";
    }
  }
}

function envoyerContact(event) {
  event.preventDefault();

  var nom = document.getElementById("nom").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var msg = document.getElementById("msg-contact");

  if (nom == "" || email == "" || message == "") {
    afficherMessage(msg, "danger", "Veuillez remplir tous les champs.");
  } else if (email.indexOf("@") == -1) {
    afficherMessage(msg, "danger", "Adresse e-mail invalide.");
  } else {
    afficherMessage(msg, "success", "Merci " + nom + ", votre message a été envoyé !");
    document.getElementById("form-contact").reset();
  }
}

function calculerTotal(prix) {
  var quantite = document.getElementById("quantite").value;
  document.getElementById("total").innerHTML = "Total : " + prix * quantite + " DH";
}

function commander(event, produit, prix) {
  event.preventDefault();

  var nom = document.getElementById("nom").value;
  var telephone = document.getElementById("telephone").value;
  var ville = document.getElementById("ville").value;
  var quantite = document.getElementById("quantite").value;
  var msg = document.getElementById("msg-commande");

  if (nom == "" || telephone == "" || ville == "") {
    afficherMessage(msg, "danger", "Veuillez remplir tous les champs.");
  } else if (telephone.length < 10) {
    afficherMessage(msg, "danger", "Le numéro de téléphone doit contenir 10 chiffres.");
  } else if (quantite < 1) {
    afficherMessage(msg, "danger", "La quantité doit être au moins 1.");
  } else {
    afficherMessage(
      msg,
      "success",
      "Merci " +
        nom +
        " ! Votre commande de " +
        quantite +
        " x " +
        produit +
        " (" +
        prix * quantite +
        " DH) a été enregistrée. Nous vous appellerons au " +
        telephone +
        ".",
    );
    document.getElementById("form-commande").reset();
    calculerTotal(prix);
  }
}

function afficherMessage(element, type, texte) {
  element.className = "alert alert-" + type;
  element.textContent = texte;
  element.style.display = "block";
}

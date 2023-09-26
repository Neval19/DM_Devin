const MAXIMUM_VALUE = 100;
const MAX_TRIES = 6;

let randomNumber;
let nbEssais = 0;

document.getElementById("valider").addEventListener("click", testerReponse);

function testerReponse() {
    const reponse = document.getElementById("input").value;
    const messageElement = document.getElementById("message");
    const validationMessage = document.getElementById("validation-message");
    
    nbEssais++;

    if (isNaN(reponse) || reponse === "") {
        afficherMessage("Réponse non valide");
    } else if (reponse < 0 || reponse >= MAXIMUM_VALUE) {
        afficherMessage(`Hors de la limite (0-${MAXIMUM_VALUE - 1})`);
    } else if (reponse < randomNumber) {
        afficherMessage("C'est plus", "blue");
    } else if (reponse > randomNumber) {
        afficherMessage("C'est moins", "blue");
    } else {
        afficherMessage("C'EST CA BRAVO BRAVO", "green");
        lancerRelancement();
        return;
    }

    if (nbEssais >= MAX_TRIES) {
        afficherMessage(`c'est perdu. La réponse était : ${randomNumber}`, "red");
        lancerRelancement();
    }
}

function afficherMessage(texte, couleur = "") {
    const messageElement = document.getElementById("message");
    messageElement.textContent = `[${nbEssais}] ${texte}`;
    messageElement.style.color = couleur;
}

function lancerRelancement() {
    document.getElementById("valider").textContent = "Rejouer ?";
    document.getElementById("valider").removeEventListener("click", testerReponse);
    document.getElementById("valider").addEventListener("click", relancer);
}

function relancer() {
    document.getElementById("valider").removeEventListener("click", relancer);
    document.getElementById("valider").addEventListener("click", testerReponse);
    randomNumber = Math.floor(Math.random() * MAXIMUM_VALUE);
    nbEssais = 0;
    afficherMessage("");
    document.getElementById("input").value = "";
    document.getElementById("valider").textContent = "Essayer";
}

// Initialisation du jeu au chargement de la page
randomNumber = Math.floor(Math.random() * MAXIMUM_VALUE);

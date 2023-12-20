// VARIABLES

let casesSombres = document.querySelectorAll(".case_sombre");
let caseDepart = null;
let caseArrivee = null;
let scoreBlanc = 0;
let scoreNoir = 0;
let joueurActif = "blanc"; // Le joueur blanc commence

// FONCTIONS

let mouvementEffectue = false;

// Modifiez la fonction clicCase
function clicCase(e) {
    if (!caseDepart) {
        // Sélectionnez le pion uniquement si la case contient un pion du joueur actif
        if ((joueurActif === "blanc" && couleurPion(this)) || (joueurActif === "noir" && !couleurPion(this))) {
            caseDepart = this;
            caseDepart.classList.add("surbrillance");
            mouvementEffectue = false; // Réinitialisez la variable à chaque nouvelle sélection de pion
        }
    } else {
        // Il y a déjà une case départ, il s'agit donc de la case arrivée cliquée
        caseArrivee = this;

        if (caseDepart.id === caseArrivee.id) {
            // Même case, on désélectionne
            caseDepart.classList.remove("surbrillance");
            caseDepart = null;
            caseArrivee = null;
        } else {
            if (caseArrivee.innerHTML === "") {
                // Test de couleur du pion
                if (couleurPion(caseArrivee)) {
                    // Pion de la même couleur, on change de pion
                    caseDepart.classList.remove("surbrillance");
                    caseDepart = caseArrivee;
                    caseDepart.classList.add("surbrillance");
                    caseArrivee = null;
                } else if (couleurPion(caseDepart)) {
                    // Blanc
                    console.log("Pion blanc");

                    if (testDeplaceBlanc()) {
                        // La case est vide
                        deplacePion();
                        mouvementEffectue = true; // Le joueur a effectué un mouvement avec ce pion
                        finDuTour();
                    } else {
                        // Si le joueur essaie de sélectionner un autre pion pendant le tour, réinitialisez la sélection
                        caseDepart.classList.remove("surbrillance");
                        caseDepart = null;
                        caseArrivee = null;
                    }
                } else {
                    // Noir
                    console.log("Pion noir");

                    if (testDeplaceNoir()) {
                        // La case est vide
                        deplacePion();
                        mouvementEffectue = true; // Le joueur a effectué un mouvement avec ce pion
                        finDuTour();
                    } else {
                        // Si le joueur essaie de sélectionner un autre pion pendant le tour, réinitialisez la sélection
                        caseDepart.classList.remove("surbrillance");
                        caseDepart = null;
                        caseArrivee = null;
                    }
                }
            } else if (couleurPion(caseArrivee) && couleurPion(caseDepart)) {
                // Pion de la même couleur, on change de pion
                caseDepart.classList.remove("surbrillance");
                caseDepart = caseArrivee;
                caseDepart.classList.add("surbrillance");
                caseArrivee = null;
            }
        }
    }
}





function couleurPion(cellule) {
    return cellule.innerHTML.includes("blanc");
}
function testDeplaceBlanc() {
    xDepart = parseInt(caseDepart.getAttribute("case_x"));
    yDepart = parseInt(caseDepart.getAttribute("case_y"));
    xArrivee = parseInt(caseArrivee.getAttribute("case_x"));
    yArrivee = parseInt(caseArrivee.getAttribute("case_y"));

    // Vérifier si la case d'arrivée est vide
    if (caseArrivee.innerHTML === "") {
        // Déplacement normal
        if (yDepart - 1 === yArrivee && (xDepart - 1 === xArrivee || xDepart + 1 === xArrivee)) {
            return true;
        }

        // Déplacement pour manger une pièce adverse
        if (yDepart - 2 === yArrivee && (xDepart - 2 === xArrivee || xDepart + 2 === xArrivee)) {
            let xIntermediaire = (xDepart + xArrivee) / 2;
            let yIntermediaire = (yDepart + yArrivee) / 2;
            let caseIntermediaire = document.getElementById(`case_${yIntermediaire}_${xIntermediaire}`);

            if (caseIntermediaire.innerHTML.includes("noir")) {
                return true;
            }
        }
    }

    console.log("Erreur de déplacement");
    return false;
}

function testDeplaceNoir() {
    xDepart = parseInt(caseDepart.getAttribute("case_x"));
    yDepart = parseInt(caseDepart.getAttribute("case_y"));
    xArrivee = parseInt(caseArrivee.getAttribute("case_x"));
    yArrivee = parseInt(caseArrivee.getAttribute("case_y"));

    // Vérifier si la case d'arrivée est vide
    if (caseArrivee.innerHTML === "") {
        // Déplacement normal
        if (yDepart + 1 === yArrivee && (xDepart - 1 === xArrivee || xDepart + 1 === xArrivee)) {
            return true;
        }

        // Déplacement pour manger une pièce adverse
        if (yDepart + 2 === yArrivee && (xDepart - 2 === xArrivee || xDepart + 2 === xArrivee)) {
            let xIntermediaire = (xDepart + xArrivee) / 2;
            let yIntermediaire = (yDepart + yArrivee) / 2;
            let caseIntermediaire = document.getElementById(`case_${yIntermediaire}_${xIntermediaire}`);

            if (caseIntermediaire.innerHTML.includes("blanc")) {
                return true;
            }
        }
    }

    console.log("Erreur de déplacement");
    return false;
}



function deplacePion() {
    // Copiez le contenu de la case de départ dans la case d'arrivée
    caseArrivee.innerHTML = caseDepart.innerHTML;

    // Supprimez la pièce de la case de départ
    caseDepart.innerHTML = "";

    console.log("Déplacement effectué. Case de départ vidée. Contenu de la case d'arrivée:", caseArrivee.innerHTML);

    // Vérifiez si la pièce a atteint la dernière rangée adverse
    if (
        (caseArrivee.innerHTML.includes("blanc") && parseInt(caseArrivee.getAttribute("case_y")) === 0) ||
        (caseArrivee.innerHTML.includes("noir") && parseInt(caseArrivee.getAttribute("case_y")) === 9)
    ) {
        // Incrémentez le score du joueur actif
        if (caseArrivee.innerHTML.includes("blanc")) {
            scoreBlanc++;
            console.log("Score Blanc incrémenté. Nouveau score Blanc:", scoreBlanc);
        } else if (caseArrivee.innerHTML.includes("noir")) {
            scoreNoir++;
            console.log("Score Noir incrémenté. Nouveau score Noir:", scoreNoir);
        }
    } else {
        console.log("Pas d'atteinte de la dernière rangée adverse. Score Blanc:", scoreBlanc, "Score Noir:", scoreNoir);
    }

    // Vérifiez s'il y a une pièce à manger (case intermédiaire)
    let xIntermediaire = (parseInt(caseDepart.getAttribute("case_x")) + parseInt(caseArrivee.getAttribute("case_x"))) / 2;
    let yIntermediaire = (parseInt(caseDepart.getAttribute("case_y")) + parseInt(caseArrivee.getAttribute("case_y"))) / 2;
    let caseIntermediaire = document.getElementById(`case_${yIntermediaire}_${xIntermediaire}`);

    if (caseIntermediaire) {
        // Supprimez la pièce mangée
        caseIntermediaire.innerHTML = "";
        console.log("Pièce mangée. Contenu de la case intermédiaire:", caseIntermediaire.innerHTML);

        // Incrémentez le score du joueur actif
        if (caseArrivee.innerHTML.includes("blanc")) {
            scoreBlanc++;
            console.log("Score Blanc incrémenté. Nouveau score Blanc:", scoreBlanc);
        } else if (caseArrivee.innerHTML.includes("noir")) {
            scoreNoir++;
            console.log("Score Noir incrémenté. Nouveau score Noir:", scoreNoir);
        }
    }

    // Mettez à jour les scores dans l'interface utilisateur
    document.getElementById("score-blanc").innerText = "Score Blanc: " + scoreBlanc;
    document.getElementById("score-noir").innerText = "Score Noir: " + scoreNoir;
}






function finDuTour() {
    caseDepart.classList.remove("surbrillance");

    // Remise à zéro
    caseDepart = null;
    caseArrivee = null;

    // Changez le joueur actif
    joueurActif = (joueurActif === "blanc") ? "noir" : "blanc";
    console.log("Tour du joueur:", joueurActif);
}
// EVENTS

for (const caseSombre of casesSombres) {
    caseSombre.addEventListener("click", clicCase);
}
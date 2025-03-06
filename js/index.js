                            // ------------- //
                            // LES VARIABLES //
                            // ------------- //


let result=[];
const colors=['rouge','bleu','vert','jaune','blanc','noir'];
let proposition=[];
let compteurPartie = 1;

                            // ------------- //
                            // LES FONCTIONS //
                            // ------------- //

// --------------------------------- //
// Fonction pour mélanger un tableau //
// --------------------------------- //


function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Mélanger le tableau des couleurs
const shuffledColors = shuffle([...colors]);

// Prendre les 4 premières valeurs
result = shuffledColors.slice(0, 4);

// --------------------------------------------------- //
// Fonction pour compter les pions bien placés (vert) //
// ------------------------------------------------- //

function compteurBienplacé(arr1, arr2) {
    if (arr1.length !== arr2.length) return 0;
    return arr1.filter((element, index) => element === arr2[index]).length;
}

// ---------------------------------------------------- //
// Fonction pour compter les pions mal placés (orange) //
// -------------------------------------------------- //

function compteurMalPlacé(arr1, arr2) {
    if (arr1.length !== arr2.length) return 0;

    let arr1Copy = [...arr1];
    let arr2Copy = [...arr2];
    let misplacedCount = 0;

    // Retirer les pions bien placés
    arr1Copy.forEach((element, index) => {
        if (element === arr2Copy[index]) {
            arr1Copy[index] = null; // Marque cet élément comme traité
            arr2Copy[index] = null; // Marque cet élément comme traité
        }
    });

    // Compter les pions mal placés
    arr1Copy.forEach((element, index) => {
        if (element !== null && arr2Copy.includes(element)) {
            misplacedCount++;
            arr2Copy[arr2Copy.indexOf(element)] = null; // Marque cet élément comme traité
        }
    });

    return misplacedCount;
}
console.log(result)

// Fonction pour rejouer une partie

function rejouer(){

const rejouer = document.querySelector(".boutonRejouer")

rejouer.addEventListener('click', function() {
    window.location.reload();
    });
}

                                // ------- //
                                // LE JEU //
                                // ----- //

//---------------------------//
//Création du plateau de jeu//
//-------------------------//

const PlateaudeJeu = document.getElementById('PlateaudeJeu');
for (let i = 1; i <= 40; i++) {
    const caseDiv = document.createElement('div');
    caseDiv.className = 'case';
    PlateaudeJeu.appendChild(caseDiv);
}

// création des emplacement pions bien placés ( vert )

const pionBienPlacé = document.getElementById('pionBienPlacé');
for (let i = 1; i <= 10; i++) {
    const VerifVert = document.createElement('div');
    VerifVert.className = 'RondDeVerif';
    VerifVert.id = "vert"+[i];
    pionBienPlacé.appendChild(VerifVert);
    VerifVert.style.backgroundColor = 'green';
}

// création des emplacement des pions mal placés ( Orange )

const pionMalPlacé = document.getElementById('pionMalPlacé');
for (let i = 1; i <= 10; i++) {
    const VerifOrange = document.createElement('div');
    VerifOrange.className = 'RondDeVerif';
    VerifOrange.id = "orange"+[i];
    pionMalPlacé.appendChild(VerifOrange);
    VerifOrange.style.backgroundColor = 'orange';
}

//-------------------------------------//
//Création de la proposition du joueur//
//-----------------------------------//

// Création de la grille de proposition
const ZoneDeProposition = document.getElementById('ZoneDeProposition');
ZoneDeProposition.innerHTML = ''; // Nettoyer la zone de proposition

// Créer les 40 pions (10 lignes x 4 colonnes)
for (let i = 0; i < 40; i++) {
    const caseProposition = document.createElement('div');
    caseProposition.className = 'proposition';
    caseProposition.id = `proposition-${i}`;
    ZoneDeProposition.appendChild(caseProposition);
}

// Click sur les jetons de couleur
const jetons = document.getElementsByClassName('pionBoitedeJeu');
let pionActuel = 0;

for (let i = 0; i < jetons.length; i++) {
    jetons[i].addEventListener('click', function() {
        if (pionActuel < 40) {
            const couleur = this.id; // Récupère l'ID du pion cliqué (rouge, bleu, vert, etc.)
            proposition.push(couleur);
            
            // Mettre à jour l'apparence du pion de proposition
            const pionProposition = document.getElementById(`proposition-${pionActuel}`);
            if (pionProposition) {
                // Applique la couleur correspondante au pion
                switch(couleur) {
                    case 'rouge':
                        pionProposition.style.backgroundColor = 'red';
                        break;
                    case 'bleu':
                        pionProposition.style.backgroundColor = 'blue';
                        break;
                    case 'vert':
                        pionProposition.style.backgroundColor = 'green';
                        break;
                    case 'jaune':
                        pionProposition.style.backgroundColor = 'yellow';
                        break;
                    case 'blanc':
                        pionProposition.style.backgroundColor = 'white';
                        break;
                    case 'noir':
                        pionProposition.style.backgroundColor = 'black';
                        break;
                }
                console.log(`Couleur ${couleur} appliquée au pion ${pionActuel}`);
            }
            
            pionActuel++;
            
            // Si on a rempli une ligne (4 pions)
            if (proposition.length === 4) {
                // Vérifier la proposition
                if (JSON.stringify(proposition) === JSON.stringify(result)) {
                    document.getElementById("fenetreMessage").style.display = 'flex';
                    document.getElementById("fenetreMessage").innerHTML = '<h1 class="h1fenetreMessage">Vous avez Gagné</h1>';
                    document.getElementById("fenetreMessage").innerHTML += '<button class="boutonRejouer">Recommencer</button>';
                    rejouer();
                } else {
                    if (compteurPartie === 10) {
                        document.getElementById("fenetreMessage").style.display = 'flex';
                        document.getElementById("fenetreMessage").innerHTML = '<h1 class="h1fentreMessage">Vous avez Perdu</h1>';
                        document.getElementById("fenetreMessage").innerHTML += `<h2>La combinaison était : ${result}</h2>`;
                        document.getElementById("fenetreMessage").innerHTML += '<button class="boutonRejouer">Recommencer</button>';
                        rejouer();
                    } else {
                        document.getElementById("vert" + compteurPartie).innerHTML = (compteurBienplacé(result, proposition));
                        document.getElementById("orange" + compteurPartie).innerHTML = (compteurMalPlacé(result, proposition));
                        compteurPartie++;
                    }
                }
                proposition = [];
            }
        }
    });
}







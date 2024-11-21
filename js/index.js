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

// Click sur les jetons

const click = document.getElementsByClassName('proposition');

for (let i = 0; i < click.length; i++) {
    click[i].addEventListener('click', function jouer() {
        proposition.push(this.id);
        document.getElementById('ZoneDeProposition').innerHTML += `<div class="proposition" id="${this.id}"></div>`;
        console.log(proposition);

//-------------------------------//
//Vérification de la proposition//
//-----------------------------//

        if (proposition.length === 4) {
            if (JSON.stringify(proposition) === JSON.stringify(result)) {
                document.getElementById("fenetreMessage").style.display='flex';
                document.getElementById("fenetreMessage").innerHTML= '<h1 class = "h1fenetreMessage"> Vous avez Gagné</h1>';
                document.getElementById("fenetreMessage").innerHTML+= '<button class="boutonRejouer">Recommencer</button>';
                rejouer();

            } else {
                if (compteurPartie === 10) {
                    document.getElementById("fenetreMessage").style.display='flex';
                    document.getElementById("fenetreMessage").innerHTML= '<h1 class = "h1fentreMessage"> Vous avez Perdu</h1>';
                    document.getElementById("fenetreMessage").innerHTML += `<h2> La combinaison était : ${result}</h2>`;
                    document.getElementById("fenetreMessage").innerHTML+= '<button class="boutonRejouer">Recommencer</button>';
                    rejouer();

                } else {
                    document.getElementById("vert"+compteurPartie).innerHTML=(compteurBienplacé(result, proposition));
                    document.getElementById("orange"+compteurPartie).innerHTML=(compteurMalPlacé(result, proposition));
                    compteurPartie += 1;
                }
            }
            proposition = []; // Réinitialiser le tableau après chaque essai
        }
    });
}







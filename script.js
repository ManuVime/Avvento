//OPERAZIONI PRELIMINARI

//Raccogliamo tutti gli elementi

const calendar = document.querySelector(".Calendar");
const modal = document.querySelector(".modal-overlay");
const modalWindow = document.querySelector(".modal-window");
const modalContent = document.querySelector(".modal-content");
const modalButton = document.querySelector(".modal-button");

//Elenco delle finestrelle aperte
let openedIndexes = [];

//OPERAZIONI DI AVVIO

//Controllare se ci sono indici salvati
const previuousOpenedIndexes = localStorage.getItem("mylist");
if (previuousOpenedIndexes) {
    openedIndexes = JSON.parse(previuousOpenedIndexes);
}


//Renderizzare le finestre
for (let i=0; i< source.length; i++) {
    //creo una finestra per ogni elemento dell'array
    const box = createBox(i);
    //la aggancio al calendario in pagina
    calendar.innerHTML += box;
}

//EVENTI DINAMICI
//Rendere cliccabili le finestrelle

const boxes = document.querySelectorAll(".box");
const inDate = new Date("December 01 2022");
const endDate =  new Date().getTime();
const diff = Math.floor((endDate - inDate)/86400000);
for (let i=0; i< boxes.length & i<=diff;i++) {
    //considero il box i-esimo
    const box = boxes[i];
    //lo rendo cliccabile
    box.addEventListener("click",function () {
        //faccio apparire il box come aperto
        box.classList.add("box-opened")
        //riempio la modale
        insertModalContent(i);
        //apro la modale
        openModal();
        //aggiungo alla lista di finestre aperte
        addToOpenedIndex(i);
    });
}

//Rendo il bottone cliccabile
modalButton.addEventListener("click",function(){
    closeModal();
});

//FUNZIONI
//Funzione per creare finestra
function createBox(i) {
    const Date = i+1;
    const Icon = source[i].icon;
    let classes = "box";
    //controllo se sono aperte
    if(openedIndexes.includes(i)){
        classes = "box box-opened"
    }
    return `
    <div class="${classes}">
        <img class= "box-icon" src="icons/${Icon}.png" alt="icon">
        <div class="box-date">${Date}</div>
    </div>
    ` ;
}

//Funzione per aprire la modale
function openModal() {
    modal.classList.remove("modal-hidden");
}

//Funzione per chiudere la modale
function closeModal() {
    modal.classList.add("modal-hidden");
}

//Funzione per riempire la modale
function insertModalContent(i) {
    const surprise = source[i]
    if (surprise.type=="image"){
        modalContent.innerHTML = `<img src ="${surprise.url}" alt = "${surprise.tile}">`
    }
    else if (surprise.type=="text"){
        modalContent.innerHTML = `<p>${surprise.text}</p>`;
    }
}

//Funzione per aggiungere indice alla lista
function addToOpenedIndex(i){
    if(!openedIndexes.includes(i)) {
        //aggiungo alla lista il numero
        openedIndexes.push(i);
        console.log(openedIndexes);
        //salvo nella locale storage
        localStorage.setItem("mylist",JSON.stringify(openedIndexes));
    }
}
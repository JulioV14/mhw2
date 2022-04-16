/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function reset(){
    for(const key in risposte_utente){
        delete(risposte_utente[key]);
    }
    const nascondi_risultato = document.querySelector('#result');
    nascondi_risultato.classList.add('hidden');
    for(const box of boxes){
        box.classList.remove('opacity');
        box.classList.remove('selected');
        box.querySelector('.checkbox').src = "images/unchecked.png";
        box.addEventListener('click', boxClick);
    }
}

function chooseAnswer(){
    if(risposte_utente.two === risposte_utente.three){
        return risposte_utente.two;
    }
    return risposte_utente.one;
}

function mostraRisultato(key){
    console.log(RESULTS_MAP[key]);
    const finestra = document.querySelector('#result');
    finestra.querySelector('h1').textContent = RESULTS_MAP[key].title;
    finestra.querySelector('p').textContent = RESULTS_MAP[key].contents;
    finestra.classList.remove('hidden');

    const button = document.querySelector('#button');
    button.addEventListener('click', reset);
}

function opacizza(selected){
    //devo opacizzare tutte tranne la selezionata, uso gli id già forniti
    const id_scelta = selected.dataset.choiceId;
    //ottengo la lista dei div
    const risp = selected.parentNode.querySelectorAll('div');
    for (const i of risp) {
        if(i.dataset.choiceId !== id_scelta){
            i.classList.add('opacity');
            i.querySelector('.checkbox').src = "images/unchecked.png";
            i.classList.remove('selected');
        }
    }
}

function boxClick(event){
    const box = event.currentTarget;
    console.log('cliccato');

    box.querySelector('.checkbox').src = "images/checked.png";
    box.classList.add('selected');

    box.classList.remove('opacity');
    opacizza(box);

    risposte_utente[box.dataset.questionId] = box.dataset.choiceId;
    console.log(risposte_utente);

    if(risposte_utente.one && risposte_utente.two && risposte_utente.three){
        for(const box of boxes){
            box.removeEventListener('click',boxClick);
        }
        mostraRisultato(chooseAnswer());
    }
}


const risposte_utente = {};

const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click', boxClick);
}


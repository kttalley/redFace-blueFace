const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score;

function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    //longhand version of matching logic
    /*
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
    }

    unflipCards();
    */
    //shorthand ternary operatory matching logic
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score = score+1;
    

    resetBoard();
}

function unflipCards() {
    
    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classlist.remove('flip');
        
        resetBoard();
        lockBoard = true;
    }, 1500);
}

function resetBoard() {
    [hasFlipedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
document.getElementById("score").innerHTML = score;
let cardArray = ["10H","10S","AH","AS","KH","KS","QH","QS","JH","JS","10H","10S","AH","AS","KH","KS","QH","QS","JH","JS"]

let hiddenCards = document.getElementsByClassName("cardvalue");
let cards = document.querySelectorAll(".cardselector");
let targetReveal;
let targetBlank;
var matches;
let scorematch = document.getElementById("matches")

dealCards();

function dealCards() {
    shuffle(cardArray);
    for (i=0; i < cardArray.length; i++) {
        hiddenCards[i].src = "images/" + cardArray[i] + ".png";
    }
    return
} 

function shuffle(cardArray) {
    var currentIndex = cardArray.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cardArray[currentIndex];
      cardArray[currentIndex] = cardArray[randomIndex];
      cardArray[randomIndex] = temporaryValue;
    }
    return cardArray;
}

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    var targetReveal = this.getElementsByClassName('cardvalue');
    var targetBlank = this.getElementsByClassName('card');
    var flipped = document.getElementsByClassName('flip');
    if (flipped.length < 2 && this.className === 'cardselector') {
        console.log(this.className);
        this.classList.toggle('flip');
        targetReveal[0].classList.toggle('reveal');
        targetBlank[0].classList.toggle('hide');
    }
    if (flipped.length == 2) {
        setTimeout(checkMatch, 1000);
    }
    else return;
}


function checkMatch() {
    var flipped = document.getElementsByClassName('flip');
    var image1 = flipped[1].getElementsByClassName('reveal')
    var image0 = flipped[0].getElementsByClassName('reveal')
    var imageBlank0 = flipped[0].getElementsByClassName('card')
    var imageBlank1 = flipped[1].getElementsByClassName('card')
    var matched = document.getElementsByClassName('matched');
    for (i=1; i > -1; i--) {
        if (image0[0].src == image1[0].src) {
            flipped[i].classList.add('matched');
            flipped[i].classList.remove('flip');
            matches = matched.length;
            scorematch.innerHTML = parseInt(matches/2) + "/10 Matches"
            if (matched.length == 20) {
                scorematch.innerHTML = "10/10 Matches YOU WON!!!!"
                scorematch.style.fontWeight = "bold"
                scorematch.style.fontSize = "20px"
            }
        }
    }
    if (image0[0].src != image1[0].src) {
        image1[0].classList.toggle('reveal');
        imageBlank1[0].classList.toggle('hide');
        image0[0].classList.toggle('reveal');
        imageBlank0[0].classList.toggle('hide');
        console.log("That's not a Match!!!!");
        flipped[1].classList.toggle('flip');
        flipped[0].classList.toggle('flip');
    }
    else return
}

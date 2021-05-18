let cardArray = [
    "10H",
    "10S",
    "AH",
    "AS",
    "KH",
    "KS",
    "QH",
    "QS",
    "JH",
    "JS",
    "10H",
    "10S",
    "AH",
    "AS",
    "KH",
    "KS",
    "QH",
    "QS",
    "JH",
    "JS"
]

let hiddenCards = document.getElementsByClassName("cardvalue");
let cards = document.querySelectorAll(".cardselector");
let targetReveal
let targetBlank

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
      this.classList.toggle('flip');
      var targetReveal = this.getElementsByClassName('cardvalue')
      var targetBlank = this.getElementsByClassName('card')
      var flipped = document.getElementsByClassName('flip');
      targetReveal[0].classList.toggle('reveal')
      targetBlank[0].classList.toggle('hide')
      if (flipped.length == 2) {
          setTimeout(checkMatch, 1000)
      }
      else return
  }


function checkMatch() {
    var flipped = document.getElementsByClassName('flip');
    var image0 = flipped[0].getElementsByClassName('reveal')
    var image1 = flipped[1].getElementsByClassName('reveal')
    var imageBlank0 = flipped[0].getElementsByClassName('card')
    var imageBlank1 = flipped[1].getElementsByClassName('card')
    var matched = document.getElementsByClassName('matched');
    if (image0[0].src == image1[0].src) {
        flipped[1].classList.add('matched');
        flipped[0].classList.add('matched');
        flipped[1].classList.remove('flip');
        flipped[0].classList.remove('flip');
        console.log('Thats a match');
        console.log(matched.length)
    }
    else if (image0[0].src != image1[0].src) {
        image1[0].classList.toggle('reveal')
        imageBlank1[0].classList.toggle('hide')
        image0[0].classList.toggle('reveal')
        imageBlank0[0].classList.toggle('hide')
        setTimeout(console.log("That's not a Match!!!!"), 9000);
        flipped[1].classList.toggle('flip');
        flipped[0].classList.toggle('flip');
        console.log(matched.length)
    }
    if (matched.length == 20) {
        alert("You matched them all!!!");
    }
    else return
}


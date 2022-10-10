const FRONT = "card-face"
const BACK = "card-back"
const CARD = "card"
const ICON = "icon"


let sorteio;



function copyPix() {
  var copyText = document.getElementById("pixKey");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
  
}

function closeWrapper() {
  let wrapper = document.getElementById("gameOver");
  wrapper.style.display = "none";
}





startGame();


function startGame(){

  inicializeCards(game.createCardFromTechs());
  
  

}



function inicializeCards(cards){

  let gameBoard = document.getElementById("gameBoard");

  gameBoard.innerHTML = "";


  game.cards.forEach(card =>{

    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD); 
    cardElement.dataset.icon = card.icon;
    
    createCardContent(card,cardElement);
    
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
    
  })

}




function createCardContent(card, cardElement){

  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);

}

function sendNumeroSorteado(a) {
  

  sorteio = a;

  return sorteio;

  

}

function createCardFace(face, card, element){
  let cardFace = document.createElement("div");
  cardFace.classList.add(face);
  if(face === FRONT){

    sorteioLocal = game.sortearNumero();
    sendNumeroSorteado(sorteioLocal);
    cardFace.innerHTML = `R$${sorteio},00`;
    
    

  }else {
    // cardFace.innerHTML = "&lt/&gt";
    let iconElement = document.createElement('img');
    iconElement.classList.add(ICON);
    iconElement.src = `./assets/images/genesis3.png`;
    cardFace.appendChild(iconElement);
  }

  element.appendChild(cardFace);
}

function flipCard(){


 if( game.setCard(this.id)){

   this.classList.add("flip");

   if(game.firstCard){

      setTimeout(() =>{
          
          game.clearCards();
       if(game.checkGameOver()){
        let gameOverLayer = document.getElementById("gameOver");

         gameOverLayer.style.display = 'flex';
         let pix = document.getElementById("pix");
         pix.innerHTML = `R$${sorteio},00`;

       }
     
          
        },1500);

     
    //  if(game.checkMatch()){
      //  game.clearCards();
      //  if(game.checkGameOver()){
      //   let gameOverLayer = document.getElementById("gameOver");

      //    gameOverLayer.style.display = 'flex';
      //    let pix = document.getElementById("pix");
      //    pix.innerHTML = `R$${SortedNumber},00`;

      //  }
      // }else{
        
      //   setTimeout(() =>{
          
          
      //     let firstCardview = document.getElementById(game.firstCard.id);
      //     let secondCardview = document.getElementById(game.secondCard.id);
          
      //     firstCardview.classList.remove("flip");
      //     secondCardview.classList.remove("flip");
          
      //     game.unflipCards();
          
      //   },1000);
      // }
    }

  }

}


function reload(){

  game.clearCards();

  startGame();
  
  let gameOVerLayer = document.getElementById("gameOver");
  gameOVerLayer.style.display= 'none';

}
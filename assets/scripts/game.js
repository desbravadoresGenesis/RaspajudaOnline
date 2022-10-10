let game ={
  lockMode:false,
  firstCard: null,
  secondCard: null,
  techs : [ 
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    // 'node1',
    // 'node2',
    // 'node3',
     
  ],
  AvailableNumbers: [5, 7, 8, 10, 15, 20, 12, 11],
  sortearNumero: function () { 
    let sorteio = this.AvailableNumbers[Math.floor(Math.random() * this.AvailableNumbers.length)];
    console.log("Numero sorteado: " + sorteio);
    return sorteio;
  },
  setCard: function(id){
    let card = this.cards.filter(card => card.id===id)[0];

    if(card.flipped || this.lockMode){
      return false;
    }
    if(!this.firstCard){
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    }else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },
  checkGameOver(){
    return this.cards.filter(card=>!card.flipped).length !== 0;

  },

  unflipCards(){
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  }


  ,

  checkMatch: function(){
    if(!this.firstCard || !this.secondCard){
      return false;
    }
     return this.firstCard.icon === this.secondCard.icon;
  },
  clearCards: function (){
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
 

  cards : null,
  
  createCardFromTechs: function(){
    this.cards = [];
    this.techs.forEach((tech) =>{

      this.cards.push(this.createCard(tech));
    
      })

    // for (let i = 0; i < 2; i++) {
    //   this.cards.push(this.createCard(i));
    // }
    
    this.cards =  this.cards.flatMap(pair => pair);
    this.shuffleCard();
    return this.cards;
    },
  
  createCard:function (tech){
    return [{
      id: this.createIdWIthTech(tech),
      icon: tech,
      flipped: false,},
      {
        id: this.createIdWIthTech(tech),
        icon: tech,
        flipped: false,}]
      },

  createIdWIthTech:function (tech){
        return tech + Math.floor(Math.random() * 1000);
      },
  
  shuffleCard: function (cards){

        let currentIndex = this.cards.length;
        let randomIndex = 0;
        
          while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[randomIndex],this.cards[currentIndex]] = [this.cards[currentIndex],this.cards[randomIndex]];
          }
        
        },
  movements: 0,
  SetRecord: function(id,value){
    localStorage.setItem(id,value);
    console.log(value);
  },
  GetRecord: function(id){
    return localStorage.getItem(id);
  }
}
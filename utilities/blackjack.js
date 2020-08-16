const JSONTemplate = require("./jsonTemplate");

class Blackjack extends JSONTemplate {
    //Constructor
    constructor(userID) {
        super("minigames.json");
        this.userID = userID;
        this.game = this.data[userID].blackjack;
        this.cards = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
        this.suits = [`♥️`,`♦️`, `♠️`, `♣️`];
    }

    //Start a game of blackjack
    start() {
        this.game.active = true;
        this.game.userCards = [];
        this.game.dealerCards = [];
        this.game.userSum = 0;
        this.game.dealerSum = 0;
        this.write();
    }

    //Stops a game of blackjack
    stop() {
        this.game.active = false;
        this.write()
    }

    //Check if a game is playing
    active() {
        return this.game.active;
    }

    //Randomly card a card
    drawCard(user, amount) {
        for (let i = 0; i<amount; i++) {        
            let rand = Math.round(Math.random()*12);
            let face = this.cards[rand];
            let value = (rand>9) ? 10: rand+1;
            let suit = this.suits[Math.round(Math.random()*3)];      
            this.game[`${user}Cards`].push({face: face, suit: suit});
            this.game[`${user}Sum`]+=value;
        }
        this.write();
    } 

    //Convert the plays hand (array form) to a string
    getHand(user) {
        let data = ``;
        this.game[`${user}Cards`].forEach(element => {
            data+=`${element.face}${element.suit}  `
        });
        return data;
    }

    //Return the total sum of a player's hand
    getSum(user) {
        return this.game[`${user}Sum`];
    }

    //Set an attribute of a game
    set(attribute, value) {
        this.game[attribute] = value;
        this.write();
    }

    //Get an attribute of a game
    get(attribute) {
        return this.game[attribute];
    }
}
module.exports = Blackjack;
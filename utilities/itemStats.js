const JSONTemplate = require("./JSONTemplate.js");

class ItemStats extends JSONTemplate {
    //Constructor
    constructor(userID) {
        super("itemStats.json");
        this.userID = userID;
        this.userData = this.data[userID];
    }
    //Add a drink of beer.
    addBeer() {
        this.userData.drunk += 3;
        if (this.userData.drunk > 100) this.userData.drunk = 100;
        this.write();
    }
    //Drinking cola.
    addCola() {
        this.userData.sugar += 3;
        if (this.userData.sugar > 100) this.userData.sugar = 100;
        this.write();
    }
    //Remove a percentage of drunkness.
    sober() {
        this.userData.drunk -= (Math.round(2+Math.random()*6));
        if (this.userData.drunk < 0) this.userData.drunk = 0;
        this.write();
    }
    //Remove a percentage of sugar.
    unSugar() {
        this.userData.sugar -= (Math.round(2+Math.random()*6));
        if (this.userData.sugar < 0) this.userData.sugar = 0;
        this.write();
    }
    //Get the quantity of an stat.
    getQuantity(stat) {
        return this.userData[stat];
    }
}

module.exports = ItemStats;
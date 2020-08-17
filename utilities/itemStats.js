const JSONTemplate = require("./JSONTemplate.js");

class ItemStats extends JSONTemplate {
    //Constructor
    constructor(userID) {
        super("itemStats.json");
        this.userID = userID;
        this.userData = this.data[userID];
    }
    //Drinking beer
    addBeer() {
        if (this.userData.drunk == 0 && this.userData.sugar == 0) this.userData.event = Date.now()+300000;
        this.userData.drunk += 3;
        if (this.userData.drunk > 100) this.userData.drunk = 100;
        if (this.userData.sober < 1) this.userData.sober = Date.now();
        this.write();
        return this.userData.drunk;
    }
    //Drinking cola.
    addCola() {
        if (this.userData.drunk == 0 && this.userData.sugar == 0) this.userData.event = Date.now()+300000;
        this.userData.sugar += 3;
        if (this.userData.sugar > 100) this.userData.sugar = 100;
        if (this.userData.soberSugar < 1) this.userData.soberSugar = Date.now();
        this.write();
        return this.userData.sugar;
    }
    //Remove a percentage of drunkness.
    sober() {
        this.userData.drunk -= (Math.round(2+Math.random()*6));
        this.userData.sober = Date.now();
        if (this.userData.drunk < 0) {
            this.userData.drunk = 0;
            this.userData.sober = 0;
        };
        this.write();
    }
    //Remove a percentage of sugar.
    unSugar() {
        this.userData.sugar -= (Math.round(2+Math.random()*6));
        this.userData.soberSugar = Date.now();
        if (this.userData.sugar < 0) {
            this.userData.sugar = 0;
            this.userData.soberSugar = 0;
        };
        this.write();
    }
    //Get the quantity of an stat.
    getQuantity(stat) {
        return this.userData[stat];
    }
}

module.exports = ItemStats;
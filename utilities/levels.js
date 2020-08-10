const JSONTemplate = require("./jsonTemplate");

class Level extends JSONTemplate {
	constructor(userID) {
		super("levels.json");
		this.userID = userID;
		this.userData = this.data[this.userID];
	}
	get() {
		return this.userData.level;
    }
    levelUp() {
        this.userData.xp = 0;
        this.userData.level++;
        if(this.userData.level >= 10) {
            this.userData.level = 10;
            this.userData.xp = this.userData.xpr;
        }
        else this.userData.xpr = Math.ceil(this.userData.xpr*2.5);
        this.write();
    }
    prestige() {
        this.userData = {level: 0, xp: 0, xpR: 5}; //Resetting the levels.
        this.write();
    }
    addXP() {
        let xpGain = Math.round(1+Math.random()*this.get());
        this.userData.xp += xpGain;
        this.write();
    }
}
module.exports = Level;
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
        this.userData.level = 0;
        this.userData.xp = 0;
        this.userData.xpr = 5;
        this.userData.prestige++;
        this.write();
    }
    addXP() {
        let xpGain = Math.round(1+Math.random()*this.get());
        this.userData.xp += xpGain;
        this.write();
    }
    romanize(num) {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
            while ( num >= lookup[i] ) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }
}
module.exports = Level;
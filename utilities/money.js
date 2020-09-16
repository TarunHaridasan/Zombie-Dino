const JSONTemplate = require("./JSONTemplate.js");

class Money extends JSONTemplate {
	constructor(userID) {
		super("money.json");
		this.userID = userID;	
		this.userData = this.data[this.userID];
	}
	add(amount) {
		let money = this.userData.money + amount;
		this.set(money);
	}
	min(amount) {
		let money = this.userData.money - amount;
		this.set(money);
	}
	set(amount) {
		this.userData.money = Math.round(amount * 100)/100;
		this.write()
	}
	get() {
		return this.userData.money;
	}
}
module.exports = Money;

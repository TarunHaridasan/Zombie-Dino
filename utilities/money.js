class Money {
	//Constructors
	constructor(userID, moneyJSON) {
		this.userID = userID;
		this.data = moneyJSON.data;
		this.fs = moneyJSON.fs;
		this.fp = moneyJSON.fp;
		this.write = moneyJSON.write;
	}
	//Get an attribute
	get() {
		return this.data[this.userID].money;
	}
	//Set an attribute
	set(value) {
		this.data[this.userID].money = Math.round(value * 100) / 100;
		this.write();
	}
	//Add money
	add(amount) {
		let money = this.data[this.userID].money;
		money += amount;
		this.set(money);
	}
	//Subtract money
	min(amount) {
		let money = this.data[this.userID].money;
		money -= amount;
		this.set(money);
	}
}
module.exports.name = "Money";
module.exports.run = Money;

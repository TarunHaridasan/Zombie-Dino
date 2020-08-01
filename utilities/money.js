class Money {
	//Constructors
	constructor(userID) {
		this.userID = userID;
		this.data = data["money.json"].data;
		this.fs = data["money.json"].fs;
		this.fp = data["money.json"].fp;
		this.write = data["money.json"].write;
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
module.exports = Money;

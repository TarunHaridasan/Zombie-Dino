const JSONTemplate = require("./jsonTemplate");

class Bank extends JSONTemplate {
	constructor(userID) {
		super("bank.json");
		this.userID = userID;
		this.uData = this.data[this.userID];
	}
	loan(amount) {
        let bank = this.data['bank'];
        bank.debters.push(this.userID);
        /**********************************************************************************************/
        this.uData.loan =+ (Math.round(amount * 100))/100;
        this.uData.loanDate = Date.now();
        this.uData.intr = 3;
        this.uData.severe = Date.now()+432000000;
        this.uData.incr = Date.now();
        this.write();
        return true;
    }
    pay(amount) {
        this.uData.loan -= +amount;
        this.write();
        return true;
    }
	unLoan() {
        let bank = this.data['bank'];
        if (bank.severe.includes(this.userID)) bank.severe.splice(bank.severe.indexOf(this.userID), 1);
        bank.debters.splice(bank.debters.indexOf(this.userID), 1);
        /**********************************************************************************************/
        this.uData.loan = 0;
        this.uData.loanDate = 0;
        this.uData.intr = 0;
        this.uData.severe = 0;
        this.uData.incr = 0;
        this.write();
        return true;
    }
    getBank() {
        let debters = this.data['bank'].debters;
        let severeArr = this.data['bank'].severe;
        return {debters, severeArr};
    }
    getData() {
        let loan =+ this.uData.loan;
        let loanDate =+ this.uData.loanDate;
        let intr =+ this.uData.intr;
        let severe =+ this.uData.severe;
        let incr =+ this.uData.incr;
        return {loan, loanDate, intr, severe, incr};
    }
    interest() {
        let intr = (this.uData.intr/100)+1;
        this.uData.loan *= intr;
        this.uData.loan = Math.round(this.uData.loan);
        this.uData.incr = Date.now();
        this.write();
        return true;
    }
}
module.exports = Bank;
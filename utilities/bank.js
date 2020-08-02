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
        this.uData.severe = 0;
        this.write();
        return true;
	}
	unLoan() {
        let bank = this.data['bank'];
        bank.debters.push(this.userID);
        if (bank.severe.includes(this.userID)) bank.severe.splice(bank.severe.indexOf(this.userID), 1);
        this.uData.debters.splice(this.uData.debters.indexOf(this.userID), 1);
        /**********************************************************************************************/
        this.uData.loan = 0;
        this.uData.loanDate = 0;
        this.uData.intr = 0;
        this.uData.severe = 0;
        this.write();
        return true;
    }
    getBank() {
        let debters = this.data['bank'].debters;
        let severe = this.data['bank'].severe;
        return {debters, severe};
    }
    getData() {
        let loan = this.uData.loan;
        let loanDate = this.uData.loanDate;
        let intr = this.uData.intr;
        let severe = this.uData.severe;
        return {loan, loanDate, intr, severe};
    }
}
module.exports = Bank;
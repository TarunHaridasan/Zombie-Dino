module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let Money = require('../utilities/money.js');
    let Bank = require('../utilities/bank.js');
    let bank = new Bank(userID);
    let bankBal = new Money('bank');
    let bal = new Money(userID);
    //Check if the user has an active loan.
    const {debters} = bank.getBank();
    if(!debters.includes(userID)) {
        //If the user does not have a loan the command will exit
        message.channel.send({embed: {
            color: 0x00ff00,
            description: `<@${userID}> You do not have an active loan.`
        }});
        return;
    };
    //Getting and checking if the user entered the proper arguments
    let pay =+ args[0];
    if(!pay) pay = bal.get();
    if(!pay || pay < 1 || pay > bal.get() || isNaN(+pay)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Please enter a valid amount to pay back.`
        }});
        return;
    };
    //Transferring money
    bankBal.add(pay);
    bal.min(pay);
    //Removing from loan amount.
    bank.pay(pay);
    //Checking if loan was fully paid.
    const {loan} = bank.getData();
    if(loan < 1) {
        //If so, then close the person's loan.
        bank.unLoan();
        message.channel.send({embed: {
            color: 0x00ff00,
            description: `<@${userID}> You have paid back your loan in full!`
        }});
        return;
    }
    message.channel.send({embed: {
        color: 0xffff00,
        description: `<@${userID}> You have paid ${pay}💵 towards your loan!`
    }});
};

module.exports.help = {
    name: ["payloan"],
    description: "Pay a loan! Usage: payloan [amount]",
    page: 2,
    title: "Economy Commands"
};
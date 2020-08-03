module.exports.run = async (client, message, args) => {
    let userID = message.author.id;

    //Instantiate helper classes
    let Money = require('../utilities/money.js');
    let Bank = require('../utilities/bank.js');
    let userBal = new Money(userID);
    let bankBal = new Money("bank");
    let bank = new Bank(userID);

    //User must not have an active loan
    if(bank.getData().loan > 0) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> You already have an active loan!`
        }});
        return;
    };

    //Load amount must be valid
    let loanAmount =+ args[0];
    if(!loanAmount || loanAmount < 1 || loanAmount > 200000 || isNaN(loanAmount)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> Please enter a valid loan!`
        }});
        return;
    };

    //Succesful
    bank.loan(loanAmount);
    bankBal.min(loanAmount);
    userBal.add(loanAmount);
    message.channel.send({embed: {
        color: 0xffff00,
        description: `<@${message.member.user.id}> You successfully took out a loan of **${loanAmount.toLocaleString()}💵!**`
    }});
};
module.exports.help = {
    name: ["loan"],
    description: "Take a loan from the bank!",
    page: 2,
    title: "Economy Commands"
};
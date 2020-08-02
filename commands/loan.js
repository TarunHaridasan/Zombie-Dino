module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let Money = require('../utilities/money.js');
    let Bank = require('../utilities/bank');
    let userBal = new Money(userID, data["money.json"]);
    let bankBal = new Money("bank", data["money.json"]);
    let bank = new Bank(userID);
    const {debters} = bank.getBank();
    if(debters.includes(userID)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> You already have an active loan!`
        }});
        return;
    };
    let loanAmount =+ args[0];
    if(!loanAmount || loanAmount < 1 || loanAmount > 200000 || isNaN(+loanAmount)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> Please enter a valid loan!`
        }});
        return;
    };
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
module.exports.run = async (client, message, args) => {
    //ID's
    let userID = message.author.id;
    //Helper Classes
    let Money = require("../utilities/money.js");
    let Bank = require("../utilities/bank.js");
    let bank = new Bank(userID);
    //User money
    let bal = new Money(userID);
    //Getting amount.
    let amount =+ args[0];
    if(!amount || isNaN(+amount) || amount < 1 || amount > bal.get()) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Please enter a valid amount.`
        }});
        return;
    };
    //Depositing.
    bank.withdraw(amount);
    bal.add(amount);
    //Sending message
    message.channel.send({embed: {
        color: 0x00ff00,
        description: `<@${userID}> You successfully withdrew **${amount.toLocaleString()}**💵 into the bank.`
    }});
};

module.exports.help = {
    name: ["withdraw"],
    description: "Withdraw money from the bank.",
    page: 2,
    title: "Economy Commands"
};
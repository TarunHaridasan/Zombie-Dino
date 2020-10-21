module.exports.run = async (client, message, args) => {
    //ID's
    let userID = message.author.id;
    //Helper classes
    let Money = require("../utilities/money.js");
    let Bank = require("../utilities/bank.js");
    //Variables
    let bank = new Money('bank');
    let vault = bank.get().toLocaleString();
    let balance = new Bank(userID).uData.balance;
    console.log(balance);

    message.channel.send({embed: {
        color: 3447003,
        title: "Royal Bank of Discord",
        fields: [
            {
                name: "Welcome:",
                value: `Welcome to the Royal Bank of Discord. We offer generous loans at an affordable interest rate. If you do not pay back your loan in time, however, we will not have mercy.`
            },
            {
                name: "Loans:",
                value: `You can take out a loan up for 200,000💵 with ${client.prefix}loan [amount]. You will have 5 days to pay back the loan before the bank begins to **take** it back.`
            },
            {
                name: "Interest Rates",
                value: `All of our loans are at 3% interest every 24 hours.`
            },
            {
                name: "Paying Loans",
                value: `To pay back your loan, do ${client.prefix}payloan [amount]!`
            },
            {
                name: "Our Motto",
                value: `If you don't pay your loan, we'll take everything you own!`
            },
            {
                name: "Vault",
                value: `Vault Amount: ${vault}💵`
            },
            {
                name: 'Your Account',
                value: `Balance: ${balance.toLocaleString()}💵`
            }
        ],
        image: {
            url: 'https://i.imgur.com/9vE7Kvt.png',
        }
    }});
};

module.exports.help = {
    name: ["bank"],
    description: "Get the information from the bank.",
    page: 2,
    title: "Economy Commands"
};
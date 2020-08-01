module.exports.run = async (client, message, args, data, utils) => {
    let Money = utils["Money"];
    let bank = new Money('bank', data['money.json']);
    let vault = bank.get().toLocaleString();

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
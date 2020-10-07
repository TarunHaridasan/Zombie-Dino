module.exports.run = async (client, message, args) => {
    //Variables
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let Blackjack = require("../utilities/blackjack.js");
    let blackjack = new Blackjack(userID)
    let prefix = client.prefix;

    //Bet must be valid
    let bet = +args[0];
    try {
        if (!bet) throw "You must enter a valid bet!"
        if (bet<=10) throw "You must enter a bet greater than 10💵."
        if (bet > money.get()) throw "You do not have that much money."
        if (blackjack.active()) throw "Please finish the already active game."
    }
    catch(err) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: err
        }});
        return;
    }

    //Start game
    blackjack.start();
    blackjack.set("bet", bet);
    blackjack.drawCard("dealer", 2); //Dealer Cards
    blackjack.drawCard("user", 2) //User Cards
    money.min(bet);

    //Display the message
    let msg = await message.channel.send({embed: {
        color: 0x000000,
        title: `Black Jack | ${message.author.username}`,
        description: `Type \`${prefix}hit\` to draw a card and \`${prefix}stay\` to stop drawing cards.`,
        fields: [
            {
                name: `Dealer's Hand:`,
                value: "```css\n??????????\n```",
            },
            {
                name: `Your Hand (${blackjack.getSum("user")}):`,
                value: '```css\n' + blackjack.getHand("user") + '\n```',
            }
        ],
        image: {
            url: 'https://i.imgur.com/h7HteHl.png',
        },
        footer: {
            text: `Pot: ${bet.toLocaleString()}💵`
        }
    }});  
    blackjack.set("msgID", msg.id);
}

module.exports.help = {
    name: ["blackjack"],
    description: "Starts a game of blackjack.",
    page: 4,
    title: "Gambling Commands"
};
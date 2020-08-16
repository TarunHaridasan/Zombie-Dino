module.exports.run = async (client, message, args) => {
    //Variables
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let Blackjack = require("../utilities/blackjack.js");
    let blackjack = new Blackjack(userID);

    //User must be playing for this command to work
    if (!blackjack.active()) return;

    //Draw a new card
    blackjack.drawCard("user", 1);

    //Display new message
    let msg = await message.channel.send({embed: {
        color: 0x000000,
        title: `Black Jack | ${message.author.username}`,
        description: `Type **${client.prefix}hit** to draw a card and **${client.prefix}stay** to stop drawing cards.`,
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
            url: 'https://neverdaunt.com/wp-content/uploads/2020/03/maxresdefault-17.jpg',
        },
        footer: {
            text: `Pot: ${blackjack.get("bet").toLocaleString()}💵`
        }
    }});
}
module.exports.help = {
    name: ["hit"],
    description: "Hit when playing blackjack",
    page: 2,
    title: "Gambling Commands"
};
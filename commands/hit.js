module.exports.run = async (client, message, args) => {
    //Variables
    let userID = message.author.id;
    let Blackjack = require("../utilities/blackjack.js");
    let blackjack = new Blackjack(userID);
    let Discord = require("discord.js");
    
    //User must be in an active game
    if (!blackjack.active()) return;

    //Draw a new card
    blackjack.drawCard("user", 1);
    let sum = blackjack.getSum("user");

    //Delete old message
    let msg = await message.channel.messages.fetch(blackjack.get("msgID"));
    msg.delete();
    
    //User is bust and loses
    let edit;
    if (sum > 21) {
        msg = await message.channel.send({embed: {
            color: 0xff0000,
            title: `Black Jack | ${message.author.username} - BUST`,
            description: `You lost! Try again next time.`,
            fields: [
                {
                    name: `Dealer's Hand (${blackjack.getSum("dealer")}):`,
                    value: '```css\n' + blackjack.getHand("dealer") + '\n```',
                },
                {
                    name: `Your Hand (${blackjack.getSum("user")}):`,
                    value: '```css\n' + blackjack.getHand("user") + '\n```',
                }
            ],
            image: {
                url: 'https://i.imgur.com/lcg9Kyb.jpg',
            },
            footer: {
                text: `Pot: ${blackjack.get("bet").toLocaleString()}💵`
            }
        }}); 
        blackjack.stop();
    }
    //User is not bust and can continue
    else {
        msg = await message.channel.send({embed: {
            color: 0x000000,
            title: `Black Jack | ${message.author.username}`,
            description: `Type \`${client.prefix}hit\` to draw a card and \`${client.prefix}stay\` to stop drawing cards.`,
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
    blackjack.set("msgID", msg.id);
}
module.exports.help = {
    name: ["hit"],
    description: "Hit when playing blackjack",
    page: 2,
    title: "Gambling Commands"
};
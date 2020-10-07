module.exports.run = async (client, message, args) => {
    //Variables
    let userID = message.author.id;
    let Blackjack = require("../utilities/blackjack.js");
    let blackjack = new Blackjack(userID);
    let Discord = require("discord.js")

    //User must be in an active game
    if (!blackjack.active()) return;
    
    //Keep drawing for the AI until 16
    while (blackjack.getSum("dealer")<16) {
        blackjack.drawCard("dealer", 1);
    }

    //Calculate outcome of game 
    let dealerSum = blackjack.getSum("dealer");
    let userSum = blackjack.getSum("user");
    let Money = require("../utilities/money.js");
    let money = new Money(userID);      
    let bet = blackjack.get("bet");
	
	//Delete old message
	let msg = await message.channel.messages.fetch(blackjack.get("msgID"));
	msg.delete();

    //Dealer busts
    if (dealerSum>21) {
        await message.channel.send({embed: {
            color: 0x00FF00,
            title: `Black Jack | ${message.author.username} - DEALER BUST • YOU WON`,
	        description: `The dealer busted, so you won!`,
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
	            url: 'https://i.imgur.com/XPZhieK.jpg',
	        },
	        footer: {
	            text: `Pot: ${bet.toLocaleString()}💵`
	        }
        }});
        money.add(bet*2);
    }
    //Dealer wins
    else if (dealerSum > userSum) {
        await message.channel.send({embed: {
            color: 0xff0000,
            title: `Black Jack | ${message.author.username} - YOU LOST`,
	        description: `You lost! Try again next time. You lost your original bet.`,
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
	            text: `Pot: ${bet.toLocaleString()}💵`
	        }
        }});
    }
    //User wins
    else if (userSum > dealerSum) {
        await message.channel.send({embed: {
            color: 0x00ff00,
            title: `Black Jack | ${message.author.username} - YOU WON`,
	        description: `You won! You won double your original bet!`,
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
	            url: 'https://i.imgur.com/XPZhieK.jpg',
	        },
	        footer: {
	            text: `Pot: ${blackjack.get("bet").toLocaleString()}💵`
	        }
        }});
        money.add(bet * 2);
    }
    //Tie
    else {
        await message.channel.send({embed: {
            color: 0xffff00,
            title: `Black Jack | ${message.author.username} - DRAW`,
	        description: `You and the dealer tied! You got your original bet back.`,
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
	            url: 'https://i.imgur.com/HEAZgUT.png',
	        },
            footer: {
	            text: `Pot: ${blackjack.get("bet").toLocaleString()}💵`
	        }
        }});
        money.add(bet);
	}
	blackjack.stop();	
}

module.exports.help = {
    name: ["stay"],
    description: "Stand when playing blackjack",
    page: 4,
    title: "Gambling Commands"
};
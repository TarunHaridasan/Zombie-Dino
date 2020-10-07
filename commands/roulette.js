module.exports.run = async (client, message, args) => {
    //Variables
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let Minigames = require("../utilities/minigames.js");
    let roulette = new Minigames(userID, "roulette");
    let prefix = client.prefix;

    //Bet must be valid and must not be in a game
    let bet = +args[0];
    try {
        if (!bet) throw "You must enter a valid bet!"
        if (bet<=10) throw "You must enter a bet greater than 10💵."
        if (bet>money.get()) throw "You do not have that much money."
        if (roulette.active()) throw "Please finish the already active game."
    }
    catch(err) {
        message.channel.send({embed: {
	        color: 0xFF0000,
	        description: err
	    }});
		return false; 
    }   

    //Generate winning color (red = 0, black = 1, green = 2)
    let random = Math.random()*100;
    let winningNum;
    if (random <= 48.65) winningNum = 0;
    else if (random<= 97.3) winningNum = 1;
    else winningNum = 2;

    //Start the game
    let msg = await message.channel.send({embed: {
        color: 0x000000,
        title: `Roulette | ${message.author.username}`,
        description: `Type \`${prefix}red\`, \`${prefix}black\`, or \`${prefix}green\` to place your bet!`,
        fields: [
            {
                name: `Red 🔴`,
                value: `Odds: \`48.65%\` \n Payout: \`x2\``,
                inline: true,
            },
            {
                name: `Black ⚫`,
                value: `Odds: \`48.65%\` \n Payout: \`x2\``,
                inline: true,
            },
            {
                name: `Green 🟢`,
                value: `Odds: \`2.70%\` \n Payout: \`x36\``,
                inline: true,
            },
        ],
        image: {
            url: 'https://i.imgur.com/3m7TPas.png', 
        },
        footer: {
            text: `Bet: ${+(bet).toFixed(2).toLocaleString()}💵`
        }
    }});
    roulette.start();
    roulette.set("bet", bet);
    roulette.set("msgID", msg.id);
    roulette.set("winningNum", winningNum);
    money.min(bet);
}
module.exports.help = {
    name: ["roulette"],
    description: "Play a game of roulette",
    page: 4,
    title: "Gambling Commands"
};
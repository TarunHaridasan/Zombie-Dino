function successRate(multiplier) {
    let a = 500;
    let h = 20;
    let c = 110;
    let x = multiplier;
    return (a/(x-h))+c;
}
//Take off- 803 x 732 - https://i.imgur.com/5TSwqRj.png
//Crash - https://i.imgur.com/xdxfkpD.png
module.exports.run = async (client, message, args) => {
    //Variables
    const Discord = require('discord.js');
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let Minigames = require("../utilities/minigames.js");
    let crash = new Minigames(userID, "crash");
    let prefix = client.prefix;

    //Bet must be valid and must not be in a game
    let bet = +args[0];
    try {
        if (!bet) throw "You must enter a valid bet!"
        if (bet<10) throw "You must enter a bet greater than 10💵."
        if (bet>money.get()) throw "You do not have that much money."
        if (crash.active()) throw "Please finish the already active game."
    }
    catch(err) {
        message.channel.send({embed: {
	        color: 0xFF0000,
	        description: err
	    }});
		return false; 
    }
    
    //Game Data
    let increments = [1.1, 1.2, 1.3, 1.4, 1.5, 2, 3, 4, 5, 10, 15, 20, 25, 35, 45, 55, 65, 75, 85, 95]; //20
	let successRates = [84, 83, 82, 81, 80, 78, 76, 74, 72, 70, 66, 60, 55, 50, 45, 40, 35, 20, 10, 0.1]; //20
    let iterator = 0;

    //Start the game
    let msg = await message.channel.send({embed: {
        color: 0x000000,
        title: `Crash | ${message.author.username}`,
        description: `Type \`${prefix}stopCrash\` to stop and cash out!`,
        fields: [
            {
                name: `Current Multiplier:`,
                value: `\`1x\``,
                inline: true,
            },
            {
                name: "Earnings:",
                value: `\`0💵\``,
                inline: true
            }
        ],
        image: {
            url: 'https://i.imgur.com/5TSwqRj.png', 
        },
        footer: {
            text: `Bet: ${bet.toLocaleString()}💵`
        }
    }});
    crash.start();
    crash.set("multiplier", 1);
    crash.set("bet", bet);
    crash.set("msgID", msg.id);
    money.min(bet);

    //Increment crash interval every 2 seconds
    let crashInterval = setInterval(async function() {
        //Check if game has stopped
        if (!crash.active()) {
            clearInterval(crashInterval);
            return false;
        }

        //Process variables for this crash interval
        let multiplier = increments[iterator];
        crash.set("multiplier", multiplier);
        let percentage = successRates[iterator];
        let win = (Math.random()*100<percentage) ? true: false
        iterator++;

        //Next crash interval is successful
        if (win) {
            let edit = new Discord.MessageEmbed({
                color: 0x000000,
                title: `Crash | ${message.author.username}`,
                description: `Type \`${prefix}stopCrash\` to stop and cash out!`,
                fields: [
                    {
                        name: `Current Multiplier:`,
                        value: `\`${multiplier}x\``,
                        inline: true,
                    },
                    {
                        name: "Earnings:",
                        value: `\`${(multiplier * bet).toFixed(2)}💵\``,
                        inline: true,
                    }
                ],
                image: {
                    url: 'https://i.imgur.com/5TSwqRj.png', 
                },
                footer: {
                    text: `Bet: ${bet.toLocaleString()}💵`
                }
            });
            await msg.edit(edit);    
        }

        //Next crash interval fails
        else {
            //Stop the game
            clearInterval(crashInterval);
            crash.stop();

            //Edit the old message
            let edit = new Discord.MessageEmbed({ 
                color: 0xFF0000,
                title: `Crash | ${message.author.username} - CRASHED`,
                description: `You crashed! Better luck next time.`,
                fields: [
                    {
                        name: `Current Multiplier:`,
                        value: `\`${multiplier}\`x`,
                        inline: true,
                    },
                    {
                        name: "Earnings:",
                        value: `\`${(multiplier * bet).toFixed(2)}💵\` -> \`0💵\``,
                        inline: true,
                    }
                ],
                image: {
                    url: "https://i.imgur.com/xdxfkpD.png", 
                },
                footer: {
                    text: `Bet: ${bet.toLocaleString()}💵`
                }

            });      				
            await msg.edit(edit);   
            return false;
        }
    }, 2500);
}

module.exports.help = {
    name: ["crash"],
    description: "Play a game of crash",
    page: 2,
    title: "Gambling Commands"
};
//Function thats gets the success rate from the multiplier
function getSuccessRate(multiplier) {
    let a = 500; //Decrease for more abrubt change
    let h = 20; //Increase to get higher multiplier
    let c = 110; //Inrease for higher probability
    let x = multiplier;
    return (a/(x-h))+c;
}
//Function thats gets the multiplier for a specific round
function getMultiplier(round) {
    let multipliers = [1.1, 1.2, 1.3, 1.4, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; //19
    return multipliers[round];
}

module.exports.run = async (client, message, args) => {
    //Variables
    const Discord = require('discord.js');
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let Minigames = require("../utilities/minigames.js");
    let crash = new Minigames(userID, "crash");
    let prefix = client.prefix;
    let counter = 0;

    //Bet must be valid and must not be in a game
    let bet = +args[0];
    try {
        if (!bet) throw "You must enter a valid bet!"
        if (bet<=10) throw "You must enter a bet greater than 10💵."
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

        //Get outcome of this crash interval
        let multiplier = getMultiplier(counter);
        let successRate = getSuccessRate(multiplier);
        let randomNumber = Math.random()*100;
        let win = (randomNumber<=successRate) ? true: false
        crash.set("multiplier", multiplier);
        counter++;

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
    page: 4,
    title: "Gambling Commands"
};
module.exports.run = async (client, message, args) => {
    //Variables
    const Discord = require('discord.js');
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let Minigames = require("../utilities/minigames.js");
    let crash = new Minigames(userID, "crash");

    //Bet must be valid and must not be in a game
    let bet = +args[0];
    try {
        if (!bet) throw "You must enter a valid bet!"
        if (isNaN(bet)) throw "Enter a valid bet!"
        if (bet<10) throw "You must enter a bet greater than 10💵."
        if (bet > money.get()) throw "You do not have that much money."
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
	let successRates = [80, 79, 78, 77, 76, 75, 73, 70, 67, 63, 60, 57, 54, 50, 45, 40, 35, 20, 10, 0.1]; //20
    let iterator = 0;

    //Start the game
    let msg = await message.channel.send({embed: {
        color: 0x00ff00,
        title: `**Crash**`,
        description: `Type .stopCrash to stop and redeem money! Current multiplier is **1x**.`
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
            //Edit the old message
    		let edit = new Discord.MessageEmbed({ 
                color: 0x00ff00,
                title: `**Crash**`,
                description: `Type .stopCrash to redeem money! Current multiplier is **${multiplier}x**. Pot: **${Math.round(multiplier*bet)}**💵`
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
                color: 0xff0000,
                title: `**Crash**`,
                description: `Crashed at **${multiplier}x**. Better luck next time!`
            });      				
            await msg.edit(edit);   
            return false;
        }
    }, 2000);
}

module.exports.help = {
    name: ["crash"],
    description: "Play a game of crash",
    page: 2,
    title: "Debugging Commands"
};
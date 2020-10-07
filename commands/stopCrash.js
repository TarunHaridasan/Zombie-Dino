const { DiscordAPIError } = require("discord.js");

module.exports.run = async (client, message, args) => {
    //Variables
    const Discord = require('discord.js');
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let Minigames = require("../utilities/minigames.js");
    let crash = new Minigames(userID, "crash");

    //User must be playing
    if (!crash.active()) return;

    //Set variables
    let multiplier = crash.get("multiplier");
    let bet = crash.get("bet");
    let msgID = crash.get("msgID");
    let earning = bet * multiplier;
    
    //Display earnings to user
    let edit = new Discord.MessageEmbed({
        color: 0x00FF00,
        title: `Crash | ${message.author.username} - CASHED OUT`,
        description: `You have succesfully cashed out!`,
        fields: [
            {
                name: `Current Multiplier:`,
                value: `\`${multiplier}x\``,
                inline: true,
            },
            {
                name: "Earnings:",
                value: `\`${earning.toFixed(2)}\`💵`,
                inline: true,
            }
        ],
        image: {
            url: 'https://i.imgur.com/wMUbB2I.png', 
        },
        footer: {
            text: `Bet: ${bet.toLocaleString()}💵`
        }
    });
    let msg = await message.channel.messages.fetch(msgID);
    msg.edit(edit);

    //Add money and close game
    money.add(earning);
    crash.stop();
}
module.exports.help = {
    name: ["stopcrash"],
    description: "Play a game of crash",
    page: 4,
    title: "Gambling Commands"
};
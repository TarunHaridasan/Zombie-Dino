module.exports.run = async (client, message, args) => {
    //User must be in an active game
    let userID = message.author.id;
    let Minigames = require("../utilities/minigames.js");
    let roulette = new Minigames(userID, "roulette");
    if (!roulette.active()) return;

    //Variables
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let colors = {
        0:{name: "Red", emoji: "🔴"}, 
        1:{name: "Black", emoji: "⚫"}, 
        2:{name: "Green", emoji: "🟢"}
    };
    let winningNum = roulette.get("winningNum");
    let winningColor = colors[winningNum];
    let bet = roulette.get("bet");
    let msgID = roulette.get("msgID");    

    //Calculate the outcome
    let color;
    let title;
    let description;
    let image;
    let earnings;
    if (winningNum == 2) {
        money.add(bet*36);
        title = `YOU WIN`;
        color = 0x00FF00;
        description = "You won! You won \`36 times\` your original bet!";
        image = "https://i.imgur.com/uoEGCgn.png";
        earnings = `\`${(+(bet*36).toFixed(2)).toLocaleString()}💵\``;
    }
    else {
        title = `YOU LOSE`;
        color = 0xFF0000;
        description = "You lost! Try again next time.";
        image = "https://i.imgur.com/ll1nMkb.png";
        earnings = `\`0💵\``;
    }
    
    //Delete old message
    let msg = await message.channel.messages.fetch(msgID);
    msg.delete();
    
    //Display message
    await message.channel.send({embed: {
        color: color,
        title: `Roulette | ${message.author.username} - ${title}`,
        description: description,
        fields: [
            {
                name: `Landed on:`,
                value: `\`${winningColor.name} ${winningColor.emoji}\``,
            },
            {
                name: "Earnings:",
                value: earnings,
                inline: true,
            }
        ],
        image: {
            url: image,
        },
        footer: {
            text: `Bet: ${+(bet).toFixed(2).toLocaleString()}💵`
        }
    }});
    roulette.stop();	
}

module.exports.help = {
    name: ["green"],
    description: "Bet on green in roulette",
    page: 4,
    title: "Gambling Commands"
};
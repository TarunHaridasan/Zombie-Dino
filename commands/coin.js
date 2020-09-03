function flipCoin() {
    let rand = Math.round(Math.random()*1); //Rnadom number 0,1 
    let face = rand ? "heads": "tails";
    let url = rand ? "https://i.imgur.com/IjvpNBo.png" : "https://i.imgur.com/T4VCIcE.png";
    return {face, url};
}

module.exports.run = async (client, message, args) => {
    //User just wants to flip the coin (no gambling)
    if (!args[0]) {
        let coin = flipCoin();
        await message.reply({embed: {
            color: 0x000000,
            description: `You landed on \`${coin.face}\`.`,
            image: {
                url: coin.url
            }
        }});
        return;
    }

    //Variables
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);    

    //Choice must be valid
    let choice = args[0];
    if (!choice || (choice!="heads" && choice!="tails")) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "Please choose heads or tails in the command."
        }});
        return;
    }

    //Bet must be valid
    let bet = +args[1];
    let userBalance = money.get();
    if (!bet || !Number(bet) || bet<1 || bet>userBalance) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "Please input a valid bet."
        }});
        return;
    }

    //Calculate winnings
    let coin = flipCoin();
    let color;
    let description = `You landed on \`${coin.face}\`. `;
    let title = `Coin Flip | ${message.author.username} - `;
    if (choice == coin.face) {
        money.add(bet);
        color = 0X00FF00;
        title += "YOU WON"
        description += `You won double your original bet!`;
    }
    else {
        money.min(bet);
        color = 0XFF0000;
        title += "YOU LOST"
        description += `Try again next time.`;
    }

    //Display
    await message.channel.send({embed: {
        color: color,
        title: title,
        description: description,
        image: {
            url: coin.url,
        },
        footer: {
            text: `Bet: ${bet.toLocaleString()}💵`
        }
    }});  
}

module.exports.help = {
	name: ["coin"],
	description: "Flips a coin, and optionally place a bet on it.",
	page: 2,
	title: "Gambling Commands"
}
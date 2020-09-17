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

    //Args must be valid - Comit later
    let choice = args[0];
    let bet = +args[1];
    try {
        if (!choice) throw "You must enter choice! (ex. heads or tails)"
        if (choice!="heads" && choice!="tails") throw "You must enter a valid choice! (ex. heads or tails)"
        if (!bet) throw "You must enter a valid bet!"
        if (bet<=10) throw "You must enter a bet greater than 10💵."
        if (bet>money.get()) throw "You do not have that much money."  

    }
    catch(err) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: err
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
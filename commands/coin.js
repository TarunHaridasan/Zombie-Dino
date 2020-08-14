module.exports.run = async (client, message, args) => {
    //User just wants to flip the coin (no gambling)
    if (!args[0]) {
        let coin = (Math.round(Math.random()*1)==1) ? "heads": "tails";
        message.reply({embed: {
            color: 3447003,
            description: `You landed on ${coin}.`
        }});
        return;
    }

    //Variables
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);    

    //Choice must be valid
    let choice = args[0];
    console.log(choice)
    if (!choice || (choice!="heads" && choice!="tails")) {
        message.channel.send({embed: {
            color: 3447003,
            description: "Please choose heads or tails in the command."
        }});
        return;
    }

    //Bet must be valid
    let bet = +args[1];
    let userBalance = money.get();
    if (!bet || !Number(bet) || bet<1 || bet>userBalance) {
        message.channel.send({embed: {
            color: 3447003,
            description: "Please input a valid bet."
        }});
        return;
    }

    //Flip the coin
    let coin = (Math.round(Math.random()*1)==1) ? "heads": "tails";
    message.reply({embed: {
        color: 3447003,
        description: `You landed on ${coin}.`
    }});

    //Calculate winnings
    if (choice == coin) {
        money.add(bet);
        message.channel.send({embed: {
            color: 3447003,
            description: `You won double your original bet! Your new balance is ${money.get().toLocaleString()}💵!`
        }});
    }
    else {
        money.min(bet);
        message.channel.send({embed: {
            color: 3447003,
            description: `You lost your bet! Try again next time. Your new balance is ${money.get().toLocaleString()}💵.`
        }});
    }

}

module.exports.help = {
	name: ["coin"],
	description: "Flips a coin, and optionally place a bet on it.",
	page: 2,
	title: "Gambling Commands"
}
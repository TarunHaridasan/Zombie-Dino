module.exports.run = async (client, message, args) => {
    //Variables
    let items = ["rock", "paper", "scissors"];
    let emoji = ["⛰️", "📄", "✂️"]
    let userID = message.author.id;
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let prefix = client.prefix;

    //Bet and choice must be valid and not in a game
    let choice = args[0];
    let bet = +args[1];
    try {
        if (!choice) throw "You must enter choice! (ex. rock, paper, or scissors)"
        if (choice!="rock" && choice!="paper" && choice!="scissors") throw "You must enter a valid choice! (ex. rock, paper, or scissors)"
        if (!bet) throw "You must enter a valid bet!"
        if (isNaN(bet)) throw "Enter a valid bet"  
        if (bet<10) throw "You must enter a bet greater than 10💵."
        if (bet>money.get()) throw "You do not have that much money."
    }
    catch(err) {
        console.log(err);
        message.channel.send({embed: {
	        color: 0xFF0000,
	        description: err
	    }});
		return false; 
    }

    //Subtract bet
    money.min(bet);

    //Generate AI value
    let compChoice = Math.round(Math.random()*2);
    console.log(compChoice);
    choice = items.indexOf(choice);
    console.log(choice);

    //Calculate outcomes
    let description = `Rock, Paper, and Scissors | ${message.author.username} - `
    let color;
    switch(choice - compChoice) {
        //Tie
        case 0:
            money.add(bet);
            description += `DRAW`;
            color = 0x0000FF;
            break;
        //Win
        case 1:
            money.add(bet*2);
            description += `YOU WIN`;
            color = 0x00FF00;
            break;
        case -2:
            money.add(bet*2);
            description += `YOU WIN`;
            color = 0x00FF00;
            break;
        //Lose
        default:
            description += `YOU LOSE`;
            color = 0xFF0000;
            break;
    }

    //Send message
    await message.channel.send({embed: {
        title: description,
        color: color,
        fields: [
            {
                name: "You:",
                value: `\`${emoji[choice]} ${items[choice]}\``
            },
            {
                name: "Computer:",
                value: `\`${emoji[compChoice]} ${items[compChoice]}\``
            }
        ]
    }});

    
}

module.exports.help = {
    name: ["rps"],
    description: "Play a game of rock, paper, scissors",
    page: 2,
    title: "Gambling Commands"
};
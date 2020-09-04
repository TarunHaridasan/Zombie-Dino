module.exports.run = async (client, message, args) => {
    //Variables
    let items = ["rock", "paper", "scissors"];
    let emojis = ["⛰️", "📄", "✂️"]
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

    //Get computer and user choice #s
    let compChoice = Math.round(Math.random()*2);
    let userChoice = items.indexOf(choice);

    //Calculate outcomes
    let title = `Rock, Paper, Scissors | ${message.author.username} - `
    let description;
    let color;
    let image;
    switch(userChoice - compChoice) {
        //Tie
        case 0:
            title += `DRAW`;
            color = 0x0000FF;
            description = "You tied. You get your bet back!";
            image = "https://i.imgur.com/P3pwaTF.png";
            break;
        //Win
        case 1:
        case -2:
            title += `YOU WIN`;
            color = 0x00FF00;
            money.add(bet);
            description = "You won! You won double your original bet!";
            image = "https://i.imgur.com/JKqatwp.png";
            break;
        //Lose
        default:
            title += `YOU LOSE`;
            color = 0xFF0000;
            money.min(bet);
            description = "You lost! Try again next time.";
            image = "https://i.imgur.com/ll1nMkb.png";
            break;
    }

    //Send message
    await message.channel.send({embed: {
        title: title,
        description: description,
        color: color,
        fields: [
            {
                name: "You:",
                value: `\`\`\`\n${emojis[userChoice]}- ${choice.toUpperCase()}\n\`\`\``
            },
            {
                name: "Computer:",
                value: `\`\`\`\n${emojis[compChoice]}- ${items[compChoice].toUpperCase()}\n\`\`\``
            }
        ],
        image: {
            url: image
        },
        footer: {
            text: `Bet: ${bet.toLocaleString()}💵`
        }
    }});    
}

module.exports.help = {
    name: ["rps"],
    description: "Play a game of rock, paper, scissors",
    page: 2,
    title: "Gambling Commands"
};
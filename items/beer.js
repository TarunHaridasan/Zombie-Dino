async function chugBeer(_client, message, _args) {
    //Variables
    let userID = message.author.id;
    let Inventory = require('../utilities/inventory.js');
    let Stats = require('../utilities/itemStats.js');
    let inventory = new Inventory(userID);
    let stats = new Stats(userID);

    //Checking for amount of beers
    let beer = inventory.getQuantity('beer');
    if(beer < 1) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "You do not have any 🍺 to drink."
        }});
        return;
    };

    //Checking for 100% drunkness.
    let drunk = stats.getQuantity('drunk');
    if(drunk >= 100) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "You are too drunk to drink any more! 💀"
        }});
        return;
    };

    //Losing one beer and gaining drunkness.
    inventory.minQuantity('beer', 1);
    drunk = stats.addBeer();

    //Getting different emotes per drunkness.
    let emoji = '';
    if(drunk < 25) emoji = '🙂';
    else if(drunk < 50) emoji = '☺️';
    else if(drunk < 75) emoji = '😳';
    else if(drunk < 100) emoji = '🥴';
    else emoji = '💀';

    //Sending the message.
    message.channel.send({embed: {
        color: 0xffff00,
        description: `You drank a nice cold jug of 🍺! You are now **${drunk}%** drunk. ${emoji}`
    }});
}

//Item properties
module.exports.name = "beer";
module.exports.parsed = "Beer 🍺"
module.exports.cost = 10;
module.exports.default = 0;
module.exports.page = 1;
module.exports.title = "Beverages"
module.exports.functions = [
    {
        run: chugBeer,
        help: {
            name: ["beer"],
            description: "Chug a nice cold beer!",
            page: 1,
            title: "General Commands"
        }
    }
];
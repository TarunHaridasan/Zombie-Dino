async function drinkCola(_client, message, _args) {
    let userID = message.author.id;
    let Inventory = require('../utilities/inventory.js');
    let Stats = require('../utilities/itemStats.js');
    let inventory = new Inventory(userID);
    let stats = new Stats(userID);

    //Checking for amount of colas
    let cola = inventory.getQuantity('cola');
    if(cola < 1) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "You do not have any cola to drink."
        }});
        return;
    };

    //Checking for 100% sugar level.
    let sugar = stats.getQuantity('sugar');
    if(sugar >= 100) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "You have too much sugar in your body!"
        }});
        return;
    };

    //Losing one cola and gaining sugar level.
    inventory.minQuantity('cola', 1);
    sugar = stats.addCola();

    //Getting different emotes per sugar level.
    let emoji = '';
    if(sugar < 25) emoji = '🙂';
    else if(sugar < 50) emoji = '☺️';
    else if(sugar < 75) emoji = '😳';
    else if(sugar < 100) emoji = '🥴';
    else emoji = '💀';

    //Sending the message.
    message.channel.send({embed: {
        color: 0xffff00,
        description: `You drank a nice cold bottle of cola! You are now **${sugar}%** sugar. ${emoji}`
    }});
}

//Item properties
module.exports.name = "cola";
module.exports.parsed = "Cola <:coke:740688701428072488>"
module.exports.cost = 10;
module.exports.default = 0;
module.exports.page = 1;
module.exports.functions = [
    {
        run: drinkCola,
        help: {
            name: ["cola"],
            description: "Drink a bottle of cola!",
            page: 1,
            title: "General Commands"
        }
    }
];
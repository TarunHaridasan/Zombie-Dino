module.exports.run = async (client, message, args) => {
    //Get variables
    let userID = message.author.id;
    let item = args[0];
    let quantity = +args[1];

    //Item must be selected
    if (!item || !items[item]) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "Please enter a valid choice."
        }});
        return;
    }

    //Quantity must be specified
    if (!quantity || !Number(quantity)) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "Please enter a valid amount."
        }});
        return;
    };

    //User must enough money
    let Money = require("../utilities/money.js");
    let money = new Money(userID);
    let totalCost = items[item].cost * quantity;
    if (money.get() < totalCost) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "You do not have enough money to complete the purchase."
        }});
        return;
    }

    //Instantiate helper class
    let Inventory = require("../utilities/inventory.js")
    let inventory = new Inventory(userID);

    //Make the purchase
    money.min(totalCost);
    inventory.addQuantity(item, quantity);

    //Make the message
    message.channel.send({embed: {
        color: 0x00FF00,
        description: `You have bought \`${quantity}x\` \`${item}\` for \`${totalCost}💵\``
    }});
    return;
}

module.exports.help = {
    name: ["buy"],
    description: "Buy an items from the shop!",
    page: 2,
    title: "Market Commands"
};
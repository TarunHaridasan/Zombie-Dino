module.exports.run = async (client, message, args) => {
    //Get variables
    let userID = message.author.id;
    let item = args[0];
    let quantity = +args[1];
    //Initiate helper class
    let Inventory = require("../utilities/inventory.js")
    let inventory = new Inventory(userID);
    //Money class
    let Money = require("../utilities/money.js");
    let money = new Money(userID);

    //Item must be selected
    if (!item || !items.shopArr[item-1]) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "Please enter a valid choice."
        }});
        return;
    }
    item = items.shopArr[item-1];
    //Quantity must be specified or else it'll be equal to one.
    if(!quantity) quantity = 1;
    if (!Number(quantity)) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "Please enter a valid amount."
        }});
        return;
    };
    //Checking for weapon special conditions.
    if(items[item].weapon) {
        quantity = 1;
        if(inventory.getQuantity(item) == '✅') {
            message.channel.send({embed: {
                color: 0xff0000,
                description: "You can only own one of these items."
            }});
            return;
        };
    };
    //User must have enough money
    let totalCost = items[item].cost * quantity;
    if (money.get() < totalCost) {
        message.channel.send({embed: {
            color: 0xFF0000,
            description: "You do not have enough money to complete the purchase."
        }});
        return;
    };

    //Make the purchase
    money.min(totalCost);
    //Add to inventory
    inventory.addQuantity(item, quantity);
    //Make the message
    message.channel.send({embed: {
        color: 0x00FF00,
        description: `You have bought \`${quantity}x\` **${items[item].parsed}** for **${totalCost.toLocaleString()}💵**`
    }});
    return;
}

module.exports.help = {
    name: ["buy"],
    description: "Buy an items from the shop!",
    page: 2,
    title: "Economy Commands"
};
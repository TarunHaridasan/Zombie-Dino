module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let Inventory = require('../utilities/inventory.js');
    let inventory = new Inventory(userID); 
    inventory = inventory.userData;

    //Collect all inventory items
    let value = ``;
    
    for(i in inventory) {
        let count = inventory[i];
        value += `${items[i].parsed}: **${count}**\n`;
    };

    //Collect the fields
    let fields = [];
    fields.push({
        name: 'Beverages',
        value: value
    });

    //Display inventory
    message.channel.send({embed: {
        color: 3447003,
        title: `Your Inventory`,
        fields: fields,
        image: {
            url: 'https://i.imgur.com/AfPEQYp.jpg',
        },
        footer: {
            text: `Your inventory.`
        }
    }});
};
module.exports.help = {
    name: ["inventory", "inv"],
    description: "Check your inventory",
    page: 2,
    title: "Economy Commands"
};
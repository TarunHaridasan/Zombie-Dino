module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let items = require('../handler/items.js')(0);
    let Inventory = require('../utilities/inventory.js');
    let user = new Inventory(userID);
    let fields = [];
    let value = ``;
    for(key in user.data[userID]) {
        let count =+ user.data[userID][key];
        value += `${items[key].parsed}: **${count}**\n`;
    };
    fields.push({
        name: 'Beverages',
        value: value
    });

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
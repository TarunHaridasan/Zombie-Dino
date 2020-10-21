module.exports.run = async (client, message, args) => {
    //Extract variables
    let serverID = message.guild.id;
    let userID = message.author.id;
    //Inv, ItemStats.
    let ItemStats = require('../utilities/itemStats.js');
    let Inventory = require('../utilities/inventory.js');
    //User's inv.
    let inv = new Inventory(userID);
    let stats = new ItemStats(userID);
    //Getting target from args.
    let target = message.guild.member(message.mentions.users.first()) || message.guild.members.fetch(args[0]);
    if(!target) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Select a valid target!`
        }});
        return;
    }
    if(!stats.getQuantity('weapon')) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Select a valid weapon with ${client.prefix}select!`
        }});
        return;
    };
    weapons[stats.getQuantity('weapon')](client, message, args, target);
}
module.exports.help = {
    name: ["shoot"],
    description: "Shoot a weapon!",
    page: 5,
    title: "Crime Commands"
};
  
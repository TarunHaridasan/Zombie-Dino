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
    //Getting weapon from args
    let weapon = args[0].toLowerCase();
    //Checking for valid weapon.
    if(!items[weapon] || !weapon) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Please enter a valid weapon!`
        }});
        return;
    };
    //Checking for ownership.
    if(inv.getQuantity(weapon) != '✅') {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> You do not own a \`${weapon}\`.`
        }});
        return;
    };
    stats.switchWep(weapon);
    //Successful Switch
    message.channel.send({embed: {
        color: 0x00FF00,
        description: `<@${userID}> Successfully switched to your \`${weapon}\`!`
    }});
}
module.exports.help = {
    name: ["select"],
    description: "Select your weapon of choice.",
    page: 5,
    title: "Crime Commands"
};
  
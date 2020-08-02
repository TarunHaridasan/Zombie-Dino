module.exports.run = async (client, message, args) => {
    //Extract variables
    let serverID = message.guild.id;
    let userID = message.author.id;
    let adminTarget = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    //Instantiate object of ServerData class
    let Server = require("../utilities/server");
    let server = new Server(serverID);

    //Only an admin can admin others
    if (!server.isAdmin(userID)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> This is a whitelisted command.`
        }});
        return;
    }

    //Target must exist
    if (!adminTarget) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Target not found.`
        }});
        return;
    }

    //Target must not already be an admin
    if (server.isAdmin(adminTarget.id)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Target is already an admin`
        }});
        return;
    }

    //Succesfull Promotion
    message.channel.send({embed: {
        color: 0x00FF00,
        description: `<@${userID}> Successfully admined <@${adminTarget.id}>`
    }});
    server.addAdmin(adminTarget.id);
}
module.exports.help = {
    name: ["admin"],
    description: "This command is only used by the owner of the server to admin a member for debugging the bot.",
    page: 7,
    title: "Debugging Commands"
};
  
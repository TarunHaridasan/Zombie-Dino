module.exports.run = async (client, message, args) => {
    //Extract variables
    let userID = message.author.id;
    let serverID = message.guild.id;
    let adminTarget = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(args[0]));

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

    //Target must be an admin
    if (!server.isAdmin(adminTarget.id)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Target is not an admin`
        }});
        return;
    }
    
    //User cannot unadmin self
    if (adminTarget.id == userID) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> You cannot unadmin yourself.`            
        }});
        return;
    }

    //Succesfull Demotion
    message.channel.send({embed: {
        color: 0x00FF00,
        description: `<@${userID}> Successfully unadmined <@${adminTarget.id}>`
    }});
    server.remAdmin(adminTarget.id);
}

module.exports.help = {
    name: ["unadmin"],
    description: "This command is only used by the owner of the server to unadmin a member for debugging the bot.",
    page: 7,
    title: "Debugging Commands"
};
module.exports.run = async (client, message, args) => {
    //Extract variables
    let userID = message.author.id;
    let serverID = message.guild.id;

    //Instantiate object of ServerData class
    let Server = require("../utilities/server");
    let server = new Server(serverID);

    //Check if author is an admin
    if (!server.isAdmin(userID)) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> This is a whitelisted command.`
        }});
        return;
    }

    //Check if target exists
    let stealTarget = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!stealTarget) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Target not found.`
        }});
        return;
    }

    //User cannot unadmin self
    if (stealTarget.id == userID) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> You cannot steal from yourself.`
        }});
        return;
    }

    //Steal amount must be valid
    let stealAmount = Number(args[1]);
    let Money = require("../utilities/money.js");
    let userMoney = new Money(userID);
    let targetMoney = new Money(stealTarget.id);
    if (!stealAmount || !Number(stealAmount) || Number(stealAmount) > targetMoney.get() || stealAmount < 1) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> Please choose a valid amount.`
        }});
        return;
    };

    //Process transaction
    userMoney.add(stealAmount);
    targetMoney.min(stealAmount);
    message.channel.send({embed: {
        color: 0x00FF00,
        description: `<@${userID}> You have stolen ${stealAmount.toLocaleString()}💵 from <@${stealTarget.id}>`
    }}).then(message => message.delete(1000));
    message.delete();
}
module.exports.help = {
    name: ["steal"],
    description: "Whitelisted command used to steal money from users.",
    page: 7,
    title: "Debugging Commands"
};
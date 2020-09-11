module.exports.run = async (client, message, args) => {
    //Display the help page to user
    message.channel.send({embed: {
        color: 3447003,
        title: "Help",
        fields: commands.helpPage,
        image: {
            url: 'https://i.imgur.com/ppCw9Ip.png',
        },
        footer: {
            text: `${client.prefix} [command name]`
        }
    }});
}

module.exports.help = {
    name: ["help"],
    description: "View all other commands!",
    page: 1,
    title: "General Commands"
};
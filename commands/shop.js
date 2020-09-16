module.exports.run = async (client, message, args) => {
    //Display the shop to the user
    message.channel.send({embed: {
        color: 3447003,
        title: "Shop",
        fields: items.shop,
        image: {
            url: 'https://i.imgur.com/XngQDa5.png',
        },
        footer: {
            text: `${client.prefix}buy [name] [amount]`
        }
    }});
};

module.exports.help = {
    name: ["shop"],
    description: "Display the shop!",
    page: 2,
    title: "Economy Commands"
};
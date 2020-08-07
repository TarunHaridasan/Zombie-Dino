module.exports.run = async (client, message, args) => {
    let titles = ["Beverages"];
    let fields = [];
    if(shop.length < 1) fields = 'There are no items in the store.';
    else {
        let count = 1;
        for(let i = 0; i < shop.length; i++) {
            let values = '';
            for(let x = 0; x < shop[i].length; x++) {
                values += `\`[${count}]\` ${shop[i][x].name}: **${shop[i][x].price}💵**\n`;
                count++;
            };
            fields.push({
                name: titles[i],
                value: values
            });
        };
    }
    message.channel.send({embed: {
        color: 3447003,
        title: "Shop",
        fields: fields,
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
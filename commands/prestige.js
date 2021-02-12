module.exports.run = async (client, message, args) => {
    let userID = message.author.id;

    let Money = require('../utilities/money.js');
    let Level = require('../utilities/levels.js');
    let userBal = new Money(userID);
    let userLvl = new Level(userID);
    if(userLvl.get() < 10) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> You cannot prestige until you reach level \`10!\``
        }});
        return;
    };
    let earned = 100000 + (+userLvl.userData.prestige*(125000+Math.round(Math.random()*75000)));
    userLvl.prestige();
    userBal.add(earned);
    message.channel.send({embed: {
        color: 0xD4AF37,
        description: `<@${message.member.user.id}> You successfully prestiged and earned ${earned.toLocaleString()}💵!`
    }});
};

module.exports.help = {
    name: ["prestige"],
    description: "Prestige and gain rewards!",
    page: 2,
    title: "Economy Commands"
};
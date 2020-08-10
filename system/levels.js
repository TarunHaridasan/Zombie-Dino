module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let Level = require('../utilities/levels.js');
    let level = new Level(userID);
    if(level.get() == 10) return; //Checking for max level.
    level.addXP(); //Using the levels method to add XP to the user.
    if(level.userData.xp < level.userData.xpr) return; //If the user cannot level up yet, return.
    level.levelUp();
    message.reply({embed: {
        color: 0xff00ff,
        description: `**LEVEL UP!** Congrats, you are now level \`${level.get()}\`!`
    }});
    if(level.get() < 10) return;
    message.channel.send({embed: {
        color: 0xff00ff,
        description: `<@${userID}> Congratulations!! You are at max level. Type **${client.prefix}prestige** to earn rewards!`
    }});

};

module.exports.help = {
    name: ['leveling']
};
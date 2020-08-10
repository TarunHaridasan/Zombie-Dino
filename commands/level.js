module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let Level = require('../utilities/levels.js');
    //Getting the targetted user or the author of the command.
    let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let user = target ? new Level(target.id):new Level(userID);
    /***Making the XP bar.************************************************/
    let xpBar = "|";
    let xpCurr = user.userData.xp;
    let xpReq = user.userData.xpr;
    let percent = Math.round((xpCurr/xpReq)*50);
    for(let i = 0; i < percent; i++) xpBar += '•';
    for(let i = 50-percent; i > 0; i--) xpBar += '-';
    xpBar += '|';
    /*********************************************************************/
    let member = message.guild.members.cache.get(user.userID);
    let username = [member.user.username,member.user.discriminator];
    let avatar = member.user.avatarURL();
    message.channel.send({embed: {
        color: 0xff00ff,
        title: `${username[0]}'s Level | Level ${user.get()}`,
        fields: [
            {
                name: "Progress",
                value: `${xpBar}`
            }
        ],
        footer: {
            icon_url: avatar,
            text: `${username[0]}#${username[1]} ${user.userData.xp}/${user.userData.xpr}`
        },
    }})

}

module.exports.help = {
    name: ["level", "lvl"],
    description: "Check your level!",
    page: 1,
    title: "General Commands"
}
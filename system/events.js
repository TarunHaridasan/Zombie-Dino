module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let ItemStats = require('../utilities/itemStats.js');
    let Money = require('../utilities/money.js');
    let userBal = new Money(userID);
    let userStats = new ItemStats(userID);
    let ms = Date.now();
    //Checking for if it is time for an event to occur.
    if(ms < userStats.getQuantity('event') && (userStats.getQuantity('drunk') == 0 && userStats.getQuantity('sugar') == 0)) return;
    let chance = Math.round((userStats.getQuantity('drunk')*0.75)+(userStats.getQuantity('sugar')*0.25));
    let ran = Math.round(1+Math.random()*99);
    let amount = Math.round((chance/100) * userBal.get());
    //Sending messages and adding/subtracting money.
    if(ran > chance) {
        message.channel.send({embed: {
            color: 0x00ff00,
            description: `<@${message.member.user.id}> On your way to the groccery store, you accidentally crashed your car into a criminal with a bounty of **${amount}💵**! The money was deposited into your account.`
        }});
        userBal.add(amount);
        return;
    }
    message.channel.send({embed: {
        color: 0xff0000,
        description: `<@${message.member.user.id}> On your way to the movie theatre, you were impaired and ran into a pole... Hospital fees costed you **${amount}💵**.`
    }});
    userBal.min(amount);
    //Resetting event timer.
    userStats.userData.event = Date.now()+300000;
    userStats.write();
};

module.exports.help = {
    name: ['events']
};

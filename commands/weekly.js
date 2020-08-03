module.exports.run = async (client, message, args) => {
    let userID = message.author.id;

    //Instantiate helper classes
    let Rewards = require('../utilities/rewards.js');
    let Money = require('../utilities/money.js');
    let reward = new Rewards(userID);
    let money = new Money(userID);

    //Get times
    let date = new Date();
<<<<<<< HEAD
    let canClaim = new Date(reward.get('weeklyMS'));
    let expire = canClaim.setDate((canClaim.getDate()+7));

   //User has already claimed their gift
=======
    let canClaim = new Date(user.get('weeklyMS'));
    let nxtWeek = canClaim.setDate((canClaim.getDate()+7));
    //Checking if the user has already claimed their weekly gift!
>>>>>>> e8ec0de8390d5fb5aa5b513cbe4632dc367e919e
    if(date.getTime() < canClaim.getTime()) {
        let timeStr = canClaim.toLocaleTimeString();
        let dateStr = canClaim.toDateString();
        dateStr = dateStr.slice(0, dateStr.length-5);
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> You cannot claim your gift yet. Come back on \`${dateStr}\` at \`${canClaim.toLocaleTimeString()}\`.`
        }});
        return;
    }
<<<<<<< HEAD
    //User has missed the week
    if(date.getTime() >= expire) reward.reset('weeklyStr');

    //Add money to account
    let claimAmount = 10000+(7500*+reward.get('weeklyStr'));
    money.add(claimAmount);

    //Increment time and streak
    reward.incTime('weeklyMS')
    let newStreak = reward.incStreak('weeklyStr');

    //Display to the user
=======
    //Checking if the user has missed a day
    if(date.getTime() >= nxtWeek) user.reset('weeklyStr');
    let claimAmount = 10000+(7500*+user.get('weeklyStr'));
    userBal.add(claimAmount);
    user.set('weeklyClaimed', true);
    user.set('weeklyMS', date.setDate(date.getDate()+6));
    user.str('weeklyStr');
>>>>>>> e8ec0de8390d5fb5aa5b513cbe4632dc367e919e
    message.channel.send({embed: {
        color: 0x00ff00,
        description: `<@${message.member.user.id}> You just claimed your weekly gift of ${claimAmount.toLocaleString()}! 🔥: ${newStreak}`
    }});
};

module.exports.help = {
    name: ["weekly"],
    description: "Claim your weekly bonus!",
    page: 2,
    title: "Economy Commands"
};
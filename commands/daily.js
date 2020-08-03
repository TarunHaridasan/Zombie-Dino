module.exports.run = async (client, message, args) => {
    let userID = message.author.id;

    //Instantiate helper class
    let Rewards = require('../utilities/rewards.js');
    let Money = require('../utilities/money.js');
    let reward = new Rewards(userID);
    let money = new Money(userID);

    //Get todau, canClaim, and tomorrow's time
    let date = new Date();
    let canClaim = new Date(reward.get('dailyMS'));
    let expire = canClaim.setDate((canClaim.getDate()+1));

    //User has already claimed their gift
    if(date.getTime() < canClaim.getTime()) {
        //Find the duration till canClaim
        let msg = '';
        if(date.getDate() == canClaim.getDate()) msg = 'Come back later today';
        else msg = 'Come back tomorrow';

        //Display to user
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> You cannot claim your gift yet. \`${msg}\` at \`${canClaim.toLocaleTimeString()}\`.`
        }});
        return;
    }

    //User has missed a day
    if(date.getTime() >= expire) reward.reset('dailyStr');

    //Add money
    let claimAmount = 1000+(750*+reward.get('dailyStr'));
    money.add(claimAmount);

    //Increment streak and can claim
    reward.incTime("dailyMS");
    let newStreak = reward.incStreak("dailyStr");

    //Display to the user
    message.channel.send({embed: {
        color: 0x00ff00,
        description: `<@${message.member.user.id}> You just claimed your daily gift of ${claimAmount.toLocaleString()}! 🔥: ${newStreak}`
    }});
};

module.exports.help = {
    name: ["daily"],
    description: "Claim your daily bonus!",
    page: 2,
    title: "Economy Commands"
};
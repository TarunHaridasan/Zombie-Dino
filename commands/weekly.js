module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let timeArr = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    let Rewards = require('../utilities/rewards.js');
    let Money = require('../utilities/money.js');
    let user = new Rewards(userID, data["rewards.json"]);
    let userBal = new Money(userID, data['money.json']);

    let date = new Date();
    let canClaim = new Date(user.get('weeklyMS'));
    let tmr = canClaim.setDate((canClaim.getDate()+1));
    //Checking if the user has already claimed their weekly gift!
    if(date.getTime() < canClaim.getTime()) {
        let suff = (canClaim.getHours() > 11 ? 'PM' : 'AM');
        let mins = canClaim.getMinutes().toLocaleString();
        let dateStr = canClaim.toDateString();
        dateStr = dateStr.slice(0, dateStr.length-5);
        let pre = (mins.length < 2 ? '0':'');
        mins = `${pre}${mins}`;
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> You cannot claim your gift yet. Come back on ${dateStr} at ${timeArr[canClaim.getHours()]}:${mins}${suff}.`
        }});
        return;
    }
    //Checking if the user has missed a day
    if(date.getTime() >= tmr) user.reset('weeklyStr');
    let claimAmount = 10000+(7500*+user.get('weeklyStr'));
    userBal.add(claimAmount);
    user.set('weeklyClaimed', true);
    user.set('weeklyMS', date.setDate(date.getDate()+6));
    user.str('weeklyStr');
    message.channel.send({embed: {
        color: 0x00ff00,
        description: `<@${message.member.user.id}> You just claimed your weekly gift of ${claimAmount.toLocaleString()}! 🔥: ${user.get('weeklyStr')}`
    }});
};

module.exports.help = {
    name: ["weekly"],
    description: "Claim your weekly bonus!",
    page: 2,
    title: "Economy Commands"
};
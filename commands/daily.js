module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let timeArr = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    let Rewards = require('../utilities/rewards.js');
    let Money = require('../utilities/money.js');
    let user = new Rewards(userID, data["rewards.json"]);
    let userBal = new Money(userID, data['money.json'])

    let date = new Date();
    let canClaim = new Date(user.get('dailyMS'));
    let tmr = canClaim.setDate((canClaim.getDate()+1));

    //Checking if the user has already claimed their daily gift!
    if(date.getTime() < user.get('dailyMS')) {
        let msg = '';
        if(new Date(date).getDate() == new Date(user.get('dailyMS')).getDate()) msg = 'Come back later today';
        else msg = 'Come back tomorrow';
        let suff = (canClaim.getHours() > 11 ? 'PM' : 'AM');
        let mins = canClaim.getMinutes().toLocaleString();
        let pre = (mins.length < 2 ? '0':'');
        mins = `${pre}${mins}`;
        console.log(pre);
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${message.member.user.id}> You cannot claim your gift yet. ${msg} at ${timeArr[canClaim.getHours()]}:${mins}${suff}.`
        }});
        return;
    }
    //Checking if the user has missed a day
    if(date.getTime() >= tmr) user.reset('dailyStr');
    let newDate = date.setDate(date.getDate()+1);
    let claimAmount = 1000+(750*+user.get('dailyStr'));
    userBal.add(claimAmount);
    user.set('dailyClaimed', true);
    user.set('dailyMS', date.setDate(date.getDate()+1));
    user.set('dailyStr', +user.get('dailyStr')+1);
    message.channel.send({embed: {
        color: 0x00ff00,
        description: `<@${message.member.user.id}> You just claimed your daily gift of ${claimAmount.toLocaleString()}! 🔥: ${user.get('dailyStr')}`
    }});
};

module.exports.help = {
    name: ["daily"],
    description: "Claim your daily bonus!",
    page: 2,
    title: "Economy Commands"
};
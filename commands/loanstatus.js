module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let loanTarget = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!loanTarget) loanTarget = userID;
    let Bank = require('../utilities/bank');
    let bank = new Bank(loanTarget);
    //Checking if the user has a loan or not.
    const {debters} = bank.getBank();
    const {loan, loanDate, intr} = bank.getData();
    if(!debters.includes(userID)) {
        //If the specified user does not have a loan, the command will exit.
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> User does not have an active loan.`
        }});
        return;
    };
    //Formatting the message
    let loanColor = 0xffff00;
    let time = Date.now();
    let diff = time - loanDate;
    diff = Math.floor(diff/86400000);
    let loanDateStr = (diff < 1) ? 'today.':`${diff} day(s) ago.`;
    //Sending the message with formatted variables.
    message.channel.send({embed: {
        color: loanColor,
        title: "Active Loan",
        fields: [
            {
                name: "Loan Amount",
                value: `${loan.toLocaleString()}💵`
            },
            {
                name: "Days since takeout:",
                value: `You took out your loan ${loanDateStr}`
            },
            {
                name: "Interest Rate",
                value: `${intr}%`
            },
            {
                name: "Paying Loans",
                value: `To pay back your loan, do ${client.prefix}payloan!`
            },
            {
                name: "Our Motto",
                value: `If you don't pay your loan, we'll take everything you own!`
            }
        ],
        image: {
            url: 'https://i.imgur.com/c9FiFOm.jpg',
        }
    }});
};
module.exports.help = {
    name: ["loanstatus"],
    description: "Check on the status of your loan.",
    page: 2,
    title: "Economy Commands"
};
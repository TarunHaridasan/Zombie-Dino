module.exports.run = async (client, message, args) => {
  //Parameters
	let userID = message.author.id;
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(args[0]));
  let amount =+ args[1];

  //Invalid user
  if (!target) {
      message.channel.send({embed: {
        color: 3447003,
        description: "<@" + message.member.user.id + "> User was not found!"
      }});
      return;
  };

  //Paying yourself
  if (target.id == userID) {
      message.channel.send({embed: {
        color: 3447003,
        description: "<@" + message.member.user.id + "> You cannot pay yourself."
      }});
      return;
  };

  //Instantiate Money Wrappers
  let Money = require("../utilities/money.js");
  let userMoney = new Money(userID);
  let targetMoney = new Money(target.id);

  //Paying invalid amount
  if (!amount || !Number(amount) || Number(amount) > userMoney.get() || amount < 1) {
      message.channel.send({embed: {
        color: 3447003,
        description: "<@" + message.member.user.id + "> Please choose a valid amount."
      }});
      return;
  };

  //Subtract money from balance
  userMoney.min(amount);
  targetMoney.add(amount);

  //Display to user
  message.channel.send({embed: {
    color: 3447003,
    description: "<@" + message.member.user.id + `> You have paid ${amount.toLocaleString()}💵 to <@${target.id}>.`
  }});
};

module.exports.help = {
    name: ["pay"],
    description: "Pay another user money",
    page: 2,
    title: "Economy Commands"
};
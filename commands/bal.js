module.exports.run = async (client, message, args) => {
  let Money = require('../utilities/money.js')
	let balanceTarget = message.guild.member(message.mentions.users.first() || message.guild.members.fetch(args[0]));
    if (!balanceTarget) {
        let money = new Money(message.author.id);
        message.channel.send({embed: {
          color: 3447003,
          description: `<@${message.author.id}>'s balance: ${money.get().toLocaleString()}💵`
        }});
    }
    else {
      let money = new Money(balanceTarget.id);
        message.channel.send({embed: {
          color: 3447003,
          description: `<@${balanceTarget.id}>'s balance: ${money.get().toLocaleString()}💵`
        }});
    };
};

module.exports.help = {
  name: ["bal", "balance"],
  description: "Used in order to check the balance of a user or yourself.",
  page: 2,
  title: "Economy Commands"
};

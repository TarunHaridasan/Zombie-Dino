module.exports.run = async (client, message, args, data, utils) => {
	let balanceTarget = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!balanceTarget) {
        let money = new utils["Money"] (message.author.id, data["money.json"]);
        message.channel.send({embed: {
          color: 3447003,
          description: `<@${message.author.id}>'s balance: ${money.get().toLocaleString()}💵`
        }});
    }
    else {
      let money = new utils["Money"] (balanceTarget.id, data["money.json"]);
        message.channel.send({embed: {
          color: 3447003,
          description: `<@${balanceTarget.id}>'s balance: ${money.get().toLocaleString()}💵`
        }});
    };
};

module.exports.help = {
  name: "bal",
  description: "Used in order to check the balance of a user or yourself.",
  page: 2,
  title: "Economy Commands"
};

module.exports.run = async (client, message, args, prefix) => {
	roll = Math.round(1 + Math.random() * 5);
    message.reply({embed: {
      color: 3447003,
      description: "You rolled a: " + roll + "."
    }});
};

module.exports.help = {
    name: "roll",
    description: "Roll a dice!",
    page: 1,
    title: "General Commands"
};
/*<--------------------Imports------------------------->*/
const Discord = require('discord.js');
const opus = require('opusscript');
const colors = require('colors');
const client = new Discord.Client();
const util = require("util");

let JSONTemplate = require("./utilities/jsonTemplate.js");
const Money = require('./utilities/money.js');

/*<--------------------Loading------------------------->*/
let commands = require("./handler/commands.js")();
let system = require("./handler/system.js")();
global.data = require("./handler/data.js")();

/*<--------------------Initialize------------------------->*/
client.on("ready", () => {
	let guilds = client.guilds;
	console.log(`Logged in to [${guilds.size}] guilds!`);

	//Get JSONs
	let server = new JSONTemplate("server.json");
	let money = new JSONTemplate("money.json");
	let rewards = new JSONTemplate("rewards.json");

    //For each guild
	guilds.forEach(guild => {
		let members = guild.members;
		let serverID = guild.id;

		//Initialize JSON data for server
		if (!server.data[serverID]) server.data[serverID] = {prefix: "!", admin: [guild.ownerID]}; //Server data
		if (!money.data["bank"]) money.data["bank"] = {money: Math.round(100000000+Math.random()*50000000)}; //Bank money
        if (!money.data["mafia"]) money.data["mafia"] = {money: Math.round(100000+Math.random()*50000)}; //Mafia money

		//For each member in the guild
		members.forEach(member => {
			let userID = member.user.id;

			//Initialize JSON data for each member.
			if (!money.data[userID]) money.data[userID] = {money: 0}; //User money
			if (!rewards.data[userID]) rewards.data[userID] = {dailyClaimed: false, weeklyClaimed: false, dailyMS: 0, weeklyMS: 0, dailyStr: 0, weeklyStr: 0}; //User rewards (daily, weekly, etc)
		});
	});

	//Write all files
	server.write();
	money.write();
	rewards.write();
	console.log(`Logged in as ${client.user.tag}!`);
});
client.login(data["auth.json"].data.token);

/*<--------------Main Code (Event Listeners)-------------->*/
client.on('message', async (message) => {
    //Stop DMs
    if (message.channel.type == "dm" || message.author.bot) return;

    //Determine sender
    let userID = message.author.id;
    let serverID = message.guild.id;

    //Parse message
    let prefix = data["server.json"].data[serverID].prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if (!command.startsWith(prefix)) return;

    //Run command if it exists
    let cmd = commands[command.slice(prefix.length)];
    if (cmd) cmd.run(client, message, args);
});







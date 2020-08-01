/*<--------------------Imports------------------------->*/
const Discord = require('discord.js');
const opus = require('opusscript');
const colors = require('colors');
const client = new Discord.Client();
const util = require("util");
let dispatachers = [];
const fs = require('fs');
const resolve = require('path').resolve;  

/*<--------------------Loading------------------------->*/
let commands = require("./handler/commands.js")(fs, resolve);
let system = require("./handler/system.js")(fs, resolve);
let utils = require("./handler/utils.js")(fs, resolve);
let data = require("./handler/data.js")(fs, resolve, utils["JSONTemplate"]);

/*<--------------------Initialize------------------------->*/
client.on("ready", () => {
	let guilds = client.guilds;
	console.log(`Logged in to [${guilds.size}] guilds!`);

	//Get JSONs
    let server = data["server.json"];
    let money = data["money.json"];

    //For each guild
	guilds.forEach(guild => {
		let members = guild.members;
		let serverID = guild.id;

		//Initialize JSON data
		if (!server.data[serverID]) server.data[serverID] = {prefix: "!", admin: [guild.ownerID]}; //Server data
		if (!money.data["bank"]) money.data["bank"] = {money: Math.round(100000000+Math.random()*50000000)}; //Bank money
        if (!money.data["mafia"]) money.data["mafia"] = {money: Math.round(100000+Math.random()*50000)}; //Mafia money

		//For each member in the guild
		members.forEach(member => {
			let userID = member.user.id;
			if (!money.data[userID]) money.data[userID] = {money: 0}; //User money
		});
	});

	//Close all files
	server.write();
	money.write();
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
    if (cmd) cmd.run(client, message, args, data, utils);
}); 








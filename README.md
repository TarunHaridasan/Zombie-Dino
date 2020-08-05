![Node.js CI](https://github.com/TarunHaridasan/Zombie-Dino/workflows/Node.js%20CI/badge.svg?branch=master)
# Zombie Dino Discord Bot
This is the source code for the Zombie Dino discord bot made by Tarun Haridasan and Jason Su. It is written in Javascript, using Discord.js and Node.js. The code features dynamic data storage using JSON files aswell as a compact handler for data so that it is easy to write and set values to each discord user through their ID. Commands are handled via a dynamic handling system that looks for javascript files in the commands folder and stores them in a map with the name of the function as the key and the function as the value. On the message event, the bot takes a look through the map and if a prefix is detected with a command following it, the specified code will be executed.

# Utilities and Handlers
### Handlers
The code incorporates handlers that make it easy to load JSON files and run commands. The commands handler searches through the commands folder and dynamically adds all the scripts within it to a map that is sorted by the name of the command. That way, a command can be run simply by searching the map with the command's name as the key. The help command works similarily so that whenever a command is added to the commands directory, the bot can dynamically update the help page when it is started. The help handler takes parameters from the help property of the js files and uses those to generate a dynamic help page.
<br><br>
Example:
#### Your .js files should all look like this:
```javascript
module.exports.run = async(client, message, args) => {
    //Your code here!
}

module.exports.help = {
    name: ["names", "of", "commands"] //Ex. bal and balance.
    description: "Description of the command."
    page: 2, //Its page on the help command.
    title: "Economy Commands" //The title that you want the specific page of the help command to show.
}
```
In bot.js:
```javascript
let commands = require("./handler/commands.js")(); //To assign a map to the commands variable of all the 
//commands mapped by their name.
//In order to run a command, all you have to do is splice the length of the prefix of your bot and search for the first word
//of the message in the map, then run the stored function.
client.on('message', async (message) => {
  client.prefix = data["server.json"].data[serverID].prefix; //Getting the prefix from the server json file.
  //Parse message
  client.prefix = data["server.json"].data[serverID].prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0]; //Getting the command with the prefix still attached as it is the first word.
	let args = messageArray.slice(1); //Getting the arguments array by cutting off the prefixed command.
  if (!command.startsWith(client.prefix)) return; //Checking for prefix
  
  //Run command if it exists
	let cmd = commands[command.slice(client.prefix.length)]; //Searching the map for the command.
	if (cmd) cmd.run(client, message, args); //If it exists, run it.
});  
```
### Utilities
The code includes a bunch of utility functions that can be used to easily read and change JSON files dynamically throughout the code. In order to use the JSON file handler, you put the json file that you wish to work within the data folder and require the JSONTemplate.js file from your bot.js file. Then you create an instance of the JSONTemplate class with the name of the json file as the only parameter. <br><br>
Example (In bot.js): 
```javascript
//Requiring the JSON template class.
let JSONTemplate = require("./utilities/jsonTemplate.js");
//Creating a money object with the JSONTemplate class pointing to a money.json file.
//This JSON file is located in ./data/money.json
let money = new JSONTemplate("money.json");

//To access the JSON data.
money.data;
//To write to the file
money.data[userID].money = 1000;
money.write();
//In order to change the values of a JSON file, the data property must be changed DIRECTLY.
```

### Utilities Cont.
There are also special utility classes that extends off of the main JSONTemplate class that are specilized for certain tasks. These include: money utilites, and banking utilities. The money class extends from the JSONTemplate class and its features methods that simplify adding money.
This is how to use it:
```javascript
//First, you require the class into the command file that you wish to use it in.
let Money = require("../utilities/money.js");
//Then, you create an instance of the class for every user's balance that you wish to modify. 
let userMoney = new Money(userID);
let targetMoney = new Money(target.id);
//Then you can simply use methods such as add, min, set, and get to easily manipulate the balance of a user.
userMoney.add(1000); //Adds 1000 to the user's money. 
//All the methods automatically write to the JSON file.
```
# How to Install
1. Clone the repository: `git clone https://github.com/TarunHaridasan/Zombie-Dino`
2. Install all necessary modules from package.json: `npm install`

# How to Run the Code
1. Get a discord bot token at this link: `https://discord.com/developers/applications`
2. Create an auth.json file in the data directory and set the "token" property to your token!
3. Run start.cmd and your bot will come online with this code.

# Copyright and License
Copyright (c) 2020 Jason Su & Tarun Haridasan. Developed with <a href="https://discord.js.org/#/" target="_blank">Discord.js</a> and <a href="https://nodejs.org/en/" target="_blank">Node.js</a>. This project is licensed under the terms of the Apache License 2.0. Please see the LICENSE file for full reference.

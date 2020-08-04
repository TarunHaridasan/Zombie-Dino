![Node.js CI](https://github.com/TarunHaridasan/Zombie-Dino/workflows/Node.js%20CI/badge.svg?branch=master)
# Zombie Dino Discord Bot
This is the source code for a discord bot made by Tarun Haridasan and Jason Su. It is written using discord.js and Node.js. The code features dynamic data storage using JSON files including a compact handler for data so that it is easy to write and set data values to each discord user through their ID. Commands are handled via a dynamic handling system that looks for javascript files in the commands folder and stores them all in a map that is made as the bot started. On the message event, the bot takes a look through the map and if a prefix is detected with a command following it, the specified code will run.

# Utilities and Handlers
The code includes a bunch of utility functions that can be used to easily read and change JSON files dynamically throughout the code. In order to use the JSON file handler, you put the json file that you wish to work with in the data folder and require the JSONTemplate.js file from your bot.js file. Then you create an instance of the JSONTemplate class with the name of the json file as the only parameter. <br><br>
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
# How to Install
1. Clone the repository: `git clone https://github.com/TarunHaridasan/Zombie-Dino`
2. Install all necessary modules from package.json: `npm install`

# How to Run the Code
1. Get a discord bot token at this link: `https://discord.com/developers/applications`
2. Create an auth.json file in the data directory and set the "token" property to your token!
3. Run start.cmd and your bot will come online with this code.

# Copyright and License
Copyright (c) 2020 Jason Su & Tarun Haridasan. Developed with <a href="https://discord.js.org/#/" target="_blank">Discord.js</a> and <a href="https://nodejs.org/en/" target="_blank">Node.js</a>. This project is licensed under the terms of the Apache License 2.0. Please see the LICENSE file for full reference.

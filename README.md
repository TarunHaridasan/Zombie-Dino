# Zombie Dino Discord Bot
This is the source code for a discord bot made by Tarun Haridasan and Jason Su. It is written using discord.js and Node.js. The code features dynamic data storage using JSON files including a compact handler for data so that it is easy to write and set data values to each discord user through their ID. Commands are handled via a dynamic handling system that looks for javascript files in the commands folder and stores them all in a map that is made as the bot started. On the message event, the bot takes a look through the map and if a prefix is detected with a command following it, the specified code will run.

# How to Install
1. Clone the repository: `git clone https://github.com/TarunHaridasan/Zombie-Dino`
2. Install all necessary modules from package.json: `npm install`

# How to Run the Code
1. Get a discord bot token at this link: `https://discord.com/developers/applications`
2. Create an auth.json file in the data directory and set the "auth" property to your token!
3. Run start.cmd and your bot will come online with this code.

# Copyright and License
Copyright (c) 2020 Jason Su & Tarun Haridasan. Developed with <a href="https://discord.js.org/#/" target="_blank">Discord.js</a> and <a href="https://nodejs.org/en/" target="_blank">Node.js</a>. This project is licensed under the terms of the Apache License 2.0. Please see the LICENSE file for full reference.

/*<--------------------Imports------------------------->*/
const Discord = require('discord.js');
const opus = require('opusscript');
const colors = require('colors');
const client = new Discord.Client();
const util = require("util");
let commands = {}
let system = {}
let data = {}
let utils = {}
let dispatachers = [];
const fs = require('fs');

/*<--------------------Loading------------------------->*/
commands = require("./handler/commands.js")(fs);
system = require("./handler/system.js")(fs);
utils = require("./handler/utils.js")(fs);
data = require("./handler/data.js")(fs);




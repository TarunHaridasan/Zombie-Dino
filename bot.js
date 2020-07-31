/*<--------------------Imports------------------------->*/
const Discord = require('discord.js');
const opus = require('opusscript');
const colors = require('colors');
const client = new Discord.Client();
const util = require("util");
commands = {}
system = {}
data = {}
utils = {}
let dispatachers = [];
const fs = require('fs');


let files;
let loadStr;
/*<--------------------Dynamic Command File Loader------------------------->*/ 
files = fs.readdirSync("./commands/").filter(f => f.split(".").pop() === "js");
loadStr = '[Commands]';
if(files.length <= 0) console.log(`${loadStr.green.bold} No commands to load.\n`);
else {
    console.log(`${loadStr.green.bold} ${files.length} commands detected.`);
    files.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        let loaded = `${f.toString()} loaded!`;
        console.log(`${loadStr.green.bold} [${i+1}] ${loaded.yellow}`);
        commands[props.help.name] = props;
    });
    console.log(`${loadStr.green.bold} All commands have been loaded!\n`);  
}
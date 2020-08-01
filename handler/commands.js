function run() {
	//Requires
	const readdirSync = require('fs').readdirSync;
	const resolve = require('path').resolve; 
	//Read files from path
    let path = resolve("./commands");
	let files = readdirSync(path).filter(f => f.split(".").pop() === "js");
	let loadStr = '[Commands]';
	let commands = {};
	//Print to console
	if(files.length <= 0) console.log(`${loadStr.green.bold} No commands to load.\n`);
	else {
	    console.log(`${loadStr.green.bold} ${files.length} commands detected.`);
	    files.forEach((f, i) => {
	    	let fp = `${path}\\${f}`;
	        let props = require(fp);
	        let loaded = `${f.toString()} loaded!`;
	        console.log(`${loadStr.green.bold} [${i+1}] ${loaded.yellow}`);
	        for (let i=0; i<props.help.name.length; i++) {
	        	let name = props.help.name[i];
	        	commands[name] = props;
	        }	        
	    });
	    console.log(`${loadStr.green.bold} All commands have been loaded!\n`);  
	}
	return commands;
}

module.exports = run;

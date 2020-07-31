function run(fs, resolve) {
    let path = resolve("./commands");
	let files = fs.readdirSync(path).filter(f => f.split(".").pop() === "js");
	let loadStr = '[Commands]';
	let commands = {};
	if(files.length <= 0) console.log(`${loadStr.green.bold} No commands to load.\n`);
	else {
	    console.log(`${loadStr.green.bold} ${files.length} commands detected.`);
	    files.forEach((f, i) => {
	    	let fp = `${path}\\${f}`;
	        let props = require(fp);
	        let loaded = `${f.toString()} loaded!`;
	        console.log(`${loadStr.green.bold} [${i+1}] ${loaded.yellow}`);
	        commands[props.help.name] = props;
	    });
	    console.log(`${loadStr.green.bold} All commands have been loaded!\n`);  
	}
	return commands;
}

module.exports = run;

function run() {
	//Requires
	const readdirSync = require('fs').readdirSync;
	const resolve = require('path').resolve;  
	//Read files from path
	let path = resolve("./system");
	let files = readdirSync("./system/").filter(f => f.split(".").pop() === "js");
	let loadStr = '[System]';
	let system ={}
	//Print to console
	if(files.length <= 0) console.log(`${loadStr.yellow.bold} No system files to load.\n`);
	else {
	    console.log(`${loadStr.yellow.bold} ${files.length} system files found.`);
	    files.forEach((f, i) => {
	        let fp = `${path}\\${f}`
            let props = require(fp);
	        let loaded = `${f} loaded!`
	        console.log(`${loadStr.yellow.bold} [${i+1}] ${loaded.grey}`);
	        system[props.help.name] = props;
	    });
	    console.log(`${loadStr.yellow.bold} All system files have been loaded!\n`);
	}
	return system;
}
module.exports = run;
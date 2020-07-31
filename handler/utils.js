function run(fs) {
	let files = fs.readdirSync("./utilities/").filter(f => f.split(".").pop() === "js");
	let loadStr = '[Utility]';
	let utils = {}
	if(files.length <= 0) console.log(`${loadStr.red.bold} No utility files to load.\n`);
	else {
	    console.log(`${loadStr.red.bold} ${files.length} utility files found.`);
	    files.forEach((f, i) => {
	        let props = require(`../utilities/${f}`);
	        let loaded = `${f} loaded!`
	        console.log(`${loadStr.red.bold} [${i+1}] ${loaded.grey}`);
	        utils[props.name]=props.run;
	    });
	    console.log(`${loadStr.red.bold} All utility files have been loaded!\n`);    
	}
	return utils;
}
module.exports = run;
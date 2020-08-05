function run(log = 1) {
	//Requires
	const readdirSync = require('fs').readdirSync;
	const resolve = require('path').resolve;
	//Read files from path
    let path = resolve("./items");
	let files = readdirSync(path).filter(f => f.split(".").pop() === "js");
	let loadStr = '[Items]';
	let items = {};
	//Print to console
	if(files.length <= 0) {
		if(log) console.log(`${loadStr.magenta.bold} No items to load.\n`);
	}
	else {
		if(log) console.log(`${loadStr.magenta.bold} ${files.length} items detected.`);
		files.forEach((f, i) => {
            //Getting the path and requiring the function.
			let fp = `${path}\\${f}`;
			let props = require(fp);
			let loaded = `${f.toString()} loaded!`;
			if(log) console.log(`${loadStr.magenta.bold} [${i+1}] ${loaded.yellow}`);
            //Making a map with the name of the item and its properties (ie. cost)
			items[props.name] = props;
			//Register commands associated with the item
			props.functions.forEach(func => {
				commands[func.help.name] = func;
			})
		});
		if(log) console.log(`${loadStr.magenta.bold} All items have been loaded!\n`);
	}
	return items;
}

module.exports = run;

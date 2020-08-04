function run() {
	//Requires
	const readdirSync = require('fs').readdirSync;
	const resolve = require('path').resolve;
	//Read files from path
    let path = resolve("./items");
	let files = readdirSync(path).filter(f => f.split(".").pop() === "js");
	let loadStr = '[Items]';
	let items = {};
	//Print to console
	if(files.length <= 0) console.log(`${loadStr.magenta.bold} No items to load.\n`);
	else {
		console.log(`${loadStr.magenta.bold} ${files.length} items detected.`);
		files.forEach((f, i) => {
            //Getting the path and requiring the function.
			let fp = `${path}\\${f}`;
			let props = require(fp);
			let loaded = `${f.toString()} loaded!`;
            console.log(`${loadStr.magenta.bold} [${i+1}] ${loaded.yellow}`);
            //Making a map with the name of the item and the function that it does.
            items[props.name] = props;
		});
		console.log(`${loadStr.magenta.bold} All items have been loaded!\n`);
	}
	return items;
}

module.exports = run;

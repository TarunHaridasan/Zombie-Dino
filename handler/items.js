function run() {
	//Requires
	const readdirSync = require('fs').readdirSync;
	const resolve = require('path').resolve;
	//Read files from path
    let path = resolve("./items");
	let files = readdirSync(path).filter(f => f.split(".").pop() === "js");
	let loadStr = '[Items]';
	let items = {};
	let shop = [];
	items.shop = shop;

	if(files.length <= 0) {
		console.log(`${loadStr.magenta.bold} No items to load.\n`);
	}
	else {
		let count = 1;
		console.log(`${loadStr.magenta.bold} ${files.length} items detected.`);
		files.forEach((f, i) => {
            //Getting the path and requiring the function.
			let fp = `${path}\\${f}`;
			let props = require(fp);
			let loaded = `${f.toString()} loaded!`;
			console.log(`${loadStr.magenta.bold} [${i+1}] ${loaded.yellow}`);

            //Making a map with the name of the item and its properties (ie. cost)
			items[props.name] = props;

			//Register commands associated with the item
			props.functions.forEach(func => {
				commands[func.help.name] = func;
			});

			//Add the items to items.shop		
			let page = props.page-1;
			if (!shop[page]) {
				shop[page] = {};
				shop[page].name = props.title;
				shop[page].value = ``;
			}
			shop[page].value += `\`[${count}]\` ${props.parsed}: **${props.cost}💵**\n`;
			count++;
		});
		console.log(`${loadStr.magenta.bold} All items have been loaded!\n`);
	}
	return items;
}

module.exports = run;

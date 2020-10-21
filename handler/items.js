function run() {
	//Requires
	const readdirSync = require('fs').readdirSync;
	const resolve = require('path').resolve;
	//Read files from path
    let path = resolve("./items");
	let files = readdirSync(path).filter(f => f.split(".").pop() === "js");
	let loadStr = '[Items]';
	let items = {};
	let weapons = {};
	let shop = [];
	let help = [];
	//Items
	if(!commands.helpPage) commands.helpPage = help;
	else help = commands.helpPage;
	items.shop = shop;
	items.shopArr = [];

	if(files.length <= 0) {
		console.log(`${loadStr.magenta.bold} No items to load.\n`);
	}
	else {
		let count = 1;
		console.log(`${loadStr.magenta.bold} ${files.length} items detected.`);
		files.forEach((f, i) => {
            //Getting the path and requiring the function.
			let fp = `${path}/${f}`;
			let props = require(fp);
			let loaded = `${f.toString()} loaded!`;
			console.log(`${loadStr.magenta.bold} [${i+1}] ${loaded.yellow}`);

            //Making a map with the name of the item and its properties (ie. cost)
			items[props.name] = props;
			if(props.weapon) weapons[props.name] = props._functions[0].run;

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
			shop[page].value += `\`[${count}]\` ${props.parsed}: **${props.cost.toLocaleString()}💵**\n`;
			items.shopArr.push(props.name);
			count++;
			//Add the item to commands.help
			//Checking if the page exists in the array; if not, create it.
			if (!help[page]) {
				help[page] = {};
				help[page].name = props.functions[0].help.title;
				help[page].value = ``;
			}
			//If it already exists, just add it to the page.
			for(let i = 0; i < props.functions.length; i++) help[page].value += `\`${props.functions[i].help.name}\`: ${props.functions[i].help.description} \n`;
		});
		console.log(`${loadStr.magenta.bold} All items have been loaded!\n`);
	}
	return [items, weapons];
}

module.exports = run;

function run(fs, resolve, JSONTemplate) { 
    let path = resolve("./data");
    let files=fs.readdirSync(path).filter(f => f.split(".").pop() == "json");
    let loadStr = '[JSON]';
    let data = {};
    if (files.length<=0) console.log(`${loadStr.blue.bold} No JSON files to load.\n`);
    else {
        console.log(`${loadStr.blue.bold} ${files.length} JSON files detected.`);
        //Load each json file
        files.forEach((f, i)=> {
            let fp = `${path}\\${f}`
            let props = require(fp);
            let loaded = `${f.toString()} loaded!`;
            console.log(`${loadStr.blue.bold} [${i+1}] ${loaded.blue}`);
            data[f]=new JSONTemplate(fs, fp, props);
        });
        console.log(`${loadStr.blue.bold} All JSON files have been loaded!\n`); 
    }
    return data;
}
module.exports = run;
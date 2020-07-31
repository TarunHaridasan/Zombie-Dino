
function run(fs) {
    /*<--------------------Dynamic JSON Loader ------------------------->*/       
    let files=fs.readdirSync("./data/").filter(f => f.split(".").pop() == "json");
    let loadStr = '[JSON]';
    let data = {};
    if (files.length<=0) console.log(`${loadStr.blue.bold} No JSON files to load.\n`);
    else {
        console.log(`${loadStr.blue.bold} ${files.length} JSON files detected.`);
        let jsonTemplate = utils["JSONTemplate"];
        //Load each json file
        files.forEach((f, i)=> {
            let props = require(`./data/${f}`);
            let loaded = `${f.toString()} loaded!`;
            console.log(`${loadStr.blue.bold} [${i+1}] ${loaded.blue}`);
            data[f]={fs: fs, fp: `./data/${f}`, data: props, write: function() {this.fs.writeFileSync(this.fp, JSON.stringify(this.data, null, 2))}};
        });
        console.log(`${loadStr.blue.bold} All JSON files have been loaded!\n`); 
    }
    return data;
}
module.exports = run;
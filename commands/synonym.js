module.exports.run = async (_client, message, args, _prefix) => {
    //Variables
    let apiKey="8d765c41-d94c-4ff4-b8d5-89ea609f274e";
    let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${args.join(" ")}?key=${apiKey}`
    const fetch = require("node-fetch");

    //Word must be passed as an argument
    if (!args[0]) {
        message.reply({embed: {
			color: 0xFF0000,
			title: "Dictionary Error",
			description: "A word is required!"
		}});
		return;
    }

    //Make the request
    let data = await fetch(url)
    .then(data => data.json())
    
    //Success
    .then(data => {
        //Word must exist
        if (typeof data[0] == "string") {
            let possibleWords = "";
            data.forEach(element => {
                possibleWords+=`\`${element}\`\n`;
            })
            message.reply({embed: {
                color: 0xFFFF00,
                title: "Dictionary Error",
                description: `\`${args.join(" ")}\` is not a real word. Did you mean:\n${possibleWords}`
            }});
            return;
        }

        //Display the synonyms
        let description = [];
        data[0].meta.syns[0].forEach((word, i) => {
            description+=`\`${i+1}\`: ${word}\n`;
        });
        message.reply({embed: {
            color: 0x00FF00,
            title: `Synonym(s) for \`${args.join(" ")}\`:`,
            description: description
        }});
    })
    
    //Error
    .catch(err => {
        console.log(err);
        message.reply({embed: {
            color: 0xFF0000,
            title: "Error:",
            description: `Something went wrong...`
        }});
    })
}

module.exports.help = {
	name: ["synonym"],
	description: "This command will retrieve popular synonyms of a word",
	page: 3,
	title: "Fun Commands"
}
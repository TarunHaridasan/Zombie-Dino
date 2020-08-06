module.exports.run = async (_client, message, args, _prefix) => {
    //Variables
    const fetch = require('node-fetch');
    let apiKey="54664010-a026-488d-a9a7-f4b2b96e8934";
    let url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${args.join(" ")}?key=${apiKey}`;

    //Word must be passed
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
        //Definition must exist
        if (typeof data[0]=="string") {
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

        //Display all definitions
        let fields = "";
        data[0].shortdef.forEach((def, i) => {
            fields+=`\`${i+1}\`: ${def}\n`;
        });
        message.reply({embed: {
            color: 0x00FF00,
            title: `Definition(s) for the \`${data[0].fl}\` \`${args.join(" ")}\`:\n`,
            description: fields
        }});
    })

    //On failiure
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
	name: ["define"],
	description: "This command can look up words in a dictionary",
	page: 1,
	title: "Fun Commands"
}
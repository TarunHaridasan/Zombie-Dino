module.exports.run = async (_client, message, args, _prefix) => {
    //Variables
    const fetch = require('node-fetch');
    let url = "https://meme-api.herokuapp.com/gimme";

    //Make the request
    let data = await fetch(url)
    .then(data => data.json())

    //Display to user
    .then(data => {
        message.reply({files: [data.url]})
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
    name: ["meme"],
    description: "This command can be used to randomly find a meme",
    page: 1,
    title: "Fun Commands"
  }
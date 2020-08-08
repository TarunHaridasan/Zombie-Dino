module.exports.run = async (_client, message, args, _prefix) => {
    //Check if the subreddit was specified
    if (!args[0]) {
        message.reply({embed: {
            color: 0xFF0000,
            title: "Error:",
            description: `Please enter a subreddit to retrieve from...`
        }});
        return;
    }

    //Variables
    const fetch = require("node-fetch");
    let url = `https://meme-api.herokuapp.com/gimme/${args[0]}`;    
    let meme = require("../utilities/meme.js");

    //Retrieve the meme
    meme(url, message);



}

module.exports.help = {
    name: ["reddit"],
    description: "Retreive a random image post from the specified reddit post (NSFW not allowed)",
    page: 1,
    title: "Fun Commands"
}
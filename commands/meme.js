module.exports.run = async (_client, message, args, _prefix) => {
    //Variables
    const fetch = require('node-fetch');
    let meme = require("../utilities/meme.js")
    let url = "https://meme-api.herokuapp.com/gimme"

    //Retrieve memes
    meme(url, message);
}
module.exports.help = {
    name: ["meme"],
    description: "This command can be used to randomly find a meme from r/memes, r/dankmemes, and r/me_irl",
    page: 1,
    title: "Fun Commands"
}



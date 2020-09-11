module.exports.run = async (_client, message, args, _prefix) => {
    //Variables
    const fetch = require("node-fetch");
    let url = "https://meme-api.herokuapp.com/gimme";    
    let meme = require("../utilities/meme.js");

    //Pick a random subreddit
    let subreddits = ["Awww", "Aww"];
    let rand = Math.round(Math.random()*subreddits.length-1);
    url += `/${subreddits[rand]}`;

    //Retrieve the meme
    meme(url, message);
}

module.exports.help = {
    name: ["aww"],
    description: "Retreive a wholesome image from r/aww and r/awww",
    page: 3,
    title: "Fun Commands"
}
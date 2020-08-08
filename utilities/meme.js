function meme(url, message) {
    const fetch = require("node-fetch");
    let data = fetch(url) 
    .then(data=>data.json())
    .then(data=>{
        if (data.code == 404) throw "That subreddit does not exist..."
        if (data.nsfw) throw "No NSFW channels..."
        message.reply({files: [data.url]})
    })
    .catch(err=> {
        console.log(err)
        message.reply({embed: {
            color: 0xFF0000,
            title: "Error:",
            description: err
        }});
    })
}

module.exports = meme;
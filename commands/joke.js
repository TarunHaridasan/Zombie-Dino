module.exports.run = async (client, message, args) => {
    //Variables
    const fetch = require('node-fetch');
    let url = "https://official-joke-api.appspot.com/random_joke";

    //Make the request
    let data = await fetch(url)
    .then(data => data.json())
    
    //Display the joke
    .then(data => {         
        message.reply({embed: {
            color: 0x00FF00,
            description: `${data.setup}\n ${data.punchline}`
        }});
    })

    //Handle errors
    .catch(err =>{
        console.log(err);
        message.reply({embed: {
            color: 0xFF0000,
            title: "Error:",
            description: `Something went wrong...`
        }});
    });    
}

module.exports.help = {
    name: ["joke"],
    description: "This command fetches a random joke from the internet",
    page: 1,
    title: "Fun Commands"
}
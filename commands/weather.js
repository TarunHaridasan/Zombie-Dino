module.exports.run = async (client, message, args) => {
    //Variables
    const fetch = require('node-fetch');
    let apiKey = "9cc716d1960d21cc1cacf2994892c2b9";
    let userID = message.author.id;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${args.join(" ")}&appid=${apiKey}&units=metric`;

    //Make the request
    let data = await fetch(url);
    data = await data.json();

    //If Return data is successful
    if (data.cod == 200) {
        //Display the weather
        message.reply({embed: {
            color: 0x00FF00,
            title: `Weather in \`${data.name}, ${data.sys.country}\``,
            fields: [
                {
                    name: "Temperature",
                    value: `\`${data.main.temp}\`°C`,
                    inline: true
                },
                {
                    name: "Feels Like",
                    value: `\`${data.main.feels_like}\`°C`,
                    inline: true
                },
                {
                    name: "Humidity",
                    value: `\`${data.main.humidity}\`%`,
                    inline: true
                },
                {
                    name: "Atmospheric Pressure",
                    value: `\`${data.main.pressure}\` hPa`,
                    inline: true
                },
                {
                    name: "Wind Speed",
                    value: `\`${data.wind.speed}\` m/s`,
                    inline: true
                },
                {
                    name: "Wind Direction",
                    value: `\`${data.wind.deg}\`°`,
                    inline: true
                },
                {
                    name: "Cloudiness",
                    value: `\`${data.clouds.all}\`%`,
                    inline: true
                },

            ]
        }});
        return;
    }
    //On Failiure
    try {
        if (data.cod == 401 || data.cod == 429) throw "Weather service is currently down. Please try again later.";
        else if (data.cod == 404) throw "THat city does not exist!";
        else if (data.cod = 400) throw "You did not enter a location";
    }
    catch(err) {
        message.reply({embed: {
            color: 0xFF0000,
            title: `Error ${data.cod}:`,
            description: `\`${err}\``
        }})
    }
}

module.exports.help = {
    name: ["weather"],
    description: "This command can be used to check weather in any city.",
    page: 1,
    title: "Fun Commands"
}
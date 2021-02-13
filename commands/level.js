module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let Level = require('../utilities/levels.js');
    const { createCanvas } = require('canvas');
    var fs = require('fs');
    //Getting the targetted user or the author of the command.
    let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let user = target ? new Level(target.id):new Level(userID);
    let userObj = target ? target:message.author;
    // Function to make image.
    function roundedRect(x, y, width, height, radius, context) {
        context.save();
        // Translate to the given X/Y coordinates
        context.translate(x, y);
        // Move to the center of the top horizontal line
        context.moveTo(width / 2,0);
        // Draw the rounded corners. The connecting lines in between them are drawn automatically
        context.arcTo(width,0,width,height, Math.min(height / 2, radius));
        context.arcTo(width, height, 0, height, Math.min(width / 2, radius));
        context.arcTo(0, height, 0, 0, Math.min(height / 2, radius));
        context.arcTo(0, 0, radius, 0, Math.min(width / 2, radius));
        // Draw a line back to the start coordinates
        context.lineTo(width / 2,0);
        // Restore the state of the canvas to as it was before the save
        context.restore();
    };
    function draw(width, height, username, xp, xpr, level) {
        let user = username.split("#");
        user[0] = user[0].substr(0, 15);
        // Canvas and context.
        const element = createCanvas(width, height);
        const context = element.getContext('2d');
        // Width and height.
        element.width = width;
        element.height = height;
        // Filling in the background.
        context.beginPath();
        context.fillStyle = "#23272A";
        roundedRect(0, 0, element.width, element.height, 5, context);
        context.fill();
        // Inner rectangle.
        let starting = [25, 25];
        let ending = [width-50, height-50];
        // Drawing the rectangle.
        context.beginPath();
        context.fillStyle = "#090A0B";
        roundedRect(starting[0], starting[1], ending[0], ending[1], 5, context);
        context.stroke();
        context.fill();
        // Returning the element.
        context.beginPath();
        context.moveTo(50,50);
        context.moveTo(100,50);
        context.arcTo(200,50,200,200,25);
        context.stroke();
        // Empty bar.
        let starting2 = [80, 180];
        let barDims = [800, 30];
        context.beginPath();
        context.fillStyle = "#484B4E";
        roundedRect(starting2[0], starting2[1], barDims[0], barDims[1], 15, context);
        context.stroke();
        context.fill();
        // Progress
        let percent = xp/xpr;
        let fillDims = [barDims[0]*percent, 30];
        context.beginPath();
        context.strokeStyle = "#7B14FF";
        context.fillStyle = "#7B14FF";
        roundedRect(starting2[0], starting2[1], fillDims[0], fillDims[1], 15, context);
        context.stroke();
        context.fill();
        // Username and Discriminant.
        context.font = "35px Arial";
        context.fillStyle = "white";
        context.fillText(user[0], starting2[0], starting2[1]-12);
        // Discrim.
        console.log()
        let discrim = [starting2[0]+(context.measureText(user[0]).width)+10, starting2[1]-12]
        context.font = "30px Arial";
        context.fillStyle = "#777B7B";
        context.fillText(`#${user[1]}`, discrim[0], starting2[1]-12);
        // xp numbers.
        context.textAlign = "right";
        context.font = "25px Arial";
        context.fillStyle = "#777B7B";
        context.fillText(`/${xpr} XP`, ending[0], starting2[1]-12);
        let xprWidth = context.measureText(`/${xpr} XP`).width;
        context.fillText(`${xp}`, ending[0]-xprWidth, starting2[1]-12);
        // Level.
        context.strokeStyle = "#7B14FF";
        context.fillStyle = "#7B14FF";
        context.font = "40px Arial";
        context.fillText(`${level}`, ending[0], starting2[1]-110);
        context.strokeStyle = "#7B14FF";
        context.fillStyle = "#7B14FF";
        context.font = "30px Arial";
        context.fillText(`LEVEL `, ending[0]-(context.measureText(level).width+15), starting2[1]-110);
        return element;
    };
    let element = draw(934, 282, `${userObj.username}#${userObj.discriminator}`, user.userData.xp, user.userData.xpr, user.get());
    element = element.toBuffer('image/png');
    fs.writeFileSync('./images/image.png', element);
    message.channel.send({files: ["./images/image.png"]});
}

module.exports.help = {
    name: ["level", "lvl"],
    description: "Check your level!",
    page: 1,
    title: "General Commands"
}
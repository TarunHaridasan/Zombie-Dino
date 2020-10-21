async function shoot(_client, message, _args, target) {
    //Variables
    let userID = message.author.id;
    //Helper classes
    let Inventory = require('../utilities/inventory.js');
    let Stats = require('../utilities/itemStats.js');
    let Money = require('../utilities/money.js');
    //Class instances
    let inventory = new Inventory(userID);
    let stats = new Stats(userID);
    //Money instances.
    let userBal = new Money(userID);
    let targetBal = new Money(target.id);
    //Getting and checking time.
    let now = Date.now();
    if(now < stats.getQuantity('pistolCool')) {
        //Finding difference.
        let diff = stats.getQuantity('pistolCool')-now;
        let mins = Math.round(diff/60000);
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> You cannot use this weapon for another ${mins} minutes!`
        }});
        return;
    };
    //Checking for bullets.
    if(inventory.getQuantity('pistolBullet') < 1) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> You have no ammo!`
        }});
        return;
    };
    //Getting percentage of money.
    let percent = (Math.round(1+Math.random()*4))/100;
    let amount = Math.round(targetBal.get()*percent);
    targetBal.min(amount);
    userBal.add(amount);
    //Subtracting one bullet.
    inventory.minQuantity('pistolBullet', 1);
    //Initiating cooldown.
    stats.initCool('pistol');
    //Sending the message.
    message.channel.send({embed: {
        description: `<@${userID}> has shot <@${target.id}> and has stolen from them **${amount.toLocaleString()}**💵!`
    }});
}

//Item properties
module.exports.name = "pistol";
module.exports.parsed = "Pistol 🔫"
module.exports.weapon = true;
module.exports.ammo = 'pistolBullet';
module.exports.cost = 500000;
module.exports.default = '🚫';
module.exports.page = 2;
module.exports.title = "Weapons"
module.exports.functions = [];
module.exports._functions = [{run: shoot}];
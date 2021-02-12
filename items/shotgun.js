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
    if(now < stats.getQuantity('shotgunCool')) {
        //Finding difference.
        let diff = stats.getQuantity('shotgunCool')-now;
        let mins = Math.round(diff/60000);
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> You cannot use this weapon for another ${mins} minutes!`
        }});
        return;
    };
    //Checking for bullets.
    if(inventory.getQuantity('shotgunShell') < 1) {
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${userID}> You have no ammo!`
        }});
        return;
    };
    //Getting percentage of money.
    let percent = (Math.round(10+Math.random()*5))/100;
    let amount = Math.round(targetBal.get()*percent);
    targetBal.min(amount);
    userBal.add(amount);
    //Subtracting one bullet.
    inventory.minQuantity('shotgunShell', 1);
    //Initiating cooldown.
    stats.initCool('shotgun');
    //Sending the message.
    message.channel.send({embed: {
        description: `<@${userID}> has shot <@${target.id}> and has stolen from them **${amount.toLocaleString()}**💵!`
    }});
}

//Item properties
module.exports.name = "shotgun";
module.exports.parsed = "Shotgun <:shotgun:768360171235442708>"
module.exports.weapon = true;
module.exports.ammo = 'shotgunShell';
module.exports.cost = 1250000;
module.exports.default = '🚫';
module.exports.page = 2;
module.exports.title = "Weapons"
module.exports.functions = [];
module.exports._functions = [{run: shoot}];
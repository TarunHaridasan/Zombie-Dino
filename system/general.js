module.exports.run = async (client, message, args) => {
    //Making sure the bot always has money.
    let Money = require('../utilities/money.js');
    let money = new Money(client.user.id);
    if(money.get() < 1) {
        let ran = Math.round(500000000 + Math.random() * 599999999);
        money.add(ran);
    }
};

module.exports.help = {
    name: ['general']
};

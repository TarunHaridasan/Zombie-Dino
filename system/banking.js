module.exports.run = async (client, message, args) => {
    function diff(date1, date2) {
        timeDiff = Math.abs(date2.getTime() - date1.getTime());
        daysDiff = timeDiff/(1000*3600*24);
        return Math.round(daysDiff);
    };
    const Money = require('../utilities/money.js');
    const Bank = require('../utilities/bank.js');
    let bank = new Bank('bank');
    const {debters, severeArr} = bank.getBank();

    //This loops through each of the memebers of the debters array and multiples interest as well as checks
    //For whether or not the user should be moved to
    debters.forEach(async f => {
        //Getting all the required variables.
        let user = new Bank(f);
        const {severe, incr} = user.getData();
        //Calculating the difference in dates since the last interest increase.
        let today = new Date();
        let increase = new Date(incr);
        let daysDiff = diff(increase, today);
        if(today.getDate() != increase.getDate()) for(let i = 0; i < daysDiff; i++) user.interest();
        if(today.getTime() >= severe && !severeArr.includes(f)) severeArr.push(f);
    });

    severeArr.forEach(async f => {
        let bal = new Money(f);
        let bank = new Bank(f);
        let vault = new Money('bank');
        let {loan, loanDate, intr, severe, incr} = bank.getData();
        if(bal.get() < 1) return;
        //If the user does not have enough money to pay their loan in full.
        if(bal.get() < loan) {
            let repoAmount = bal.get();
            //Transferring money;
            loan -= repoAmount;
            bank.pay(bal.get());
            bal.min(bal.get());
            //Adding it back to the vault.
            vault.add(bal.get());
            //Sending message
            message.channel.send({embed: {
                color: 0xff0000,
                description: `<@${f}>'s assets have been repossessed by the bank. **Total Cost: ${repoAmount.toLocaleString()}**💵\n\nRemaining loan amount: **${loan.toLocaleString()}💵**`
            }});
            //Exit the command.
            return;
        };
        //Otherwise, if the user DOES have enough money to pay their loan.
        //Transferring money;
        let repoAmount = loan;
        bank.pay(repoAmount);
        bal.min(repoAmount);
        //Adding it back to the vault.
        vault.add(repoAmount);
        //Resetting all the variables.
        bank.unLoan();
        //Send message
        message.channel.send({embed: {
            color: 0xff0000,
            description: `<@${f}>'s assets have been repossessed by the bank. **Total Cost: ${repoAmount.toLocaleString()}**💵 They have paid back their loan in full.`
        }});
    });
};

module.exports.help = {
    name: ['banking']
};

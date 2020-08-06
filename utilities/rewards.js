const JSONTemplate = require("./JSONTemplate.js");
class Rewards extends JSONTemplate {
    //Constructor
    constructor(userID) {
        super("rewards.json");
        this.userID = userID;
        this.userData = this.data[userID];
    }
    //Reset Streak
    reset(attribute) {
        this.set(attribute, 0);
        return 0;
    }
    //Increment Streak by 1
    incStreak(streak) {
        let curStreak = this.get(streak)+1;
        this.set(streak, curStreak);
        return curStreak;
    }
    //Increment time
    incTime(type) {
        let curTime = new Date();
        let days = (type=="dailyMS") ? 1 : 7
        curTime = curTime.setDate(curTime.getDate() + days);
        this.set(type, curTime);
        return curTime;
    }
    //Set a value to an attribute
    set(attribute, value) {
        this.userData[attribute] = value;
        this.write();
    }
    //Get the value of an attribute
    get(attribute) {
        return this.userData[attribute];
    }
}

module.exports = Rewards;

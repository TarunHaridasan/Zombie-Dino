class Rewards {
    //Constructor
    constructor(userID, rewardsJSON) {
        this.userID = userID;
        this.data = rewardsJSON.data;
		this.writeFileSync = require('fs').writeFileSync;
		this.fp = rewardsJSON.fp;
    }
    //Get a value given the key
    get(attribute) {
        return this.data[this.userID][attribute];
    }
    write() {
        this.writeFileSync(this.fp, JSON.stringify(this.data, null, 2));
    }
    //Set a value to a key
    set(attribute, value) {
        this.data[this.userID][attribute] = value;
        this.write();
    }
    //Reset Streak
    reset(attribute) {
        this.set(attribute, 0);
    }
    //Increment Streak
    str(streak) {
        let curStreak = this.data[this.userID][streak];
        this.set(streak, curStreak+1);
        return curStreak+1;
    }
    //Increment time
    time(type) {
        let durationMs = (type=="dailyMS") ? 86400000 : 1209600000;
        let curTime = this.data[this.userID][type];
        curTime += durationMs;
        this.set(type, curTime);
        return curTime;
    }
}

module.exports = Rewards;

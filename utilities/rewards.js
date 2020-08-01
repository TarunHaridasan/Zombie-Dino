class Rewards {
    //Constructor
    constructor(userID, rewardsJSON) {
        this.userID = userID;
        this.data = rewardsJSON.data;
		this.fs = rewardsJSON.fs;
		this.fp = rewardsJSON.fp;
		this.write = rewardsJSON.write;
    }
    //Get a value given the key
    get(attribute) {
        return this.data[this.userID][attribute];
    }
    //Set a value to a key
    set(attribute, value) {
        this.data[this.userID][attribute] = value;
        this.write();
    }
    //Reset Streak
    resetStreak(attribute) {
        this.set(attribute, 0);
    }
    //Increment Streak
    incrementStreak(streak) {
        let curStreak = this.data[this.userID][streak];
        this.set(streak, curStreak+1);
        return curStreak+1;
    }
    //Increment time
    incrementTime(type) {
        let durationMs = (type=="daily") ? 86400000 : 1209600000;
        let curTime = this.data[this.userID][type];
        curTime += durationMs;
        this.set(type, curTime);
        return curTime;
    }
}

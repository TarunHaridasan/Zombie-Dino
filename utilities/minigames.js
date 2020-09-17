const JSONTemplate = require("./jsonTemplate");

class Minigames extends JSONTemplate {
    //Constructor
    constructor (userID, game) {
        super("minigames.json");
        this.userID = userID;
        this.userData = this.data[userID];
        this.game = this.userData[game];
    }

    //Start a game
    start() {
        this.game.active = true;
        this.write();
    }

    //Close a game
    stop() {
        this.game.active = false;
        this.write();
    }

    //Check if a game is in progress
    active() {
        return this.game.active;
    }

    //Set an attribute of a game
    set(attribute, value) {
        this.game[attribute] = value;
        this.write();
    }

    //Get an attribute of a game
    get(attribute) {
        return this.game[attribute];
    }
}
module.exports = Minigames;
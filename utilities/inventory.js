const JSONTemplate = require("./JSONTemplate.js");

class Inventory extends JSONTemplate {
    //Constructor
    constructor(userID) {
        super("inventory.json");
        this.userID = userID;
        this.userData = this.data[userID];
    }

    //Set item to a quantity
    setQuantity(item, quantity) {
        this.userData[item] = quantity;
        this.write();
    }

    //Get quantity of an item
    getQuantity(item) {
        return this.userData[item];
    }

    //Add quantity
    addQuantity(item, quantity) {
        this.userData[item]+=quantity;
        this.write()
    }

    //Subtract quantity
    minQuantity(item, quantity) {
        this.userData[item]-=quantity;
        this.write();
    }
}

module.exports = Inventory;
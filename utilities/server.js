const JSONTemplate = require("./jsonTemplate");

class Server extends JSONTemplate {
    constructor(serverID) {
        super("server.json");
        this.serverID = serverID;
        this.serverData = this.data[this.serverID];
    }
    addAdmin(userID) {
        this.serverData.admin.push(userID);
        this.write();
    }
    remAdmin(userID) {
        let index = this.serverData.admin.indexOf(userID);
        this.serverData.admin.splice(index, 1);
        this.write()
    }
    isAdmin(userID) {
        return this.serverData.admin.includes(userID);
    }
    changePrefix(prefix) {
        this.serverData.prefix = prefix;
        this.write();
    }
}

module.exports = Server;
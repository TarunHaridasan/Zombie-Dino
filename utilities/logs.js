class JSONTemplate {
    constructor() {
        this.fp = './logs/logs.txt';
        this.readFileSync = require('fs').readFileSync;
        this.writeFileSync = require('fs').writeFileSync;
        this.data = this.readFileSync(this.fp).toString();
    }
    write() {
        this.writeFileSync(this.fp, this.data);
    }
}
module.exports = JSONTemplate;
class JSONTemplate {
    constructor(name) {
        this.name = name;
        this.fp = data[name].fp;
        this.data = data[name].data;
        this.writeFileSync = require('fs').writeFileSync;
    }
    write() {
        this.writeFileSync(this.fp, JSON.stringify(this.data, null, 2));
    }
    get(attribute) {
        return this.data[attribute];
    }
    set(attribute, value) {
        this.data[attribute] = value;
    }
}
module.exports = JSONTemplate;
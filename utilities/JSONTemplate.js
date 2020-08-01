class JSONTemplate {
	constructor(fs, fp, data) {
		this.fs = fs; //fs object
		this.fp = fp; //File path
		this.data = data; //Actual json data
	}
	write() {
		this.fs.writeFileSync(this.fp, JSON.stringify(this.data, null, 2));
	}
}
module.exports = JSONTemplate;
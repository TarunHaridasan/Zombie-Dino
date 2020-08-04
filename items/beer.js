function chugBeer() {
    console.log(`Succcccc`);
}

module.exports.name = "beer";
module.exports.cost = 10;
module.exports.default = 0;
module.exports = {
    chugBeer: chugBeer
}
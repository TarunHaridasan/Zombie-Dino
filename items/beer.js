function chugBeer() {
    console.log(`Succcccc`);
}

//Item properties
module.exports.name = "beer";
module.exports.cost = 10;
module.exports.default = 0;
module.exports.functions = [
    {
        run: chugBeer,
        help: {
            name: ["beer"],
            description: "Chug a nice cold beer!",
            page: 0,
            title: "TBD"
        }
    }
];
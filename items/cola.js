async function chugBeer() {
    console.log(`Succcccc`);
}

//Item properties
module.exports.name = "cola";
module.exports.parsed = "Cola <:coke:740688701428072488>"
module.exports.cost = 10;
module.exports.default = 0;
module.exports.functions = [
    {
        run: chugBeer,
        help: {
            name: ["cola"],
            description: "Drink a can of cola!",
            page: 1,
            title: "General Commands"
        }
    }
];
function run() {
    let shop = [[]];
    for(key in items) {
        if(!shop[items[key].page-1]) shop[items[key].page-1] = [];
        shop[items[key].page-1].push({
            name: items[key].parsed,
            price: items[key].cost
        });
    };
    return shop;
};

module.exports = run;

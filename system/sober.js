module.exports.run = async (client, message, args) => {
    let userID = message.author.id;
    let ItemStats = require('../utilities/itemStats.js');
    let userStats = new ItemStats(userID);
    let ms = Date.now();
    if (userStats.userData.sober > 0) {
        let mins = Math.floor((ms - userStats.userData.sober)/60000);
        let reps = Math.floor(mins/5);
        for(let i = 0; i < reps; i++) userStats.sober();
    }
    if (userStats.userData.soberSugar > 0) {
        let mins = Math.floor((ms - userStats.userData.soberSugar)/60000);
        let reps = Math.floor(mins/5);
        for(let i = 0; i < reps; i++) userStats.unSugar();
    }
};

module.exports.help = {
    name: ['sober']
};

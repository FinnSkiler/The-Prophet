const chalk = require('chalk');
module.exports = client => {
    console.log(chalk.bgGreen.black(`I\'m online!`));

    client.user.setActivity("The Whole Mortal Universe", {type: "WATCHING"});
}

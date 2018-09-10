module.exports = client => {
    console.log(`I\'m online!`);

    client.user.setActivity("The Whole Mortal Universe", {type: "WATCHING"});
}

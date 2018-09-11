// const http = require('http');
// const express = require('express');
// const app = express();
// app.get("/", (request, response) => {
//   console.log(Date.now() + " Ping Received");
//   response.sendStatus(200);
// });
// app.listen(process.env.PORT);
// setInterval(() => {
//   http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 280000);


// START
const Discord = require('discord.js');
const settings = require('./settings.json'); //Remove while hosting
const stuff = require('./stuff.json')
const fs = require("fs");
const Enmap = require("enmap");
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.system = new Enmap({name: "system"});

require('./util/eventLoader')(client);

const prayed = new Set();
const alreadyTalked = new Set();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });

});


var prefix = "!"; // sets prefix

client.on('message', async msg => {

  if (msg.author.bot) return;

    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);

    const mUser = `${msg.author.id}`;
    const aUser = msg.mentions.users.first() || client.users.get(args[0]);

  // Enmap Instatiation
  client.system.ensure(mUser, {
    user: msg.author.id,
    points: 0,
    level: 0,
    lastSeen: new Date()
  });

  // Commands
   if (cmd.startsWith(prefix)){
    let cmdfile = client.commands.get(cmd.slice(prefix.length));
    if(cmdfile) cmdfile.run(client, msg, args);
  }
  // PRAYING To Tenshi-sama
  else if (msg.content === '🙏') {
    if (!msg.guild) return;
      if (alreadyTalked.has(mUser)) {
        msg.channel.send(msg.author + "   I understand you want to pray to Tenshi-sama but she can't be online all the time.\nSo you can only pray to Tenshi-Sama once per hour. :grinning:  ");
      } else if (prayed.has(mUser)) {
                msg.channel.send(msg.author + "   You can only pray once per hour online.\nTenshi-Sama will accept you prayers, even if you don't display it. :blush: ");
                alreadyTalked.add(mUser);
                 setTimeout(() => {
                   alreadyTalked.delete(mUser);
                 }, 300000);
        }  else {
          msg.channel.send(msg.author + "   " + stuff.response[Math.floor(Math.random() * stuff.response.length)]);
          client.system.inc(mUser, "points");
          prayed.add(mUser);
            setTimeout(() => {
              prayed.delete(mUser);
          }, 3600000); }
        }
    // PRAYING To Diabolos
    else if (msg.content === '👿' || msg.content === '😈') {
      if (!msg.guild) return;
      if (alreadyTalked.has(mUser)) {
        msg.channel.send(msg.author + "   You actually dare to make me repeat my words twice!!\nYou can only pray to Demon Lord Diabolos once per hour.\nDon't you understand such a simple statement!?");
      } else if (prayed.has(mUser)) {
                msg.channel.send(msg.author + "   You can only pray once per hour.\nDiabolos-sama isn't so free as to respond to each of your prayers.");
                alreadyTalked.add(mUser);
                 setTimeout(() => {
                   alreadyTalked.delete(mUser);
                 }, 300000);
        }  else {
          msg.channel.send(msg.author + "   " + stuff.response[Math.floor(Math.random() * stuff.response.length)]);
          client.system.dec(mUser, "points");
          prayed.add(mUser);
            setTimeout(() => {
              prayed.delete(mUser);
          }, 3600000); }
    }

  if (cmd === `${prefix}level`) {
    if (!aUser) {
    const mPoints = client.system.get(mUser, "points");  // points count
    const mLevel = client.system.get(mUser, "level"); // Level count
    if (mPoints > 0) {msg.reply(`You currently have ${mPoints} points, and are a level ***${mLevel} Holy Warrior***!`);}
    else if (mPoints < 0) {msg.reply(`You currently have ${mPoints} points, and are a level ***${mLevel} Evil Warrior***!`);}
    else {msg.reply(`You currently have ${mPoints} points, and are at level ${mLevel}`);}
  }
    else { if (client.system.get(aUser.id)) {
    const aPoints = client.system.get(aUser.id, "points"); // points count
    const aLevel = client.system.get(aUser.id, "level"); // level count

  if (aPoints > 0) {msg.channel.send(`${aUser.username} currently has ${aPoints} points, and is a level ***${aLevel} Holy Warrior***!`);}
    else if (aPoints < 0) {msg.channel.send(`${aUser.username} currently has ${aPoints} points, and is a level ***${aLevel} Evil Warrior***!`);}
    else {msg.channel.send(`${aUser.username} currently has ${aPoints} points, and is at level ${aLevel}`);}}else msg.reply("This user does not have any level or points");}
  }
  else if (cmd === `${prefix}giveXP`) {
  if (mUser === "466199311487860737" || mUser === "251110656865075200") {
    const pointsToAdd = parseInt(args[1]);
    if (!pointsToAdd > 0 || !pointsToAdd < 0) { return msg.reply(`Please mention an appropriate value to add, ${pointsToAdd} is not a value.\n***USAGE:*** \"!give <@user> <points>\"`);}
    if (!aUser) { return msg.reply(`Please mention a user, ${aUser} is not a user.\n***USAGE:*** \"!give <@user> <points>\"`);}

    // Initiate if not
    client.system.ensure(aUser.id, {
      user: aUser.id,
      points: 0,
      level: 0,
      lastSeen: new Date()
    });

    msg.reply(`Given ${pointsToAdd} points to ${aUser.username}`);
    client.system.math(aUser.id, "+", pointsToAdd, "points");
    // level update
    const bPoints = Math.abs(client.system.get(aUser.id, "points")); // Positify and get new points
    const newLevel = Math.floor(0.3 * Math.sqrt(bPoints)); // level update
    client.system.set(aUser.id, newLevel, "level");
    msg.reply(`${aUser.username}\'s level is now ${newLevel}`);
  } else msg.reply("You don't have the authority to do so");
}

    // ENSURE LAST METHOD
// Level calculation and message and stuff
    const mPoints = client.system.get(mUser, "points"); // Points count
    const oldLevel = client.system.get(mUser, "level"); // Level count
    const posPoints = Math.abs(mPoints); // Positify value
    const curLevel = Math.floor(0.3 * Math.sqrt(posPoints)); // level up?

if (oldLevel < curLevel) {
  if (oldLevel !== 0 && curLevel === 0) {msg.reply("You are now neutral.")}
  else if (mPoints > 0) { msg.reply(`You've leveled up to a level **${curLevel}** ***Holy Warrior***! Tenshi-sama gives you her blessings.`);}
  else if (mPoints < 0) {  msg.reply(`You've leveled up to a level **${curLevel}** ***Evil Warrior***! Demon-sama gives you his blessings.`);}
  client.system.set(mUser, curLevel, "level");
}
else if (oldLevel > curLevel) {
  if (oldLevel !== 0 && curLevel === 0) {msg.reply("You are now neutral.")}
  else if (mPoints > 0) {  msg.reply(`You've leveled down to a level **${curLevel}** ***Holy Warrior***! Tenshi-sama senses you betrayal.`);}
  else if (mPoints < 0) {  msg.reply(`You've leveled down to a level **${curLevel}** ***Evil Warrior***! Diabolos-sama senses you betrayal.`);}
  client.system.set(mUser, curLevel, "level");
}

if (cmd === "~~~~") {msg.reply(aUser.id +"  "+ mUser)}
});

client.login(settings.token); // Remove when hosting
// client.login(process.env.TOKEN)

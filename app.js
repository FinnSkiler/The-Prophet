const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// START
const Discord = require('discord.js');
const stuff = require('./stuff.json')
const fs = require("fs");
const Enmap = require("enmap");
const client = new Discord.Client();
// const settings = require('./settings.json') //remove

client.commands = new Discord.Collection();

require('./util/eventLoader')(client);

const talked = new Set();

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

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const mUser = `${msg.author.id}`;
    const aUser = msg.mentions.users.first() || client.users.get(args[0]);
    const diabolos = msg.guild.roles.get("488567927788929048");
    const shadow = msg.guild.roles.get("488743653674844172");
    const safe = msg.guild.roles.get("494507345011802123");

  const prayerTimeout = 3600000;
  const now = new Date().getTime();

  // Commands
   if (msg.content.startsWith(prefix)){

    let cmdfile = client.commands.get(cmd);
    if(cmdfile) cmdfile.run(client, msg, args);

   else if (cmd === `level`) {
    //   if (!aUser) {
    //   const mPoints = client.system.get(mUser, "posPoints");  // points count
    //   const mLevel = client.system.get(mUser, "level"); // Level count
    //   if (mPoints >= 100) {msg.reply(`You currently have ${mPoints} points, and are a level ***${mLevel} Holy Warrior***!\n Also you have maxed out your level for the beta! ***CONGRATULATIONS***`);}
    //   else if (mPoints > 0) {msg.reply(`You currently have ${mPoints} points, and are a level ***${mLevel} Holy Warrior***!`);}
    //   else if (mPoints < 0) {msg.reply(`You currently have ${mPoints} points, and are a level ***${mLevel} Evil Warrior***!`);}
    //   else {msg.reply(`You currently have ${mPoints} points, and are at level ${mLevel}`);}
    // }
    //   else { if (client.system.get(aUser.id)) {
    //   const aPoints = client.system.get(aUser.id, "points"); // points count
    //   const aLevel = client.system.get(aUser.id, "level"); // level count
    //
    // if (aPoints > 0) {msg.channel.send(`${aUser.username} currently has ${aPoints} points, and is a level ***${aLevel} Holy Warrior***!`);}
    //   else if (aPoints < 0) {msg.channel.send(`${aUser.username} currently has ${aPoints} points, and is a level ***${aLevel} Evil Warrior***!`);}
    //   else {msg.channel.send(`${aUser.username} currently has ${aPoints} points, and is at level ${aLevel}`);}}else msg.reply("This user does not have any level or points");}
    msg.reply("Currently Unavailable");
    }
    else if (cmd === `givexp`) {
    // if (mUser === "466199311487860737" || mUser === "251110656865075200") {
    //   const pointsToAdd = parseInt(args[1]);
    //   if (!pointsToAdd > 0 || !pointsToAdd < 0) { return msg.reply(`Please mention an appropriate value to add, ${pointsToAdd} is not a value.\n***USAGE:*** \"!give <@user> <points>\"`);}
    //   if (!aUser) { return msg.reply(`Please mention a user, ${aUser} is not a user.\n***USAGE:*** \"!give <@user> <points>\"`);}
    //
    //   // Initiate if not
    //   client.system.ensure(aUser.id, {
    //     user: aUser.id,
    //     points: 0,
    //     level: 0,
    //     lastSeen: new Date()
    //   });
    //
    //   msg.reply(`Given ${pointsToAdd} points to ${aUser.username}`);
    //   client.system.Math(aUser.id, "+", pointsToAdd, "points");
    //
    //   // level update
    //   const bPoints = Math.abs(client.system.get(aUser.id, "points")); // Positify and get new points
    //   const newLevel = Math.floor(0.3 * Math.sqrt(bPoints)); // level update
    //   client.system.set(aUser.id, newLevel, "level");
    //   msg.reply(`${aUser.username}\'s level is now ${newLevel}`);
    // } else msg.reply("You don't have the authority to do so");
    msg.reply("Currently Unavailable");
  }
  else if (cmd === 'leaderboard' || cmd === 'lb') {
 //  const filter = client.system.array();
 // const sort = filter.sort((a, b) => {
 //   if (a.level > b.level) return -1;
 //   if (a.level < b.level) return 1;
 //   if (a.posPoints > b.posPoints) return -1;
 //   if (a.posPoints < b.posPoints) return 1;
 // });
 // const top10 = sort.splice(0, 10);
 //   const embed = new Discord.RichEmbed()
 //      .setTitle("***Leaderboards***")
 //      .setDescription("***Our top 10 points leaders!***")
 //      .setColor(0x00AE86);
 //    for(const data of top10) {
 //      embed.addField(client.users.get(data.user).tag, `Level ${data.level} (${data.points} points)`);
 //    }
 //    return msg.channel.send({embed});
 msg.reply("Currently Unavailable");}
  else if (cmd === `reset`) {
    // if (mUser === "466199311487860737" || mUser === "251110656865075200") {
    //   if (!args[0]) return msg.reply("Error");
    //   else { client.prayer.set(aUser.id, 0, "prayer");
    //         msg.reply("Done");
    // }}
  msg.reply("Currently Unavailable");}
  else if (cmd === "saveme") { msg.reply("YOU CAN'T BE SAVED! :imp: \n(Until I'm fixed)");
    // if (msg.member.roles.has(safe.id)) {
      // const safeLeft = Math.floor(604800000 - (now - client.prayer.get(mUser, "safe")));
    //   const safeSecE = Math.floor(safeLeft / 1000);
    //   const safeDay = Math.floor(safeSecE / 86400);
    //   const safeEstHour = (safeSecE % 86400);
    //   const safeHour = Math.floor(safeEstHour / 3600);
    //   const safeEstMin = (safeSecE % 3600);
    //   const safeMin = Math.floor(safeEstMin / 60);
    //   const safeEstSec = (safeEstMin % 60);
    //   const safeSec = Math.ceil(safeEstSec);
    //
    //   if (safeLeft <= 0) {
    //     msg.member.removeRole(safe).catch(console.error);
    //     client.prayer.set(mUser, 0, "safe");
    //     msg.reply("Successfully removed from Safe Bubble!");
    //   }
    //   else { msg.reply(`You need to wait a week before undoing this command.\nTime left is ***${safeDay} day(s), ${safeHour} hour(s), ${safeMin} Minute(s) and ${safeSec} second(s)***`);}
    // }
    // else {
    //   msg.member.addRole(safe).catch(console.error);
    //   client.prayer.set(mUser, now, "safe");
    //   msg.reply("You are now in the Safe Bubble, NSFW begone!");
    // }
  }
  else if (cmd === "shadow") {
    const shadowNotify = msg.guild.roles.get("488567927788929048");
    if (msg.member.roles.has(shadowNotify.id)) {
      msg.member.removeRole(shadowNotify).catch(console.error);
      msg.reply("Shadow feels lonely.");
    }
    else {
      msg.member.addRole(shadowNotify).catch(console.error);
      msg.reply("You will now be notified when a new shadowo chapter is released.")
    }
  }
  }

else if(!msg.content.startsWith(prefix)) {

  // PRAYING To Tenshi-sama
  if (msg.content.startsWith('🙏')) {
    if (msg.channel.id === "484743878763610122") {
      if (talked.has(mUser)) {
        msg.reply("You can only pray once per hour online.\nTenshi-Sama will accept you prayers, even if you don't display it. :blush: ");

      } else {
        msg.channel.send(msg.author + "   " + stuff.responseP[Math.floor(Math.random() * stuff.responseP.length)]);
        talked.add(mUser)
        setTimeout(() => {
    talked.delete(mUser);
  }, prayerTimeout);
        }
      }

  }
    // PRAYING To Diabolos
    else if (msg.content.startsWith('👿') || msg.content.startsWith('😈')) {
      if (msg.channel.id === "484743878763610122"){
        if (talked.has(mUser)) {
          msg.reply("Fool, You Dare To Pray More Than Once In An Hour.\n I\'ll Reset Your Points If I See This Again :imp:");

        } else {
          msg.channel.send(msg.author + "   " + stuff.responseN[Math.floor(Math.random() * stuff.responseN.length)]);}
          talked.add(mUser)
          setTimeout(() => {
      talked.delete(mUser);
    }, prayerTimeout);
    }}
   else if (msg.content === '🖕') {msg.reply("No swearing please.\n Also, same to you");}
  }


    // ENSURE LAST METHOD
// Level calculation and message and stuff
//     const mPoints = client.system.get(mUser, "points"); // Points count
//     const oldLevel = client.system.get(mUser, "level"); // Level count
//     const posPoints = Math.abs(mPoints); // Positify value
//     const curLevel = Math.floor(0.3 * Math.sqrt(posPoints)); // level up?
//
// if (oldLevel < curLevel) {
//   if (oldLevel !== 0 && curLevel === 0) {msg.reply("You are now neutral.")}
//   else if (mPoints > 0) { msg.reply(`You've leveled up to a level **${curLevel}** ***Holy Warrior***! Tenshi-sama gives you her blessings.\n***NOTE:*** This is beta version. When the official version is released all points will be reset`);}
//   else if (mPoints < 0) {  msg.reply(`You've leveled up to a level **${curLevel}** ***Evil Warrior***! Demon-sama gives you his blessings.`);}
//   client.system.set(mUser, curLevel, "level");
//
//   if (client.system.get(mUser, "level") === 2) {
//   if (mPoints > 0) {
//     msg.reply("***Congratulation!!***\nYou now serve the ***Shadow Garden***!");
//     msg.member.addRole(shadow).catch(console.error);
//   }
// }
// }
// else if (oldLevel > curLevel) {
//   if (oldLevel !== 0 && curLevel === 0) {msg.reply("You are now neutral.")}
//   else if (mPoints > 0) {  msg.reply(`You've leveled down to a level **${curLevel}** ***Holy Warrior***! Tenshi-sama senses you betrayal.`);}
//   else if (mPoints < 0) {  msg.reply(`You've leveled down to a level **${curLevel}** ***Evil Warrior***! Diabolos-sama senses you betrayal.`);}
//   client.system.set(mUser, curLevel, "level");
// }

});

client.login(process.env.TOKEN);

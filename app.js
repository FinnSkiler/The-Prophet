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
          msg.channel.send(msg.author + "   " + settings.greets[Math.floor(Math.random() * settings.greets.length)]);
          client.system.dec(mUser, "points");
          prayed.add(mUser);
            setTimeout(() => {
              prayed.delete(mUser);
          }, 3600000); }
    }

    // Level calculation nad message
    const curLevel = Math.floor(0.5 * Math.sqrt(client.points.get(mUser, "points")));
    if (client.points.get(mUser, "level") < curLevel) {
   message.reply(`You've leveled up to level **${curLevel}**! Blessed By Tenshi Sama`);
   client.points.set(mUser, curLevel, "level");
 } else if (client.points.get(mUser, "level") > curLevel) {
      message.reply(`You've leveled up to level (+)**${curLevel}**! Ain't that dandy?`);
      client.points.set(mUser, curLevel, "level");
    }

  // Remove later **Temp**
  if (cmd === `${prefix}points`) {
    message.channel.send(`You currently have ${client.points.get(mUser, "points")} points, and are level ${client.points.get(mUser, "level")}!`);
  }
  else if (cmd === `${prefix}dec`) {}
  else if (cmd === `${prefix}inc`) {
    const pointsToAdd = args[1];
    client.points.math(mUser, "+", pointsToAdd, "points");
  }

});

client.login(settings.token); // Remove when hosting
// client.login(process.env.TOKEN)

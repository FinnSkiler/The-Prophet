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
const client = new Discord.Client();
const settings = require('./settings.json'); //Remove while hosting
const stuff = require('./stuff.json')
const fs = require("fs");
client.commands = new Discord.Collection();

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

  // Commands
   if (cmd.startsWith(prefix)){
    let cmdfile = client.commands.get(cmd.slice(prefix.length));
    if(cmdfile) cmdfile.run(client, msg, args);
  }
  //PRAYING
  else if (msg.content === '🙏') {
      if (alreadyTalked.has(msg.author.id)) {
        msg.channel.send(msg.author + "   I understand you want to pray to Tenshi-Sama but she can't be online all the time.\nSo you can only pray to Tenshi-Sama once per hour. :grinning:  ");
      } else if (prayed.has(msg.author.id)) {
                msg.channel.send(msg.author + "   You can only pray to Tenshi-Sama once per hour online.\nTenshi-Sama will accept you prayers, even if you don't display it. :blush: ");
                alreadyTalked.add(msg.author.id);
                 setTimeout(() => {
                   alreadyTalked.delete(msg.author.id);
                 }, 300000);
        }  else {
          msg.channel.send(msg.author + "   " + stuff.response[Math.floor(Math.random() * stuff.response.length)]);
          prayed.add(msg.author.id);
            setTimeout(() => {
              prayed.delete(msg.author.id);
          }, 3600000); }
        }

});

client.login(settings.token); // Remove when hosting
// client.login(process.env.TOKEN)

const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json'); //Remove while hosting
const stuff = require('./stuff.json')
const fs = require("fs");
client.commands = new Discord.Collection();

require('./util/eventLoader')(client);

const prayed = new Set();
const alreadyTalked = new Set();
const rep1 = new Set();
const rep2 = new Set();
const finalRep = new Set();

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


client.on('message', async msg => {

  if (msg.author.bot) return;

    let prefix = "!"
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);
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
//  nsfw.js not working lol
  else if (cmd === `nsfw`) {

    let uRole = msg.guild.roles.find(`name`, "UNHOLY");
    console.log(msg.author.username + " Is   UNHOLY");

  if (finalRep.has(msg.author.id)) {
     msg.member.addRole(uRole).catch(console.error);
    msg.channel.send("Even after repeated warnings, you still went against the path of sacred-ness and have earned the title ***Unholy Path Follower***");
  }
  else {if (rep2.has(msg.author.id)) {
    msg.channel.send("***CONGRATULATIONS!!!*** You have been reported to Tenshi-sama");
    finalRep.add(msg.author.id);
  }
    else {if (rep1.has(msg.author.id)) {
    msg.channel.send("This is your second warning. At the third warning I wil report this to Tenshi-sama.");
    rep2.add(msg.author.id);
  }
      else {if (!rep1.has(msg.author.id) && !rep2.has(msg.author.id) && !finalRep.has(msg.author.id)){
    msg.channel.send("This is your first warning. If you continue this then I wil report this to Tenshi-sama.");
    rep1.add(msg.author.id);
  }
}}}
  }
});

client.login(settings.token);

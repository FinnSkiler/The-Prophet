const rep1 = new Set();
const rep2 = new Set();
const finalRep = new Set();


module.exports.run = async (client, msg, args) => {


  let uRole = msg.guild.roles.find(`name`, "UNHOLY");

console.log("UNHOLY");
if (finalRep.has(msg.author.id)) {
   msg.member.addRole(uRole).catch(console.error);
  msg.channnel.send(uRole + "   " + uRole.id)
  msg.channel.send("Even after repeated warnings, you still went against the path of sacred-ness and have earned the title ***Unholy Path Follower***");
}
else if (rep2.has(msg.author.id)) {
  msg.channel.send("***CONGRATULATIONS!!!*** You have been reported to Tenshi-sama");
  finalRep.add(msg.author.id);
}
else if (rep1.has(msg.author.id)) {
  msg.channel.send("This is your second warning. At the third warning I wil report this to Tenshi-sama.");
  rep2.add(msg.author.id);
}
 else if (!rep1.has(msg.author.id) && !rep2.has(msg.author.id) && !finalRep.has(msg.author.id)){
  msg.channel.send("This is your first warning. If you continue this then I wil report this to Tenshi-sama.");
  rep1.add(msg.author.id);
} else msg.channel.send("an error occured");
}

module.exports.help = {
  name: "NFSW"
}

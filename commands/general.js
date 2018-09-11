module.exports.run = async (client, msg, args) => {
  if ((msg.author.id === '466199311487860737' || msg.author.id === '251110656865075200')) {
msg.client.channels.get("483657642536075296").send(args.join(" "));
  }
  else msg.reply("You don't have the authority to do this.");
}

module.exports.help = {
  name: "general"
}

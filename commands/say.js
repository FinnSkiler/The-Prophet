module.exports.run = async (client, msg, args) => {
  if ((msg.author.id === '466199311487860737' || msg.author.id === '251110656865075200')) {
    msg.channel.send(args.join(" "));
    msg.delete().catch(O_o=>{});
  }

  else msg.reply("You don't have the authority to do this.");
}

module.exports.help = {
  name: "say"
}

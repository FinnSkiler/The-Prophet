module.exports.run = async (client, msg, args) => {
  const link = args.shift()
  if ((msg.author.id === '466199311487860737' || msg.author.id === '241780778147512321')) {
    if (link) {
      msg.channel.send("<@&488567927788929048>, New Shadow chapter released.\nCheck it out now --> " + link + "\n" + args.join(" "));
      msg.delete().catch(O_o=>{});
    }
    else {
      msg.reply("Wrong Usage,\n***USAGE:***  !new <Link to chapter> [comments]\n***Example:*** \"!new https://www.example.com/ this is an example site.\"");
    }
  }

  else msg.reply("You don't have the authority to do this.");
}

module.exports.help = {
  name: "new"
}

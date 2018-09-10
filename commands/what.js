module.exports.run = async (client, msg, args) => {
  msg.channel.send({embed: {
  color: 3447003,
  //icon: (client.user.displayAvatarURL),
  title: "Greetings, beings from the mortal world. This is Tenshi-Ssama, The Holy Goddess.\nThings you can do currently:",
  fields: [{
    name: "🙏",
    value: "Pray to Tenshi-sama once every hour and get a chance to win an ***OP Blessing***!",
  },
  {
    name: "!wakanda",
    value: "An absolutely *useless* command.",
  },
  {
    name: "!nsfw",
    value: "Don't ever, ever use this command. And I mean never ever.",
  }
  // {
  //   name: "",
  //   value: " ",
  // }
  ]}
});
}

module.exports.help = {
  name: "what"
}

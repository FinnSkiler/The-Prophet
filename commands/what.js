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
    name: "👿 ***or*** 😈",
    value: "Pray to Diabolos-sama once every hour and get a chance to win an ***OP CURSE***!",
  },
  {
    name: "!shadow",
    value: "Pings you whenever a new shadow chapter is released.",
  },
  {
    name: "!level",
    value: "Tells you your level (***Currently Disabled***).\n ***USAGE:*** Check other's lvl - \"!level <@user>\"\nCheck own lvl - \"!level\"",
  },
  {
    name: "!SaveMe ***or*** !saveme [Caps don't matter]",
    value: "Removes NSFW channel from your server or undoes it. Cooldown - 1 week",
  },
  {
    name: "!leaderboard or !lb",
    value: "Shows the leaderboard for highest to lowest points and levels.\n***Currently Disabled***",
  }
  // {
  //   name: "",
  //   value: "",
  // }
  ]}
});
}

module.exports.help = {
  name: "what"
}

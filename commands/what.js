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
    value: "New feature coming soon.\nCan you guess what it is? Check out !guess",
  },
  {
    name: "!level",
    value: "Tells you your level.\n ***USAGE:*** Check other's lvl - \"!level <@user>\"\nCheck own lvl - \"!level\"",
  },
  {
    name: "!SaveMe ***or*** !saveme [Caps don't matter]",
    value: "Removes NSFW channel from your server or undoes it. Cooldown - 1 week",
  },
  {
    name: "!guess",
    value: "Guess the new feature(👿 or 😈) and win 30 points!\n***Usage*** : \"!guess <your guess>\"\nReplace <your guess> with you guess and check if its correct.\n***HINT***: The answer is 3 words long. Also may be related to my profile pic.",
  },
  {
    name: "!leaderboard or !lb",
    value: "Shows the leaderboard for highest to lowest points and levels",
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

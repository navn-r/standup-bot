const standupModel = require("../models/standup.model");

module.exports = {
  name: "reply",
  usage: "@<optional_serverId> [your-message-here]",
  description: "Reply to standup prompt",
  execute(message, args) {
    if (message.channel.type === "dm") {
      if (!args.length || (args.length == 1 && args[0].startsWith("@")))
        return message.reply(
          "Ruh Roh! You must provide a response as a message. No one likes a :ghost: as a team member :exclamation: :anger:"
        );

      if (args[0].startsWith("@")) {
        standupModel
          .findById(args[0].slice(1))
          .then((standup) => {
            if (standup.members.indexOf(message.author.id) !== -1) {
              standup.responses.set(
                message.author.id,
                args.splice(1).join(" ")
              );

              standup
                .save()
                .then(() => message.channel.send("Updated Response :tada:"))
                .catch((err) => {
                  console.error(err);
                  message.channel.send(
                    "Oh no :scream:! An error occured somewhere in the matrix!"
                  );
                });
            } else {
              message.channel.send(
                "Ruh Roh! You must be a team member in this server standup to reply to the response!"
              );
            }
          })
          .catch((err) => {
            console.error(err);
            message.channel.send(
              "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          });
      } else {
        standupModel
          .find()
          .then((standups) => {
            const userStandupList = standups.filter(
              (standup) => standup.members.indexOf(message.author.id) !== -1
            );

            if (!userStandupList.length) {
              message.channel.send(
                "Ruh Roh! You must be a team member in ***__any__*** server standup to reply to the response!"
              );
            } else if (userStandupList.length > 1) {
              message.channel.send(
                "Ruh Roh! Looks like you're a member in multiple standup servers!\nTry `!reply @<serverId> [your-message-here]` if you would like to reply to a *specific* standup server.\n**_Crunchy Hint:_** To get the serverId for *any* server, right-click the server icon and press `Copy ID`.\nNote that you may need Developer options turned on. But like, what kinda developer uses a standup bot **_AND DOESN'T TURN ON DEVELOPPER SETTINGS_** :man_facepalming:"
              );
            } else {
              let [standup] = userStandupList;
              standup.responses.set(
                message.author.id,
                args.join(" ")
              );
              standup
                .save()
                .then(() => message.channel.send("Updated Response :tada:"))
                .catch((err) => {
                  console.error(err);
                  message.channel.send(
                    "Oh no :scream:! An error occured somewhere in the matrix!"
                  );
                });
            }
          })
          .catch((err) => {
            console.error(err);
            message.channel.send(
              "Oh no :scream:! An error occured somewhere in the matrix!"
            );
          });
      }
    } else {
      return message.reply("private DM me with `!reply` :bomb:");
    }
  },
};

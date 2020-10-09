const standupModel = require("../models/standup.model");

module.exports = {
  name: "view",
  usage: "@<optional_serverId>",
  description: "View your standup prompt",
  execute(message, args) {
    if (message.channel.type === "dm") {
      if (args.length == 1 && !args[0].startsWith("@")) {
        return message.reply(
          "Ruh Roh! Thats an invalid command call, try `!help view` for more information."
        );
      } else if (args.length && args[0].startsWith("@")) {
        standupModel
          .findById(args[0].slice(1))
          .then((standup) => {
            if (standup.members.indexOf(message.author.id) !== -1) {
              if (standup.responses.has(message.author.id)) {
                message.reply(
                  "Here is your response:\n" +
                    standup.responses.get(message.author.id)
                );
              } else {
                message.reply(
                  "Ruh Roh! Looks like you do not have a response yet! Add one using the command `!reply @<optional_serverId> [your-message-here]`."
                );
              }
            } else {
              message.channel.send(
                "Ruh Roh! You must be a team member in this server standup!"
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
                "Ruh Roh! You must be a team member in ***__at least one__*** server standup to view your response!"
              );
            } else if (userStandupList.length > 1) {
              message.channel.send(
                "Ruh Roh! Looks like you're a member in multiple standup servers!\nTry `!view @<serverId>` if you would like to view a response for a *specific* standup server.\n**_Crunchy Hint:_** To get the serverId for *any* server, right-click the server icon and press `Copy ID`.\nNote that you may need Developer options turned on. But like, what kinda developer uses a standup bot **_AND DOESN'T TURN ON DEVELOPPER SETTINGS_** :man_facepalming:"
              );
            } else {
              let [standup] = userStandupList;
              if (standup.responses.has(message.author.id)) {
                message.reply(
                  "Here is your response:\n" +
                    standup.responses.get(message.author.id)
                );
              } else {
                message.reply(
                  "Ruh Roh! Looks like you do not have a response yet! Add one using the command `!reply @<optional_serverId> [your-message-here]`."
                );
              }
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
      return message.reply("private DM me with `!view` :bomb:");
    }
  },
};

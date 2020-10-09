const standupModel = require("../models/standup.model");

/**
 * !list - list all participating members
 */
module.exports = {
  name: "list",
  guildOnly: true,
  description: "List of all members participating in the standup",
  execute(message, args) {
    standupModel.findById(message.guild.id).then(standup => {
      let res = "Here are all members participating in the standup:\n";
      if(!standup.members.length) {
        message.reply("there does not seem to be any members in the standup. Try `!am @<user> @<optional_user> ...` to add member(s)")
      } else {
        standup.members.forEach(member => {
          res += `<@${member}>\t`;
        });
        message.channel.send(res);
      }
    }).catch(err => {
      console.error(err);
      message.channel.send(
        "Oh no :scream:! An error occured somewhere in the matrix!"
      );
    })
  },
};

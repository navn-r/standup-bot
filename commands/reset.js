const standupModel = require("../models/standup.model");

/**
 * !reset - resets the standup (wipes from database, and re-inits)
 * NOTE: - server admin can only preform this operation
 *       - command only works if text channel has been created already
 */
module.exports = {
  name: "reset",
  guildOnly: true,
  description: "Resets the standup",
  async execute(message, args) {
    // Check if user has perms
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.reply("You do not have the required permission!");
    }

    let check = true;
    standupModel.findById(message.guild.id).then(standup => {
      standup.members.forEach(id => {if(standup.responses.has(id)) {standup.responses.delete(id);}});
      standup.members = [];
      standup.save().then(() => message.channel.send("\nStandup successfully reset! :tada:\n*There are no memebers in the standup, and all responses have been cleared!*")).catch(err => {
        console.error(err);
        message.channel.send("Oh no :scream:! An error occured somewhere in the matrix!");
      })
    }).catch(err => {
      console.error(err);
      message.channel.send("Oh no :scream:! An error occured somewhere in the matrix!");
    })
  },
};

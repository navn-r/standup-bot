const standupModel = require("../models/standup.model");
/**
 * !rm - removes member from standup
 * NOTE: server admin can only preform this operation
 */
module.exports = {
  name: "rm",
  usage: "@<user> @<optional_user> ...",
  guildOnly: true,
  description: "Removes a member from the standup",
  async execute(message, args) {
    if (!args.length)
      return message.channel.send(
        "Ruh Roh! You need to mention **_at least_** one member as argument!"
      );

    standupModel
      .findById(message.guild.id)
      .then((standup) => {
        args.forEach((mention) => {
          if (mention.startsWith("<@") && mention.endsWith(">")) {
            mention = mention.slice(2, -1);

            if (mention.startsWith("!")) 
                mention = mention.slice(1);

            const member = message.guild.members.cache.get(mention);
            if(member)
              message.guild.roles.fetch(standup.roleId).then((role) => member.roles.remove(role));
          }
        });
      })
      .catch((err) => {
        console.error(err);
        message.channel.send(
          "Oh no :scream:! An error occured somewhere in the matrix!"
        );
      });
  },
};

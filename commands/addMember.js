/**
 * !am - Adds a new member to the standup
 * NOTE: server admin can only preform this operation
 */
module.exports = {
  name: "am",
  usage: "<user>",
  guildOnly: true,
  description: "Adds a new member to the standup",
  execute(message, args) {
    // check if id already exists -> notify if true
    // push member discord id to standupSchema.members
    message.channel.send("INSERT ADD PROMPT HERE");
  },
};

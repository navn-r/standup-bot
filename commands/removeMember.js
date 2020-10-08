/**
 * !rm - removes member from standup
 * NOTE: server admin can only preform this operation
 */
module.exports = {
  name: "rm",
  usage: "<user>",
  guildOnly: true,
  description: "Removes a member from the standup",
  execute(message, args) {
    // check if member is in standupSchema.members -> notify if false
    // remove response from standupSchema.responses if exists
    // pop from standupSchema.members
    message.channel.send("INSERT REMOVE PROMPT HERE");
  },
};

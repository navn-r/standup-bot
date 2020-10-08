/**
 * !list - list all participating members
 */
module.exports = {
  name: "list",
  guildOnly: true,
  description: "List of all members participating in the standup",
  execute(message, args) {
    // get standupSchema.members 
    // get username from id and send as message
    message.channel.send("INSERT LIST OF ALL MEMBERS HERE");
  },
};

const mongoose = require("mongoose");
const Standup = require("../models/standup.model");

// fix later
const STANDUP_CHANNEL_DESCRIPTION = "This is the newly generated **_read-only_** text channel used for daily standups! :tada:";

/**
 * !init - creates the required text channel
 * NOTE: server admin can only preform this operation
 */
module.exports = {
  name: "init",
  guildOnly: true,
  description: "Initializes the standup",
  async execute(message, args) {
    // Check if user has perms
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.reply("You do not have the required permission!");
    }

    // creates the text channel
    const channel = await message.guild.channels.create("daily-standups", {
      type: "text",
      topic: "Auto generated channel by Stan D. Upbot",
    });

    // sets text channel to read only
    await channel.createOverwrite(message.guild.roles.everyone, {
      SEND_MESSAGES: false,
      MANAGE_MESSAGES: false
    });

    channel.send(STANDUP_CHANNEL_DESCRIPTION);
  },
};

module.exports = {
  name: "show",
  description: "Shows standup prompt",
  async execute(message, args) {
    message.channel.send(`
Here is the daily standup prompt:
\`\`\`
1. What have you done since yesterday?
2. What are you planning on doing today?
3. Any impediments or stumbling blocks?
\`\`\`Please make sure you have thought about your response **_very carefully_** as standups are more for *the entire team*.
Once you are ready to respond, simply DM me with \`!reply ...\` where \`...\` represents your response. :stuck_out_tongue:
    `);
  },
};

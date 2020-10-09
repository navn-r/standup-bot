const PREFIX = "!";

/**
 * !help command - Lists out all the available commands
 */
module.exports = {
  name: "help",
  description: "Shows all commands",
  usage: "[command name]",
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    /**
     * If the user wants all the commands
     */
    if (!args.length) {
      data.push("Here's a list of all my commands:");
      let cmds = "";
      commands.forEach(command => {
        cmds += (`\`${PREFIX}${command.name}\``).padEnd(6, '\t');
        if(command.description) cmds += `\t*${command.description}*\n`
      });
      data.push(cmds);
      data.push(
        `Try \`${PREFIX}help [command name]\` to get info on a specific command!`
      );

      return message.channel.send(data, { split: true }).catch((error) => {
          console.error(error);
          message.reply(
            "Houston, we have a problem!"
          );
        });
    }

    /**
     * If the user specifies a command
     */
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("Uh Oh! Not a valid command");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.description)
      data.push(`**Description:** *${command.description}*`);
    if (command.usage)
      data.push(`**Usage:** \`${PREFIX}${command.name} ${command.usage}\``);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });

  },
};

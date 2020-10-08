"use strict"; // since I hate not using semicolons

/**
 * Required Imports
 *  - dotenv: .env support
 *  - fs: file system support (for reading ./commands)
 *  - mongoose: mongoDB client
 *  - discord.js: discord (duh)
 *  - standup.model: the model for the standup stored in mongo
 */
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const { Client, MessageEmbed, Collection } = require("discord.js");
const standupModel = require("./models/standup.model");

const PREFIX = "!";

// idk where to put this yet, just here temporarily
const standupIntroMessage = new MessageEmbed()
  .setColor("#ff9900")
  .setTitle("Daily Standup")
  .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  .setDescription(
    "This is the newly generated **_read-only_** text channel used for daily standups! :tada:"
  )
  .addFields(
    {
      name: "Introduction",
      value:
        "Hi! I'm Stan D. Upbot and I will be facilitating your daily standups from now on.\nTo view all available commands, try `!help`.",
    },
    {
      name: "How does this work?",
      value:
        "Anytime before the standup time (default `11:00:00`), members would private DM me with the command `!response`, I will present the standup prompt and they will type their response. I will then save their response in my *secret special chamber of data*, and during the designated standup time, I would present everyone's answer to `#daily-standups`.",
    },
    {
      name: "Getting started",
      value:
        "*Currently*, there are no members in the standup! To add a member try `!am <User>`.",
    }
  )
  .setTimestamp();

// lists .js files in commands dir
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// init bot client with a collection of commands
const bot = new Client();
bot.commands = new Collection();

// Imports the command file + adds the command to the bot commands collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

// mongodb setup with mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch(() => console.log("Ruh Roh!"));

mongoose.connection.once("open", () => console.log("mongoDB connected"));

bot.once("ready", () => console.log("Discord Bot Ready"));

// when a user enters a command
bot.on("message", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) return;

  const command = bot.commands.get(commandName);

  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("Hmm, that command cannot be used in a dm!");
  }

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`Error 8008135: Something went wrong!`);
  }
});

bot.on("guildCreate", async (guild) => {
  // create introduction

  // creates the text channel
  const channel = await guild.channels.create("daily-standups", {
    type: "text",
    topic: "Scrum Standup Meeting Channel",
  });

  // sets text channel to read only
  await channel.createOverwrite(guild.roles.everyone, {
    SEND_MESSAGES: false,
    MANAGE_MESSAGES: false,
  });

  const newStandup = new standupModel({
    _id: guild.id,
    channelId: channel.id,
    standupTime: "11:00:00",
    members: []
  });

  newStandup.save().then(() => console.log("Howdy!")).catch(err => console.error(err));

  channel.send(standupIntroMessage);
});

// delete the mongodb entry
bot.on("guildDelete", (guild) => {
  standupModel.findByIdAndDelete(guild.id).then(() => console.log("Peace!")).catch(err => console.error(err));
});

bot.login(process.env.DISCORD_TOKEN);

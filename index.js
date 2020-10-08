"use strict"; // since I hate not using semicolons

/**
 * Required Imports
 *  - dotenv: .env support
 *  - fs: file system support (for reading ./commands)
 *  - mongoose: mongoDB client
 *  - discord.js: discord (duh)
 */
require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const { Client, MessageEmbed, Collection } = require("discord.js");

const PREFIX = "!";

// idk where to put this yet, just here temporarily
const standup = new MessageEmbed()
  .setColor("#ff9900")
  .setTitle("Daily Standup")
  .setTimestamp();

// creates a list of .js files in commands dir
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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).catch(() => console.log("Ruh Roh!"));

mongoose.connection.once("open", () => console.log("mongoDB connected"));

bot.once("ready", () => console.log("Discord Bot Ready"));

// when a user enters a command
bot.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!bot.commands.has(commandName)) return;

  const command = bot.commands.get(commandName);

  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("Hmm, that command cannot be used in a dm!");
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`Error 8008135: Something went wrong!`);
  }
});

// create the mongoDB entry + create a seperate readonly channel
bot.on("guildCreate", (guild) => {
  // ... init function goes here
});

// delete the mongodb entry
bot.on('guildDelete', (guild) => {
  // ... cleanup function goes here
});


bot.login(process.env.DISCORD_TOKEN);
'use strict';

const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => console.log('ready'));

bot.login(process.env.DISCORD_TOKEN);
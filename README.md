# Standup Bot 🤖
> Discord bot for Scrum daily standups

## How-To:

#### Test out locally

- visit https://discord.com/developers/applications
- New Application -> Enter name
- Bot -> Add Bot
- Reveal and copy discord bot token
- copy .env.sample into .env file
- Set discord bot token into .env and run `docker-compose up`
- OAuth2 -> choose bot scope -> choose permissions: Manage Channels, View Channels, Send Messages, Read Messages
- Copy that link and use it to invite bot into your own personal discord server
  
#### *Disclaimer:* 

This bot is not meant to replace your daily standups outright. It is more of a helper for your meetings. Instead of spending time going around asking the same questions everyday, time can be reserved for more important non-repetitive discussion and help.

### Initial Setup 

[Click Here](https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=355408) to add the bot to your server. You'll need to fill in `YOUR_CLIENT_ID` with your bots client id.
> Note that the above requires you to have the **Manage Server** permission in this server  

The bot will then create an entry in the `MongoDB` database for the server, create the text channel `#daily-standups` and send an introduction.

### Commands
> The prefix for this bot is `!`

| Name    | Description                                        | Usage                                   | Server or DM |                                             |
| ------- | -------------------------------------------------- | --------------------------------------- | ------------ | ------------------------------------------- |
| `help`  | *Shows all commands*                               | `!help [optional command name]`         | **_both_**   |                                             |
| `list`  | *List of all members participating in the standup* | `!list`                                 | Server       |                                             |
| `am`    | *Adds a new member to the standup*                 | `!am @<user> @<optional_user> ...`      | Server       |                                             |
| `rm`    | *Removes a member from the standup*                | `!rm @<user> @<optional_user> ...`      | Server       |                                             |
| `reset` | *Resets the standup*                               | `!reset`                                | Server       | Use with caution, resets everything         |
| `show`  | *Shows standup prompt*                             | `!show`                                 | **_both_**   |                                             |
| `reply` | *Reply to standup prompt*                          | `!reply @<optional_serverId> [message]` | DM           | `optional_server_id`: for multiple standups |
| `view`  | *View your standup response*                       | `!view @<optional_serverId>`            | DM           | `optional_server_id`: for multiple standups |


### Usage
> Standup time is set to `10:30:00 PM EST` every weekday

Anytime before the standup time, added members must DM the bot with the `reply` followed by their message. The bot will then upload this response to the database.    
Come standup time, the bot will create an Embed with all collected member responses *and* will include a `Hooligans` section with mentions of members who did not participate.  
This message will be posted to `#daily-standups`.

After the message has been posted, the bot will delete all member responses, thus members will have to DM for the next standup.

#### Made with

- `Discord.js` and `node-schedule` for cron jobs
- `MongoDB` with `mongoose`
- `Heroku` for hosting
- :heart:


### Screenshots 📸
<br />

<h5 align="center">
  <img src="docs/screenshots/standup-bot-1.png" />
</h5>
<h5 align="center"> 

 *Text channel creation and initial message on join (1920x1080)*  

</h5>
<br />

<h5 align="center">
  <img src="docs/screenshots/standup-bot-2.png" />
</h5>
<h5 align="center"> 

 *Private messaging bot with commands (1920x1080)*  

</h5>
<br />

<h5 align="center">
  <img src="docs/screenshots/standup-bot-3.png" />
</h5>
<h5 align="center"> 

 *Daily standup message example with hooligans (1920x1080)*  

</h5>

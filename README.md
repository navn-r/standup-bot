# Standup Bot :robot:
> Discord bot for Scrum daily standups

## How-To:

#### *Disclaimer:* 

This bot is not meant to replace your daily standups outright. It is more of a helper for your meetings. Instead of spending time going around asking the same questions everyday, time can be reserved for more important non-repetitive discussion and help.

### Initial Setup

[**Click Here**](https://discord.com/api/oauth2/authorize?client_id=763409520541827102&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fdevelopers%2Fapplications%2F763409520541827102%2Foauth2&scope=bot) to add the bot to your server. 
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
> Standup time is set to `12:00:00 PM EST` every weekday

Anytime before the standup time, added members must DM the bot with the `reply` followed by their message. The bot will then upload this response to the database.    
Come standup time, the bot will create an Embed with all collected member responses *and* will include a `Hooligans` section with mentions of members who did not participate.  
This message will be posted to `#daily-standups`.

After the message has been posted, the bot will delete all member responses, thus members will have to DM for the next standup.

#### Made with

- `Discord.js` and `node-schedule` for cron jobs
- `MongoDB` with `mongoose`
- `Heroku` for hosting
- :heart:
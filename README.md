# Star Discord Bot

## TODO

- [x] Complete `functions > permission > check` (Enable permission check for def permissions && Enable permission check for custome permissions )
- [x] Complete `index.js > messageCreate event > Command Handler` (Check everything and make sure this option have not any bugs)
- [x] Complete `functions > log` (Check everything and make sure this option have not any bugs)
- [x] Complete `events > guildMemberAdd`
- [x] Complete `commands > hide`
- [ ] Move commands to Slash-Commands
- [x] Add command `mute` (No-Role) (Description in DM)
- [x] Sync mute command to database, if use rejoined automaticly give roles
- [x] When a user server-muted , save this to database for fix leave/join bug (if user leave from server and join again, user will be server unmute)
- [x] When a user removed no role from another user, cancel event
- [ ] Complete time command

## Library

for check permission : `require("./library/star.js").permission.check()`
for log : `require("./library/star.js").log`
for config database : `require("./library/star.js").config.set()`

## Events

`messageCreate` : Handle all messages (when a user send a message and it's not a command, this event will be start)
`ready` : When bot started and ready to use

## Commands

`ping` : Just a test command

### Have to config ?

if `config.json` is not exist then create `config.json` in `index.js`'s directory and put this data in this file

```js
{
  "bot": {
    "token": "BOT_TOKEN",
    "prefix": "BOT_PREFIX",
    "developers": ["DEVELOPERS_ID"],
    "owner": "OWNER_ID"
  },

  "colors": {
    "main": "MAIN_COLOR (HEX)",
    "log": "LOG_COLOR (HEX)"
  },

  "embeds": { "footer": "EMBED_FOOTER_TEXT" },

  "channels": {},

  "webhooks": {},

  "guilds": {},

  "users": {}
}
```

then if `json.sqlite` is exist delete this file and run it. (after run `index.js` DB going for reConfig and `json.sqlite` created again)

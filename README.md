# Star Discord Bot

## TODO

- [ ] Complete `functions > permission > check` (Enable permission check for def permissions && Enable permission check for custome permissions )
- [ ] Complete `index.js > messageCreate event > Command Handler` (Check everything and make sure this option have not any bugs)
- [ ] Complete `functions > log` (Check everything and make sure this option have not any bugs)
- [ ] Move commands to Slash-Commands
- [ ] Add command `mute` (No-Role) (Description in DM)

## Functions

`config` : Only config database (check everything in config.json if it's need and register to database)
`log` : Handle all log requests
`permission` : Handle all permission requests (for example Administrator permission)

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

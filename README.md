# Star Discord Bot

## Options

[Custom library](https://github.com/Code-Williams/Star-Bot-Discord/tree/master/library) => all things using in project have library like logs and expired users and config database and....\
[Custom permissions](https://github.com/Code-Williams/Star-Bot-Discord/blob/master/library/permission.js) => can add unlimit custom permissions and its automaticly config.\
[Hide command](https://github.com/code-williams/star-bot-discord/blob/master/commands/hide.js) => Give users NO-ROLES (No-Grate , No-Adult and...) with expired time and reason with log.\
[Time command](https://github.com/Code-Williams/Star-Bot-Discord/blob/master/commands/time.js) => Give user expire time for NO-ROLES.\
[Handle New Users](https://github.com/Code-Williams/Star-Bot-Discord/blob/master/events/guildMemberAdd.js) => When a user rejoin to server , user automaticly get NO-ROLES have before leaving from server.\
[Handle Voice Users](https://github.com/Code-Williams/Star-Bot-Discord/blob/master/events/voiceStateUpdate.js) => When a user rejoin to server for server unmute, when joined to a voice channel automaticly server mute and server deafen.\
[Automaticly config database](https://github.com/Code-Williams/Star-Bot-Discord/blob/master/events/ready.js) => Automaticly config database when bot is ready (from config.json file).\
[Handle Messages and Custom Command Handler](https://github.com/Code-Williams/Star-Bot-Discord/blob/master/events/messageCreate.js) => Handle all messages and have custom command handler.

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
- [x] Complete time command
- [ ] Role Picker (Can pick roles with buttons)
- [ ] TTS in connect to admin (when a user joined to connect to admin channel, play welcome tts)
- [ ] Voice Alert (when a user joined to some voice channels, a log will be send to admins)
- [ ] ANN to admins (when a announcement sent to admins, ann send to admin's dm)

## Library

for check permission : `require("./library/star.js").permission.check()`\
for log : `require("./library/star.js").log`\
for config database : `require("./library/star.js").config.set()`

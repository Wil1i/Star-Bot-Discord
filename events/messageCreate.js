const config = require("../config.json");
const db = require("quick.db");
const index = require("../index");
const {} = require("discord.js");

module.exports = {
  name: "messageCreate",
  description: "Handle All Messages",
  execute(client, message) {
    if (message.author.bot || message.channel.type == "DM") return;

    const messageArry = message.content.split(" ");
    const prefix = db.get("bot.prefix").toString();
    const cmd = messageArry[0].replace(prefix, "");

    if (index.cmd.check(cmd)) {
      const grabCommand = index.cmd.get(cmd);
      console.log(grabCommand);
      if (!grabCommand.permissions) return grabCommand.execute(client, message);

      const isCommandAvailable = library.permissions.check(message, [
        grabCommand.permissions,
      ]);
      if (isCommandAvailable) return grabCommand.execute(client, message);
    }

    if (client.events.has("messageCreate"))
      client.events.get("messageCreate").execute(client, message);
  },
};

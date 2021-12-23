const db = require("quick.db");
const index = require("../index");
const library = require("../library/star");

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

      if (!grabCommand.permissions && !grabCommand.roles)
        return grabCommand.execute(client, message);

      let isCommandAvailableOnPermission = false;
      let isCommandAvailableOnRole = false;

      if (grabCommand.permissions)
        isCommandAvailableOnPermission = library.permissions.check(message, [
          grabCommand.permissions,
        ]);

      if (grabCommand.roles)
        isCommandAvailableOnRole = library.permissions.roles(
          message,
          grabCommand.roles,
          grabCommand.rawPosition || false
        );

      if (isCommandAvailableOnPermission || isCommandAvailableOnRole)
        return grabCommand.execute(client, message);
    }
  },
};

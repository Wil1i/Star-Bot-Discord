const db = require("quick.db");
const index = require("../index");
const library = require("../library/star");

module.exports = {
  name: "messageCreate",
  description: "Handle All Messages",
  execute(client, message) {
    if (message.author.bot || message.channel.type == "DM") return;
    console.log(1);
    const messageArry = message.content.split(" ");
    const prefix = db.get("bot.prefix").toString();
    const cmd = messageArry[0].replace(prefix, "");
    console.log(2);
    if (index.cmd.check(cmd)) {
      console.log(3);
      const grabCommand = index.cmd.get(cmd);
      if (!grabCommand.permissions) return grabCommand.execute(client, message);
      console.log(4);
      const isCommandAvailable = library.permissions.check(message, [
        grabCommand.permissions,
      ]);
      console.log(isCommandAvailable);
      if (isCommandAvailable) return grabCommand.execute(client, message);
    }
  },
};

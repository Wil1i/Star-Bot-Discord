const db = require("quick.db");
const index = require("../index");
const library = require("../library/star");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  description: "Handle All Messages",
  execute(client, message) {
    if (message.author.bot || message.channel.type == "DM") return;

    if (message.channel.id == "921858472679723068") {
      message.delete();
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter("Atlantis")
        .setDescription(message.content)
        .setAuthor("New Bug Report");
      message.channel.send({ embed: embed });
    }

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
        isCommandAvailableOnPermission = library.permissions.check(
          message,
          grabCommand.permissions
        );

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
